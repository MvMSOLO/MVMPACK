# MVMPACK 26

Pixel-faithful HTML/CSS recreation of the **MVMPACK 26** mobile game home screen
(MADFUT-style football card game UI).

The artwork is **not** re-imagined or AI-generated: every visual element is sliced
directly from the original 1024x1536 mockup, so the rebuilt screen matches the
reference 1:1 while gaining real responsive layout, hotspots, overlays and
animations.

## Screenshot

| Reference | Rebuilt render |
| --- | --- |
| `assets/reference.png` | `docs/render.png` |

Pixel diff at the native 1024x1536 size:

```
mean abs diff:      0.105 / 255
pixels off by >24:  0.297 %   (only the live red badge + active-tab glow)
```

## Layout

The screen is split into the seven bands measured from the mockup. Each band keeps
its exact height share, so the whole UI scales as one piece and never drifts:

| Section | Y range in source | Height share |
| --- | --- | --- |
| Header (profile, coins, gems, energy, icons) | 0 - 104 | 6.77 % |
| Hero (MVMPACK 26 / Legends never die / new event) | 104 - 500 | 25.78 % |
| Row 1 (Pack Opening, Draft) | 500 - 806 | 19.92 % |
| Row 2 (AI Match, Squad Builder) | 806 - 1020 | 13.93 % |
| Squares (Market, Missions, Rewards, Tournaments) | 1020 - 1196 | 11.46 % |
| Promo (Legend Pack / SIUUUI mode on) | 1196 - 1396 | 13.02 % |
| Bottom nav (Home, My Club, orb, Transfers, Store) | 1396 - 1536 | 9.11 % |

## Structure

```
index.html               single screen markup
assets/reference.png     original mockup (source of truth)
assets/sections/*.png    the 7 sliced bands used as section artwork
assets/sprites/*.png     individual tiles/cards/orb for reuse
src/styles/base.css      tokens, reset, colour palette
src/styles/layout.css    2:3 stage, section heights, hotspot system
src/styles/sections.css  per-section artwork + badges
src/styles/effects.css   glow, light sweep, overlay screen, toast
src/core/data.js         static content for every panel
src/core/app.js          hotspot routing, overlay, toast, nav state
tools/slice_assets.py    regenerate all slices from the mockup
tools/diff_shot.py       render + pixel-diff against the reference
tools/shot_states.py     capture responsive & interaction states
docs/                    render, diff and state screenshots
```

## Interaction

Every clickable region of the mockup is a transparent hotspot positioned in
percentages, so taps stay on target at any screen size:

- Profile, coins, gems, energy, mail, leaderboard, settings in the header
- Hero event CTA
- Pack Opening, Draft, AI Match, Squad Builder tiles
- Market, Missions, Rewards, Tournaments squares
- Promo "Open now" button
- Bottom nav with active state and glowing centre orb

Tiles open a detail overlay (Esc or backdrop closes it); currency and utility
icons raise a toast.

## Colours

```
background  #050a14
gold        #ffcc00
cyan        #00f2ff
purple      #b026ff
green       #00ff41
red badge   #ff2d55
```

## Run

No build step, no dependencies:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Opening `index.html` directly from disk also works.

## Regenerate assets / verify

```bash
python3 tools/slice_assets.py path/to/mockup.png
python3 tools/diff_shot.py
python3 tools/shot_states.py
```

`diff_shot.py` needs `pillow`, `numpy` and `playwright` (`playwright install chromium`).

## Accessibility & responsiveness

- Every hotspot is a real `<button>` with an `aria-label`
- Overlay is a focus-managed `role="dialog"`, closable with Esc
- Visible focus rings, `prefers-reduced-motion` respected
- Verified at 360x780, 390x844, 820x1180 and 1440x900
