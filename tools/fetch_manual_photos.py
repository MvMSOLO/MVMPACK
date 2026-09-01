#!/usr/bin/env python3
"""Fetch the last few player photos from curated per-player sources.

The generic Wikipedia/Commons crawler cannot resolve a handful of very young
players (no free portrait exists yet).  For those we keep an explicit list of
official club / press portrait URLs so every one of the 220 cards gets a real
photo.  Results are merged into the same manifest used by
``fetch_player_photos.py``.

usage:  python3 tools/fetch_manual_photos.py [ids...]
"""

import hashlib
import json
import pathlib
import sys

import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
RAW = ROOT / "assets/players/raw"
DB = ROOT / "data/players_220.json"
MANIFEST = ROOT / "data/photo_manifest.json"

UA = ("MVMPACK-card-builder/1.0 (offline fan project; contact: "
      "builder@mvmpack.local)")

# key -> (source page, direct image url, credit)
OVERRIDES = {
    "145": ("manutd.com",
            "https://dynamic-crop-cdn.scoreplay.io/472/4896326/"
            "media_102559909_102167033.jpg?fmt=jpeg&f=center&w=900&h=1200",
            "Manchester United official squad portrait"),
    "150": ("chelseafc.com",
            "https://img.chelseafc.com/image/upload/f_jpg,w_1200,c_fill,"
            "g_faces,q_90/editorial/news/2024/07/26/"
            "Carney_Chukwuemeka_vs_Wrexham_2.jpg",
            "Chelsea FC editorial photo"),
    "159": ("sorare.com",
            "https://assets.sorare.com/playerpicture/"
            "97304afa-6f45-4f50-bef6-f2b0900768df/picture/"
            "squared-f46a09278f45c871c9bf644ead5496c9.png",
            "Sorare player picture"),
    "170": ("newcastleunited.com",
            "https://images.ctfassets.net/9ec6988xevcz/2dipMzwjV4PUHVlAPy5U3V/"
            "f243e95e34867825ce96ce8beffa75a8/"
            "Tino_Livramento-02-removebg-preview.png?w=900",
            "Newcastle United official squad portrait"),
    "172": ("commons.wikimedia.org",
            "https://upload.wikimedia.org/wikipedia/commons/2/28/"
            "Lewis_Miley.png",
            "Wikimedia Commons: File:Lewis Miley.png"),
    "185": ("bbc.com",
            "https://ichef.bbci.co.uk/ace/standard/1600/cpsprodpb/67e0/live/"
            "960371d0-04e7-11f0-94d4-6f954f5dcfa3.jpg",
            "BBC Sport editorial photo"),
    "200": ("eintracht.de",
            "https://media.eintracht.de/image/upload/ar_1:1,c_fill,dpr_2.0,"
            "f_jpg,g_xy_center,q_80,w_700,x_w_mul_0.5,y_h_mul_0/"
            "manner_nkounkou_hero-9e20.png",
            "Eintracht Frankfurt official squad portrait"),
    "203": ("eintracht.de",
            "https://media.eintracht.de/image/upload/ar_1:1,c_fill,dpr_2.0,"
            "f_jpg,g_xy_center,q_80,w_700,x_w_mul_0.5,y_h_mul_0/"
            "robin_koch_hero-a423.png",
            "Eintracht Frankfurt official squad portrait"),
    "220": ("breakingthelines.com",
            "https://cdn.breakingthelines.app/media/wp/2024/06/"
            "Andrea-Cambiaso.jpg",
            "Breaking The Lines editorial photo"),
}


def main():
    RAW.mkdir(parents=True, exist_ok=True)
    only = {a.zfill(3) for a in sys.argv[1:] if a.isdigit()}
    players = {"%03d" % int(p["id"].split("_")[1]): p
               for p in json.loads(DB.read_text(encoding="utf-8"))}
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) \
        if MANIFEST.exists() else {}

    session = requests.Session()
    session.headers.update({"User-Agent": UA, "Accept": "image/*,*/*"})

    ok = 0
    for key, (site, url, credit) in sorted(OVERRIDES.items()):
        if only and key not in only:
            continue
        rec = players.get(key)
        if rec is None:
            continue
        try:
            blob = session.get(url, timeout=90).content
            if len(blob) < 4000:
                raise ValueError("file too small (%d bytes)" % len(blob))
            (RAW / ("player_%s.jpg" % key)).write_bytes(blob)
        except Exception as exc:
            print("FAIL  %s %-24s %s" % (key, rec["short_name"], exc),
                  flush=True)
            continue
        manifest[key] = {
            "player_id": int(key), "player": rec["short_name"],
            "source_title": credit, "source_site": site, "source_url": url,
            "sha256": hashlib.sha256(blob).hexdigest(), "bytes": len(blob),
            "resolver": "manual",
        }
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2),
                            encoding="utf-8")
        ok += 1
        print("OK    %s %-24s %s" % (key, rec["short_name"], site), flush=True)

    have = sum(1 for k in players
               if (RAW / ("player_%s.jpg" % k)).exists()
               and manifest.get(k, {}).get("source_url"))
    print("\nmanual fetched: %d" % ok, flush=True)
    print("photos resolved: %d / %d" % (have, len(players)), flush=True)


if __name__ == "__main__":
    main()
