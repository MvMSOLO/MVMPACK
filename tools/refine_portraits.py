#!/usr/bin/env python3
"""MVMPACK 26 - second-pass fix for badly framed portraits.

Strategy: the face is much easier to detect on the already cropped 768x1024
portrait than on the full raw photo. So for every flagged card we detect the
face on the current portrait, map that rectangle back into raw-photo
coordinates through data/crop_report.json, then rebuild the crop with the
standard placement rules. Repeats until the measured framing is in range.

Usage:  python3 tools/refine_portraits.py 001 020 047 ...
        python3 tools/refine_portraits.py --all-bad
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from crop_portraits import (OUT, RAW, REPORT, crop_box, finish, load_rgb,
                            FACE_HINTS)          # noqa: E402

VERIFY = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "data", "verify_report.json")

CASC = cv2.data.haarcascades
CASCADES = [cv2.CascadeClassifier(CASC + n) for n in (
    "haarcascade_frontalface_default.xml",
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_profileface.xml")]

W_MIN, W_MAX = 0.20, 0.50      # accepted face width on the portrait
Y_MIN, Y_MAX = 0.18, 0.45      # accepted face centre height


def detect_on_portrait(path):
    """Best face on a 768x1024 portrait, returned in portrait pixels."""
    im = Image.open(path).convert("RGB")
    W, H = im.size
    gray = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2GRAY)
    gray = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(gray)
    found = []
    for casc in CASCADES:
        if casc.empty():
            continue
        for sf, mn in ((1.05, 5), (1.08, 4), (1.12, 3)):
            found += list(casc.detectMultiScale(gray, scaleFactor=sf,
                                                minNeighbors=mn,
                                                minSize=(70, 70)))
        flip = cv2.flip(gray, 1)
        found += [(W - x - w, y, w, h) for (x, y, w, h) in
                  casc.detectMultiScale(flip, scaleFactor=1.06, minNeighbors=4,
                                        minSize=(70, 70))]
    if not found:
        return None, (W, H)
    # prefer a head of sensible size sitting in the upper half of the frame
    def score(f):
        x, y, w, h = f
        fw, cx, cy = w / float(W), (x + w / 2.0) / W, (y + h / 2.0) / H
        pen = abs(fw - 0.32) * 2.0 + abs(cx - 0.5) + abs(cy - 0.30) * 1.5
        if cy > 0.62:
            pen += 1.0                      # almost surely a shirt/badge match
        return pen
    return min(found, key=score), (W, H)


def map_to_raw(face, portrait_size, box):
    """Translate a portrait-space face rect into raw-photo coordinates."""
    x, y, w, h = face
    pw, ph = portrait_size
    l, t, r, b = box
    sx, sy = (r - l) / float(pw), (b - t) / float(ph)
    return (l + x * sx, t + y * sy, w * sx, h * sy)


def refine(key, report, rounds=3):
    src = os.path.join(RAW, "player_%s.jpg" % key)
    dst = os.path.join(OUT, "player_%s.jpg" % key)
    if key in FACE_HINTS or not os.path.exists(src) or key not in report:
        return "skip"
    im = load_rgb(src)
    status = "no-face"
    for _ in range(rounds):
        face, psize = detect_on_portrait(dst)
        if face is None:
            return status
        fw, cy = face[2] / float(psize[0]), (face[1] + face[3] / 2.0) / psize[1]
        if W_MIN <= fw <= W_MAX and Y_MIN <= cy <= Y_MAX:
            return "ok"
        raw_face = map_to_raw(face, psize, report[key]["box"])
        box, _ = crop_box(im, raw_face)
        if box == tuple(report[key]["box"]):
            return "stuck"
        finish(im, box).save(dst, "JPEG", quality=88, optimize=True,
                            progressive=True)
        report[key]["box"] = list(box)
        report[key]["face"] = [int(round(v)) for v in raw_face]
        report[key]["mode"] = "refined"
        status = "fixed"
    return status


def main():
    args = sys.argv[1:]
    with open(REPORT, "r", encoding="utf-8") as fh:
        report = json.load(fh)

    if args and args[0] == "--all-bad":
        with open(VERIFY, "r", encoding="utf-8") as fh:
            check = json.load(fh)
        keys = sorted(k for k, v in check.items() if not v.get("ok"))
    else:
        keys = ["%03d" % int(a) for a in args]

    counts = {}
    for key in keys:
        st = refine(key, report)
        counts[st] = counts.get(st, 0) + 1
        print("%-6s %s" % (st, key))

    with open(REPORT, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=1, sort_keys=True)
    print("\n" + "  ".join("%s=%d" % kv for kv in sorted(counts.items())))


if __name__ == "__main__":
    main()
