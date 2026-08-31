#!/usr/bin/env python3
"""Slice a MVMPACK card sheet into one clean PNG per card.

Every output file is a pure crop of the user's own sheet - no pixel is ever
repainted or generated. The cut lines are measured from the sheet so that a
card is never clipped and no neighbouring card leaks into the frame:

1. for each ROW of cards the vertical cuts are re-measured on that row only
   (the darkest column inside a window around each expected gutter);
2. for each COLUMN of cards the horizontal cuts are re-measured the same way;
3. the resulting cell is then tightened onto the card blob itself, and finally
   any fully-dark border rows/columns are trimmed.

That per-row / per-column measurement matters because the sheet's grid drifts
by several pixels from one row to the next.

Usage:
  slice_cards.py <sheet.png> <out_dir> <rows> <cols> [scale] [--pad N]
"""
import json
import os
import sys

import numpy as np
from PIL import Image

DARK = 26.0     # luminance at or below this is empty sheet background


def ideal_lines(profile, count):
    """evenly spaced starting guesses across the sheet's content span"""
    on = np.where(profile > profile.min() + 6.0)[0]
    lo, hi = int(on[0]), int(on[-1]) + 1
    step = (hi - lo) / float(count)
    return [lo + i * step for i in range(count + 1)], max(3, int(step * 0.13))


def refine(profile, guesses, win):
    """snap each guess to the darkest slice within +/- win"""
    out = []
    for i, gpos in enumerate(guesses):
        a = int(max(0, gpos - win))
        b = int(min(len(profile), gpos + win + 1))
        if b - a < 2:
            out.append(int(gpos))
            continue
        pos = a + int(np.argmin(profile[a:b]))
        if i == 0:
            pos = min(pos, int(gpos))            # never eat into the first card
        elif i == len(guesses) - 1:
            pos = max(pos, int(gpos))           # nor the last one
        out.append(pos)
    return out


def cut_slivers(gray, box):
    """remove anything separated from the card by a full background band

    Near each edge we look for a line whose brightest pixel is still pure
    background: that is a real separation, so whatever lies beyond it belongs
    to a neighbouring card or to the sheet's footer text, not to this card.
    """
    x0, y0, x1, y1 = box
    sub = gray[y0:y1, x0:x1]
    colmax, rowmax = sub.max(axis=0), sub.max(axis=1)

    def gap(profile):
        limit = int(len(profile) * 0.18)
        found = 0
        for i in range(limit):
            if profile[i] <= DARK:
                found = i + 1
        return found

    x0 += gap(colmax)
    x1 -= gap(colmax[::-1])
    y0 += gap(rowmax)
    y1 -= gap(rowmax[::-1])
    return x0, y0, x1, y1


def trim_dark(gray, box):
    """drop border lines that are pure background, keep everything else"""
    x0, y0, x1, y1 = box
    sub = gray[y0:y1, x0:x1]
    while x1 - x0 > 8 and sub[:, 0].max() <= DARK:
        x0 += 1; sub = gray[y0:y1, x0:x1]
    while x1 - x0 > 8 and sub[:, -1].max() <= DARK:
        x1 -= 1; sub = gray[y0:y1, x0:x1]
    while y1 - y0 > 8 and sub[0].max() <= DARK:
        y0 += 1; sub = gray[y0:y1, x0:x1]
    while y1 - y0 > 8 and sub[-1].max() <= DARK:
        y1 -= 1; sub = gray[y0:y1, x0:x1]
    return x0, y0, x1, y1


def main():
    src, out_dir = sys.argv[1], sys.argv[2]
    rows, cols = int(sys.argv[3]), int(sys.argv[4])
    scale, pad = 1.0, 0
    rest, i = sys.argv[5:], 0
    while i < len(rest):
        if rest[i] == "--pad":
            pad = int(rest[i + 1]); i += 2
        else:
            scale = float(rest[i]); i += 1

    os.makedirs(out_dir, exist_ok=True)
    img = Image.open(src).convert("RGB")
    gray = np.asarray(img, dtype=float).mean(axis=2)
    H, W = gray.shape
    print("sheet:", img.size, "grid:", rows, "x", cols)

    gx, winx = ideal_lines(gray.mean(axis=0), cols)
    gy, winy = ideal_lines(gray.mean(axis=1), rows)
    coarse_x = refine(gray.mean(axis=0), gx, winx)
    coarse_y = refine(gray.mean(axis=1), gy, winy)

    # vertical cuts measured separately for every row of cards
    row_x = [refine(gray[coarse_y[r]:coarse_y[r + 1]].mean(axis=0), gx, winx)
             for r in range(rows)]
    # horizontal cuts measured separately for every column of cards
    col_y = [refine(gray[:, coarse_x[c]:coarse_x[c + 1]].mean(axis=1), gy, winy)
             for c in range(cols)]

    boxes, worst = {}, (0.0, "")
    for r in range(rows):
        for c in range(cols):
            x0, x1 = row_x[r][c], row_x[r][c + 1]
            y0, y1 = col_y[c][r], col_y[c][r + 1]
            box = trim_dark(gray, (max(0, x0 - pad), max(0, y0 - pad),
                                   min(W, x1 + pad), min(H, y1 + pad)))
            box = trim_dark(gray, cut_slivers(gray, box))
            crop = img.crop(box)
            if scale != 1.0:
                crop = crop.resize((round(crop.width * scale), round(crop.height * scale)),
                                   Image.LANCZOS)
            name = "r%dc%d.png" % (r, c)
            crop.save(os.path.join(out_dir, name), optimize=True)
            boxes[name] = list(box)

            e = np.asarray(crop.convert("L"), dtype=float)
            rim = np.concatenate([e[:, :2].ravel(), e[:, -2:].ravel(),
                                  e[:2].ravel(), e[-2:].ravel()])
            leak = float((rim > 90).mean())
            worst = max(worst, (leak, name))
            print(name, crop.size, "box", box, "rim-leak %.2f%%" % (leak * 100))

    json.dump(boxes, open(os.path.join(out_dir, "boxes.json"), "w"), indent=1)
    print("worst rim leak: %s %.2f%%" % (worst[1], worst[0] * 100))


if __name__ == "__main__":
    main()
