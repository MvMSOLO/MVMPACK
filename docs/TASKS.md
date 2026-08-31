# MVMPACK 26 - ish rejasi (6 vazifa)

| # | Vazifa | Holat | Natija |
| --- | --- | --- | --- |
| 1 | Manba maketni o'lchash: 7 ta bo'lim chegarasi, tile va tugma koordinatalari | tugallandi | aniq y-kesimlar: 104 / 500 / 806 / 1020 / 1196 / 1396 |
| 2 | Rasmni bo'laklash (bo'limlar + spritelar), original grafikani saqlash | tugallandi | `assets/sections/*.png`, `assets/sprites/*.png` |
| 3 | HTML skeleti + 1024x1536 nisbatli responsiv sahna | tugallandi | `index.html`, `src/styles/layout.css` |
| 4 | CSS: bo'lim grafikasi, neon nur, overlay, toast, nishonlar | tugallandi | `sections.css`, `effects.css`, `base.css` |
| 5 | Interaktiv qatlam: hotspotlar, panellar, navigatsiya holati | tugallandi | `src/core/app.js`, `src/core/data.js` |
| 6 | Tekshirish (piksel-diff, ekran holatlari), hujjat, git commit | tugallandi | `tools/diff_shot.py`, `docs/`, `README.md` |

## Tekshiruv natijasi

1024x1536 o'lchamda original bilan solishtirish:

```
o'rtacha xato:        0.105 / 255
>24 farqli pikselar:  0.297 %
bo'limlar bo'yicha:   header 0.36 | hero 0.00 | row1 0.00 | row2 0.00
                      squares 0.00 | promo 0.00 | nav 1.71
```

Qolgan farq faqat qo'shilgan jonli effektlardan: do'kondagi qizil nuqta
pulsatsiyasi va faol "Home" tugmasining oltin yorqinligi.

## Ekran holatlari

`docs/` ichida: 360x780, 390x844, 820x1180, 1440x900, overlay va toast holatlari.
