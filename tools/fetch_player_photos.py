#!/usr/bin/env python3
"""Fetch a real photograph for every record in data/players_220.json.

A footballer's Wikipedia article carries a real lead photo in its infobox, so
the player is resolved to an article and that article's lead image is taken at
full size.  Requests are batched (20 titles per API call) to stay far below
Wikimedia's rate limits; players still unresolved fall back to a per-player
search and finally to a Commons file search.

Files are named after the immutable player id -- player_007.jpg always belongs
to record #7 -- and every download is recorded with its source in
data/photo_manifest.json, so a run can be interrupted and resumed.

usage:  python3 tools/fetch_player_photos.py [--force] [--stage=1|2|3] [ids...]
"""
import hashlib
import json
import re
import sys
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from threading import Lock

import requests

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data/players_220.json"
RAW = ROOT / "assets/players/raw"
MANIFEST = ROOT / "data/photo_manifest.json"
WIKI = "https://en.wikipedia.org/w/api.php"
COMMONS = "https://commons.wikimedia.org/w/api.php"
HEAD = {"User-Agent": "MVMPACK/1.0 (player portrait pipeline; builder@mvmpack.local)"}

BAD = (
    "statue", "est\u00e1tua", "museum", "tussauds", "wax", "mural", "graffiti",
    "signature", "logo", "crest", "stamp", "coin", "map", "stadium", "trophy",
    "drawing", "caricature", "cartoon", "poster", "tattoo", "grave", "plaque",
    "flag", "icon", "replace_this_image", "no_free_image", "question_book",
    "commons-logo", "disambig",
)
SPORT = ("football", "soccer", "midfielder", "forward", "defender",
         "goalkeeper", "winger", "striker", "centre-back", "full-back")
lock = Lock()
session = requests.Session()
session.headers.update(HEAD)


def fold(s):
    """lowercase, accent-free form so 'Mbapp\u00e9' matches 'Mbappe'."""
    s = unicodedata.normalize("NFKD", s or "")
    return "".join(c for c in s if not unicodedata.combining(c)).lower()


def words(name):
    return [w for w in re.split(r"[^a-z0-9]+", fold(name)) if len(w) > 2]


def api(url, params, tries=5):
    """Polite GET: honours 429/503 with exponential back-off."""
    params = dict(params, format="json", formatversion=2)
    delay = 2.0
    for _ in range(tries):
        try:
            r = session.get(url, params=params, timeout=45)
            if r.status_code == 200:
                return r.json()
            if r.status_code in (429, 503):
                time.sleep(delay)
                delay = min(delay * 2, 30)
                continue
            return {}
        except Exception:
            time.sleep(delay)
            delay = min(delay * 2, 30)
    return {}


def clean(url):
    return url and not any(b in fold(url) for b in BAD)


def pages_with_image(params):
    """Yield (normalised_query_title, image_url, article_title, intro_text)."""
    data = api(WIKI, dict(params, action="query",
                          prop="pageimages|extracts",
                          piprop="original|thumbnail", pithumbsize=1200, pilimit="max",
                          exintro=1, explaintext=1, exlimit="max", redirects=1))
    query = data.get("query", {})
    # map every alias (requested title / redirect) back to the final page title
    alias = {}
    for k in ("normalized", "redirects"):
        for m in query.get(k, []) or []:
            alias.setdefault(fold(m.get("to")), set()).add(fold(m.get("from")))
    for page in query.get("pages", []) or []:
        if page.get("missing"):
            continue
        src = ((page.get("original") or {}).get("source")
               or (page.get("thumbnail") or {}).get("source"))
        if not clean(src):
            continue
        title = page.get("title", "")
        keys = {fold(title)} | alias.get(fold(title), set())
        yield keys, src, title, fold(page.get("extract", ""))


def looks_like_player(rec, title, text):
    """Accept the article only if it is about this footballer."""
    blob = fold(title) + " " + text
    if not any(k in blob for k in SPORT):
        return False
    surname = words(rec["short_name"])[-1] if words(rec["short_name"]) else ""
    return not surname or surname in blob


# ---------------------------------------------------------------- stage 1
def stage_batch(todo, found, variant):
    """Resolve many players at once: 20 article titles per API request."""
    pending = [r for r in todo if r["_key"] not in found]
    lookup = {}
    for rec in pending:
        for name in variant(rec):
            if name:
                lookup.setdefault(fold(name), rec)
    titles = list({})
    seen = set()
    for rec in pending:
        for name in variant(rec):
            if name and fold(name) not in seen:
                seen.add(fold(name))
                titles.append(name)
    for i in range(0, len(titles), 20):
        chunk = titles[i:i + 20]
        hits = 0
        for keys, src, title, text in pages_with_image({"titles": "|".join(chunk)}):
            rec = next((lookup[k] for k in keys if k in lookup), None)
            if not rec or rec["_key"] in found:
                continue
            if looks_like_player(rec, title, text):
                found[rec["_key"]] = (src, title)
                hits += 1
        print("  batch %3d-%3d  +%d  (total %d)" % (i, i + len(chunk), hits, len(found)),
              flush=True)
        time.sleep(0.3)


