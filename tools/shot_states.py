#!/usr/bin/env python3
"""Capture responsive and interaction states for the docs folder."""
import os
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
URL = "file://" + os.path.join(ROOT, "index.html")

VIEWPORTS = [
    ("phone_390x844", 390, 844),
    ("phone_360x780", 360, 780),
    ("tablet_820x1180", 820, 1180),
    ("desktop_1440x900", 1440, 900),
]


def main():
    os.makedirs(DOCS, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, w, h in VIEWPORTS:
            pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
            pg.goto(URL)
            pg.wait_for_timeout(700)
            pg.screenshot(path=os.path.join(DOCS, "state_" + name + ".png"))
            print("shot", name)
            pg.close()

        pg = b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        pg.goto(URL)
        pg.wait_for_timeout(500)
        pg.click('[data-act="market"]')
        pg.wait_for_timeout(600)
        pg.screenshot(path=os.path.join(DOCS, "state_overlay.png"))
        print("shot overlay")
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(400)
        pg.click('[data-act="energy"]')
        pg.wait_for_timeout(500)
        pg.screenshot(path=os.path.join(DOCS, "state_toast.png"))
        print("shot toast")
        b.close()


if __name__ == "__main__":
    main()
