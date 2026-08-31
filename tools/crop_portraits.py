#!/usr/bin/env python3
"""MVMPACK 26 - build face-centred 768x1024 card portraits.

Reads assets/players/raw/player_XXX.jpg (220 real photos) and writes
assets/players/player_XXX.jpg, cropped 3:4 with the face placed inside the
portrait window of the card frame (face centre at ~32% of the card height).

Usage:  python3 tools/crop_portraits.py [start] [end]
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "assets", "players", "raw")
OUT = os.path.join(ROOT, "assets", "players")
REPORT = os.path.join(ROOT, "data", "crop_report.json")

OUT_W, OUT_H = 768, 1024
ASPECT = OUT_W / float(OUT_H)          # 0.75
FACE_W_RATIO = 0.34                    # face width vs crop width
FACE_Y_RATIO = 0.30                    # face centre height inside the crop
MIN_FACE_RATIO = 0.085                 # ignore detections smaller than this

# Manual face hints for photos where the cascade locks onto the wrong person.
# key -> (face centre x, face centre y, face width) as fractions of the image.
FACE_HINTS = {
    "022": (0.47, 0.41, 0.075),
    "047": (0.47, 0.15, 0.16),
    "084": (0.65, 0.25, 0.22),
    "091": (0.51, 0.17, 0.31),
    "094": (0.73, 0.34, 0.30),
    "107": (0.44, 0.20, 0.12),
    "151": (0.25, 0.36, 0.22),
    "162": (0.47, 0.18, 0.14),
    "217": (0.71, 0.15, 0.18),
}

CASC = cv2.data.haarcascades
FRONT = cv2.CascadeClassifier(CASC + "haarcascade_frontalface_default.xml")
FRONT_ALT = cv2.CascadeClassifier(CASC + "haarcascade_frontalface_alt2.xml")
PROFILE = cv2.CascadeClassifier(CASC + "haarcascade_profileface.xml")


def load_rgb(path):
    """Open any raw file as RGB, flattening transparency onto white."""
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im)
    return im.convert("RGB")


def detect_face(im):
    """Return (x, y, w, h) of the best face in image coordinates, or None."""
    W, H = im.size
    scale = 1.0
    work = im
    if max(W, H) > 1100:                      # detection runs on a small copy
        scale = 1100.0 / max(W, H)
        work = im.resize((max(1, int(W * scale)), max(1, int(H * scale))),
                         Image.BILINEAR)
    gray = cv2.cvtColor(np.array(work), cv2.COLOR_RGB2GRAY)
    gray = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(gray)
    gw, gh = gray.shape[1], gray.shape[0]
    small = max(28, int(min(gw, gh) * MIN_FACE_RATIO))

    passes = [
        (FRONT, 1.08, 6), (FRONT_ALT, 1.08, 5),
        (FRONT, 1.05, 3), (FRONT_ALT, 1.05, 3),
        (PROFILE, 1.06, 4),
    ]

    def score(f):
        x, y, w, h = f
        cx, cy = (x + w / 2.0) / gw, (y + h / 2.0) / gh
        area = (w * h) / float(gw * gh)
        return area * 3.0 - abs(cx - 0.5) - abs(cy - 0.38) * 0.8

    # collect candidates from every cascade, keep only plausibly sized heads
    cands = []
    for casc, sf, mn in passes:
        if casc.empty():
            continue
        found = list(casc.detectMultiScale(gray, scaleFactor=sf,
                                          minNeighbors=mn,
                                          minSize=(small, small)))
        if casc is PROFILE:
            # mirrored pass helps the single-sided profile cascade
            flip = cv2.flip(gray, 1)
            found += [(gw - x - w, y, w, h) for (x, y, w, h) in
                      casc.detectMultiScale(flip, scaleFactor=sf,
                                            minNeighbors=mn,
                                            minSize=(small, small))]
        cands += [f for f in found if f[2] >= small]
        if cands:
            break

    if not cands:
        return None
    best = max(cands, key=score)
    x, y, w, h = [v / scale for v in best]
    return (x, y, w, h)


def crop_box(im, face):
    """Compute the 3:4 crop rectangle for one image."""
    W, H = im.size
    max_w = min(W, H * ASPECT)                # widest 3:4 box that fits

    if face is None:
        # no face: take the upper part of the widest possible box
        cw = max_w
        ch = cw / ASPECT
        cx = W / 2.0
        cy = min(H - ch / 2.0, max(ch / 2.0, H * 0.42))
        return _clamp(cx, cy, cw, ch, W, H), False

    fx, fy, fw, fh = face
    cw = fw / FACE_W_RATIO
    cw = min(cw, max_w)
    cw = max(cw, min(max_w, fw * 1.6))        # never crop tighter than the head
    ch = cw / ASPECT
    cx = fx + fw / 2.0
    # put the face centre at FACE_Y_RATIO of the crop height
    cy = fy + fh / 2.0 + ch * (0.5 - FACE_Y_RATIO)
    return _clamp(cx, cy, cw, ch, W, H), True


def _clamp(cx, cy, cw, ch, W, H):
    """Keep the crop rectangle inside the image."""
    if cw > W:
        cw = W
        ch = cw / ASPECT
    if ch > H:
        ch = H
        cw = ch * ASPECT
    left = min(max(0.0, cx - cw / 2.0), W - cw)
    top = min(max(0.0, cy - ch / 2.0), H - ch)
    return (int(round(left)), int(round(top)),
            int(round(left + cw)), int(round(top + ch)))


def finish(im, box):
    """Crop, resize to the card size and add a touch of contrast/sharpness."""
    out = im.crop(box)
    resample = Image.LANCZOS if out.size[0] >= OUT_W else Image.BICUBIC
    out = out.resize((OUT_W, OUT_H), resample)
    out = ImageEnhance.Color(out).enhance(1.06)
    out = ImageEnhance.Contrast(out).enhance(1.05)
    out = ImageEnhance.Sharpness(out).enhance(1.25)
    return out


def main():
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 220
    os.makedirs(OUT, exist_ok=True)

    report = {}
    if os.path.exists(REPORT):
        with open(REPORT, "r", encoding="utf-8") as fh:
            report = json.load(fh)

    faces = 0
    for n in range(start, end + 1):
        key = "%03d" % n
        src = os.path.join(RAW, "player_%s.jpg" % key)
        dst = os.path.join(OUT, "player_%s.jpg" % key)
        if not os.path.exists(src):
            print("MISS  %s" % key)
            continue
        im = load_rgb(src)
        hint = FACE_HINTS.get(key)
        if hint:
            hx, hy, hw = hint
            fw = hw * im.size[0]
            face = (hx * im.size[0] - fw / 2.0, hy * im.size[1] - fw / 2.0,
                    fw, fw)
        else:
            face = detect_face(im)
        box, has_face = crop_box(im, face)
        finish(im, box).save(dst, "JPEG", quality=88, optimize=True,
                             progressive=True)
        faces += 1 if has_face else 0
        report[key] = {
            "src_size": list(im.size), "box": list(box),
            "face": [int(round(v)) for v in face] if face else None,
            "mode": "face" if has_face else "center"
        }
        if hint:
            report[key]["mode"] = "hint"
        print("%s  %s  src=%dx%d  box=%s" %
              ("HINT" if hint else ("FACE" if has_face else "CTR "),
               key, im.size[0], im.size[1], box))

    with open(REPORT, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=1, sort_keys=True)
    total = end - start + 1
    print("\nportraits: %d/%d written, faces detected: %d" %
          (len(os.listdir(OUT)) - 2, 220, faces))


if __name__ == "__main__":
    main()
