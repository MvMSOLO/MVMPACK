#!/usr/bin/env python3
"""Measure where the face sits inside every finished card portrait.

Runs the haar cascades again on assets/players/player_XXX.jpg (the 768x1024
crops) and reports, per portrait, the detected face width / centre as a
fraction of the portrait.  Anything without a detection, or with the face too
small, too high or too low, is printed as a BAD row so it can be re-cropped or
given a manual hint in crop_portraits.py.

usage:  python3 tools/verify_portraits.py [start] [end]
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "players")
REPORT = os.path.join(ROOT, "data", "verify_report.json")

# acceptable window for a card portrait
W_MIN, W_MAX = 0.18, 0.55        # face width vs portrait width
Y_MIN, Y_MAX = 0.14, 0.46        # face centre height vs portrait height

CASC = cv2.data.haarcascades
CASCADES = [
    cv2.CascadeClassifier(CASC + "haarcascade_frontalface_default.xml"),
    cv2.CascadeClassifier(CASC + "haarcascade_frontalface_alt2.xml"),
    cv2.CascadeClassifier(CASC + "haarcascade_profileface.xml"),
]


def faces(path):
    """Return every detection as (w, cx, cy) fractions of the portrait."""
    im = Image.open(path).convert("RGB").resize((384, 512), Image.BILINEAR)
    gray = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2GRAY)
    gray = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(gray)
    found = []
    for casc in CASCADES:
        if casc.empty():
            continue
        for sf, mn in ((1.05, 4), (1.1, 3)):
            found += list(casc.detectMultiScale(gray, scaleFactor=sf,
                                               minNeighbors=mn,
                                               minSize=(48, 48)))
        flip = cv2.flip(gray, 1)
        found += [(384 - x - w, y, w, h) for (x, y, w, h) in
                  casc.detectMultiScale(flip, scaleFactor=1.06, minNeighbors=4,
                                        minSize=(48, 48))]
    return [(w / 384.0, (x + w / 2.0) / 384.0, (y + h / 2.0) / 512.0)
            for (x, y, w, h) in found]


def main():
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 220

    rows = {}
    if os.path.exists(REPORT):
        with open(REPORT, "r", encoding="utf-8") as fh:
            rows = json.load(fh)

    bad = []
    for n in range(start, end + 1):
        key = "%03d" % n
        path = os.path.join(OUT, "player_%s.jpg" % key)
        if not os.path.exists(path):
            bad.append((key, "missing"))
            continue
        cands = faces(path)
        if not cands:
            rows[key] = {"ok": False, "why": "no-face"}
            bad.append((key, "no-face"))
            continue

        def inside(f):
            fw, cx, cy = f
            return W_MIN <= fw <= W_MAX and Y_MIN <= cy <= Y_MAX

        good = [f for f in cands if inside(f)]
        # pick the detection closest to the ideal portrait placement
        pick = min(good or cands,
                   key=lambda f: abs(f[2] - 0.30) + abs(f[1] - 0.5) * 0.5)
        fw, cx, cy = pick
        why = []
        if not good:
            if fw < W_MIN:
                why.append("small %.2f" % fw)
            if fw > W_MAX:
                why.append("huge %.2f" % fw)
            if cy < Y_MIN:
                why.append("high %.2f" % cy)
            if cy > Y_MAX:
                why.append("low %.2f" % cy)
        rows[key] = {"ok": not why, "fw": round(fw, 3),
                     "cx": round(cx, 3), "cy": round(cy, 3),
                     "n": len(cands), "why": " ".join(why)}
        if why:
            bad.append((key, " ".join(why)))

    with open(REPORT, "w", encoding="utf-8") as fh:
        json.dump(rows, fh, indent=1, sort_keys=True)

    print("checked %d, flagged %d" % (end - start + 1, len(bad)))
    for key, why in bad:
        print("  BAD %s  %s" % (key, why))


if __name__ == "__main__":
    main()
