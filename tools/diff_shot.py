#!/usr/bin/env python3
"""Render index.html at 1024x1536 and pixel-diff it against the reference."""
import os
import sys
from PIL import Image, ImageChops
import numpy as np
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "assets", "reference.png")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "docs", "render.png")
DIFF = os.path.join(os.path.dirname(OUT), "diff.png")


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-device-scale-factor=1"])
        pg = b.new_page(viewport={"width": 1024, "height": 1536}, device_scale_factor=1)
        pg.goto("file://" + os.path.join(ROOT, "index.html"))
        pg.add_style_tag(content=".sheen{display:none!important}"
                                 ".stage{border-radius:0!important;box-shadow:none!important}"
                                 "*{animation:none!important}")
        pg.wait_for_timeout(900)
        pg.locator("#stage").screenshot(path=OUT)
        b.close()

    a = Image.open(OUT).convert("RGB")
    r = Image.open(REF).convert("RGB")
    if a.size != r.size:
        a = a.resize(r.size, Image.LANCZOS)
    d = ImageChops.difference(a, r)
    arr = np.asarray(d).astype(int)
    mean = arr.mean()
    worst = (arr.max(axis=2) > 24).mean() * 100
    d.save(DIFF)
    print("render:", Image.open(OUT).size)
    print("mean abs diff: %.3f" % mean)
    print("pixels off by >24: %.3f%%" % worst)
    rows = arr.max(axis=2).mean(axis=1)
    bands = [("header", 0, 104), ("hero", 104, 500), ("row1", 500, 806),
             ("row2", 806, 1020), ("squares", 1020, 1196),
             ("promo", 1196, 1396), ("nav", 1396, 1536)]
    for name, y0, y1 in bands:
        print("  %-8s %.2f" % (name, rows[y0:y1].mean()))


if __name__ == "__main__":
    main()
