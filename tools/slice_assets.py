#!/usr/bin/env python3
"""Slice the original MVMPACK 26 mockup into section + sprite assets.

All artwork is taken directly from the source mockup (no re-generated art),
so the rebuilt UI stays pixel-faithful to the reference.
"""
import os
import sys
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "/nfs/104567018/uploads/5da421a0916dfd4efbb8c8ae7925f095.png"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECTIONS_DIR = os.path.join(ROOT, "assets", "sections")
SPRITES_DIR = os.path.join(ROOT, "assets", "sprites")

# (name, x0, y0, x1, y1) - verified against the 1024x1536 source
SECTIONS = [
    ("header", 0, 0, 1024, 104),
    ("hero", 0, 104, 1024, 500),
    ("row1", 0, 500, 1024, 806),
    ("row2", 0, 806, 1024, 1020),
    ("squares", 0, 1020, 1024, 1196),
    ("promo", 0, 1196, 1024, 1396),
    ("nav", 0, 1396, 1024, 1536),
]

SPRITES = [
    ("tile_pack_opening", 27, 512, 601, 796),
    ("tile_draft", 601, 512, 998, 796),
    ("tile_ai_match", 27, 816, 522, 1010),
    ("tile_squad_builder", 522, 816, 998, 1010),
    ("sq_market", 29, 1030, 264, 1188),
    ("sq_missions", 287, 1030, 498, 1188),
    ("sq_rewards", 520, 1030, 757, 1188),
    ("sq_tournaments", 757, 1030, 991, 1188),
    ("promo_card", 640, 1206, 998, 1390),
    ("nav_orb", 446, 1420, 578, 1520),
]


def main():
    os.makedirs(SECTIONS_DIR, exist_ok=True)
    os.makedirs(SPRITES_DIR, exist_ok=True)
    img = Image.open(SRC).convert("RGB")
    print("source:", img.size)

    for name, x0, y0, x1, y1 in SECTIONS:
        out = os.path.join(SECTIONS_DIR, name + ".png")
        img.crop((x0, y0, x1, y1)).save(out, optimize=True)
        print("section", name, (x1 - x0, y1 - y0))

    for name, x0, y0, x1, y1 in SPRITES:
        out = os.path.join(SPRITES_DIR, name + ".png")
        img.crop((x0, y0, x1, y1)).save(out, optimize=True)
        print("sprite", name, (x1 - x0, y1 - y0))

    img.save(os.path.join(ROOT, "assets", "reference.png"), optimize=True)
    print("done")


if __name__ == "__main__":
    main()