# ---------------------------------------------------------------- stage 2
def stage_search(rec):
    """Wikipedia full-text search for one stubborn player."""
    queries = ["%s footballer" % rec["short_name"]]
    if rec.get("club"):
        queries.append("%s %s footballer" % (rec["short_name"], rec["club"]))
    if rec.get("full_name") and fold(rec["full_name"]) != fold(rec["short_name"]):
        queries.append("%s footballer" % rec["full_name"])
    for q in queries:
        for _keys, src, title, text in pages_with_image(
                {"generator": "search", "gsrsearch": q, "gsrlimit": 6}):
            if looks_like_player(rec, title, text):
                return src, title
        time.sleep(0.4)
    return None, None


# ---------------------------------------------------------------- stage 3
def stage_commons(rec):
    """Last resort: pick the best-matching Commons file by title."""
    surname = words(rec["short_name"])[-1] if words(rec["short_name"]) else ""
    names = [rec["short_name"]]
    if rec.get("full_name") and fold(rec["full_name"]) != fold(rec["short_name"]):
        names.append(rec["full_name"])
    for name in names:
        data = api(COMMONS, {"action": "query", "generator": "search",
                             "gsrsearch": '"%s" football' % name, "gsrnamespace": 6,
                             "gsrlimit": 25, "prop": "imageinfo",
                             "iiprop": "url|mime|size", "iiurlwidth": 1200})
        best, best_score = (None, None), 0
        for page in data.get("query", {}).get("pages", []) or []:
            info = (page.get("imageinfo") or [{}])[0]
            url = info.get("thumburl") or info.get("url")
            title = page.get("title", "")
            low = fold(title)
            if not url or not clean(low) or surname not in low:
                continue
            if not str(info.get("mime", "")).startswith("image/"):
                continue
            score = sum(4 for w in words(name) if w in low)
            w, h = info.get("width") or 0, info.get("height") or 0
            if w and h and 0.55 <= w / h <= 1.25:
                score += 3
            if score > best_score:
                best, best_score = (url, title), score
        if best[0]:
            return best
        time.sleep(0.4)
    return None, None


def download(rec, src, title, manifest):
    key = rec["_key"]
    try:
        blob = session.get(src, timeout=120).content
        if len(blob) < 4000:
            raise ValueError("file too small")
        (RAW / ("player_%s.jpg" % key)).write_bytes(blob)
    except Exception as exc:
        print("FAIL  %s %s (%s)" % (key, rec["short_name"], exc), flush=True)
        return False
    with lock:
        manifest[key] = {
            "player_id": rec["_pid"], "player": rec["short_name"],
            "source_title": title, "source_url": src,
            "sha256": hashlib.sha256(blob).hexdigest(), "bytes": len(blob),
        }
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2),
                            encoding="utf-8")
    print("OK    %s %-26s %s" % (key, rec["short_name"], title), flush=True)
    return True


def main():
    RAW.mkdir(parents=True, exist_ok=True)
    players = json.loads(DB.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    args = sys.argv[1:]
    force = "--force" in args
    stages = {int(a.split("=")[1]) for a in args if a.startswith("--stage=")} or {1, 2, 3}
    only = {a.zfill(3) for a in args if a.isdigit()}

    todo = []
    for rec in players:
        pid = int(rec["id"].split("_")[1])
        rec["_pid"], rec["_key"] = pid, "%03d" % pid
        if only and rec["_key"] not in only:
            continue
        done = (RAW / ("player_%s.jpg" % rec["_key"])).exists() \
            and manifest.get(rec["_key"], {}).get("source_url")
        if done and not force:
            continue
        todo.append(rec)
    print("players to resolve: %d" % len(todo), flush=True)

    found = {}
    if 1 in stages:
        stage_batch(todo, found, lambda r: [r["short_name"]])
        stage_batch(todo, found, lambda r: ["%s (footballer)" % r["short_name"],
                                            "%s (football player)" % r["short_name"]])
        stage_batch(todo, found, lambda r: [r.get("full_name")])
        print("stage 1 resolved %d" % len(found), flush=True)

    rest = [r for r in todo if r["_key"] not in found]
    if 2 in stages and rest:
        with ThreadPoolExecutor(max_workers=3) as pool:
            for rec, (src, title) in zip(rest, pool.map(stage_search, rest)):
                if src:
                    found[rec["_key"]] = (src, title)
        print("after stage 2: %d" % len(found), flush=True)

    rest = [r for r in todo if r["_key"] not in found]
    if 3 in stages and rest:
        with ThreadPoolExecutor(max_workers=3) as pool:
            for rec, (src, title) in zip(rest, pool.map(stage_commons, rest)):
                if src:
                    found[rec["_key"]] = (src, title)
        print("after stage 3: %d" % len(found), flush=True)

    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(lambda r: download(r, found[r["_key"]][0], found[r["_key"]][1], manifest),
                      [r for r in todo if r["_key"] in found]))

    for rec in todo:
        if rec["_key"] not in manifest or not manifest[rec["_key"]].get("source_url"):
            print("MISS  %s %s" % (rec["_key"], rec["short_name"]), flush=True)
    have = sum(1 for v in manifest.values() if v.get("source_url"))
    print("\nphotos resolved: %d / %d" % (have, len(players)))


if __name__ == "__main__":
    main()
