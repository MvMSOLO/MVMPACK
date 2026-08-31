#!/usr/bin/env python3
"""MVMPACK 26 - rebuild portraits whose source photo is a tight head-shot.

When the raw photo is already cropped close to the head there is no room left
to zoom out, so the face fills 70-80% of the card and looks wrong. Here we
extend the canvas with a blurred, zoomed copy of the same photo (a soft bokeh
backdrop), which gives the crop enough space to place the face at the standard
size and height.

Usage:  python3 tools/pad_portraits.py 049 081 086 ...
"""

import json
import os
import sys

from PIL import Image, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from crop_portraits import (ASPECT, FACE_W_RATIO, FACE_Y_RATIO, OUT, RAW,
                            REPORT, finish, load_rgb)      # noqa: E402


def padded(im, need_w, need_h):
    """Return (canvas, dx, dy): photo centred on a blurred larger backdrop."""
    W, H = im.size
    cw, ch = int(max(W, need_w)), int(max(H, need_h))
    bg = im.resize((cw, ch), Image.BICUBIC)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=max(cw, ch) * 0.045))
    bg = bg.point(lambda v: int(v * 0.82))          # darken so the cut-out pops
    dx, dy = (cw - W) // 2, (ch - H) // 2
    bg.paste(im, (dx, dy))
    return bg, dx, dy


def rebuild(key, report):
    src = os.path.join(RAW, "player_%s.jpg" % key)
    if key not in report or not report[key].get("face"):
        return "skip"
    im = load_rgb(src)
    fx, fy, fw, fh = report[key]["face"]

    cw = fw / FACE_W_RATIO                       # crop width we really want
    ch = cw / ASPECT
    canvas, dx, dy = padded(im, cw * 1.02, ch * 1.02)
    CW, CH = canvas.size
    fx, fy = fx + dx, fy + dy

    cx = fx + fw / 2.0
    cy = fy + fh / 2.0 + ch * (0.5 - FACE_Y_RATIO)
    left = min(max(0.0, cx - cw / 2.0), CW - cw)
    top = min(max(0.0, cy - ch / 2.0), CH - ch)
    box = (int(round(left)), int(round(top)),
           int(round(left + cw)), int(round(top + ch)))

    finish(canvas, box).save(os.path.join(OUT, "player_%s.jpg" % key), "JPEG",
                             quality=88, optimize=True, progressive=True)
    report[key]["mode"] = "padded"
    report[key]["box"] = list(box)
    report[key]["pad"] = [CW, CH, dx, dy]
    return "padded"


def main():
    keys = ["%03d" % int(a) for a in sys.argv[1:]]
    with open(REPORT, "r", encoding="utf-8") as fh:
        report = json.load(fh)
    for key in keys:
        print("%-7s %s" % (rebuild(key, report), key))
    with open(REPORT, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=1, sort_keys=True)


if __name__ == "__main__":
    main()
