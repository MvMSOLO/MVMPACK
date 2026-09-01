#!/usr/bin/env python3
"""Re-download raw player photos that are not decodable images.

Some Wikimedia downloads came back as an HTML error page (rate limiting) or as
a thumbnail that is too small for a 768x1024 card.  This tool re-fetches those
entries from the url already stored in data/photo_manifest.json, asking for a
larger thumbnail when the original is tiny, and verifies the result really is
an image before overwriting the file.

usage:  python3 tools/repair_photos.py [min_side]
"""

import hashlib
import io
import json
import pathlib
import re
import sys
import time

import requests
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
RAW = ROOT / "assets/players/raw"
MANIFEST = ROOT / "data/photo_manifest.json"

UA = ("MVMPACK-card-builder/1.0 (offline fan project; contact: "
      "builder@mvmpack.local)")
HEAD = {"User-Agent": UA, "Accept": "image/*,*/*;q=0.8"}


def ok_image(blob, min_side):
    """True when the bytes decode as an image big enough for a card."""
    try:
        im = Image.open(io.BytesIO(blob))
        im.load()
    except Exception:
        return False
    return min(im.size) >= min_side


def variants(url):
    """Yield the stored url plus bigger-thumbnail rewrites for Wikimedia."""
    seen = []
    def add(u):
        if u and u not in seen:
            seen.append(u)

    base = url.split("?")[0]
    add(url)
    add(base)
    m = re.match(r"(https://upload\.wikimedia\.org/wikipedia/commons)/"
                 r"thumb/(\w/\w\w/[^/]+)/\d+px-.*$", base)
    if m:
        for px in (1600, 1280, 1024, 800):
            add("%s/thumb/%s/%dpx-%s" % (m.group(1), m.group(2), px,
                                         m.group(2).split("/")[-1]))
        add("%s/%s" % (m.group(1), m.group(2)))          # full original
    m = re.match(r"(https://upload\.wikimedia\.org/wikipedia/commons)/"
                 r"(\w/\w\w/([^/]+))$", base)
    if m:
        for px in (1600, 1280, 1024):
            add("%s/thumb/%s/%dpx-%s" % (m.group(1), m.group(2), px,
                                         m.group(3)))
    return seen


def fetch(url, min_side, session):
    for u in variants(url):
        for attempt in range(3):
            try:
                r = session.get(u, headers=HEAD, timeout=25)
            except Exception:
                time.sleep(1.5)
                continue
            if r.status_code == 429 or r.status_code >= 500:
                time.sleep(2.0 + attempt * 2)
                continue
            if r.status_code != 200:
                break
            if ok_image(r.content, min_side):
                return u, r.content
            break
        time.sleep(0.4)
    return None, None


def main():
    min_side = int(sys.argv[1]) if len(sys.argv) > 1 else 200
    manifest = json.loads(MANIFEST.read_text("utf-8"))

    broken = []
    for n in range(1, 221):
        key = "%03d" % n
        path = RAW / ("player_%s.jpg" % key)
        if not path.exists():
            broken.append(key)
            continue
        if not ok_image(path.read_bytes(), min_side):
            broken.append(key)

    print("broken or too small: %d" % len(broken))
    session = requests.Session()
    fixed, failed = 0, []
    for key in broken:
        rec = manifest.get(key) or {}
        src = rec.get("source_url", "")
        used, blob = fetch(src, min_side, session)
        if not blob:
            failed.append(key)
            print("FAIL  %s  %s" % (key, rec.get("player", "?")))
            continue
        (RAW / ("player_%s.jpg" % key)).write_bytes(blob)
        im = Image.open(io.BytesIO(blob))
        rec["source_url"] = used
        rec["sha256"] = hashlib.sha256(blob).hexdigest()
        rec["px"] = list(im.size)
        manifest[key] = rec
        fixed += 1
        print("OK    %s  %-24s %dx%d" % (key, rec.get("player", "?")[:24],
                                         im.size[0], im.size[1]))
        time.sleep(0.3)

    MANIFEST.write_text(json.dumps(manifest, indent=1, ensure_ascii=False,
                                   sort_keys=True), "utf-8")
    print("\nrepaired: %d, still failing: %d %s" %
          (fixed, len(failed), " ".join(failed)))


if __name__ == "__main__":
    main()
