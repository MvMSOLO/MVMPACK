#!/usr/bin/env python3
"""Generate src/core/cards_std.js from data/players_220.json (220 std cards)."""
import json, os, hashlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "players_220.json")
OUT = os.path.join(ROOT, "src", "core", "cards_std.js")

FLAGS = {
 "Argentina":"\U0001F1E6\U0001F1F7","Portugal":"\U0001F1F5\U0001F1F9","Brazil":"\U0001F1E7\U0001F1F7",
 "France":"\U0001F1EB\U0001F1F7","England":"\U0001F3F4","Spain":"\U0001F1EA\U0001F1F8",
 "Germany":"\U0001F1E9\U0001F1EA","Italy":"\U0001F1EE\U0001F1F9","Netherlands":"\U0001F1F3\U0001F1F1",
 "Belgium":"\U0001F1E7\U0001F1EA","Croatia":"\U0001F1ED\U0001F1F7","Uruguay":"\U0001F1FA\U0001F1FE",
 "Norway":"\U0001F1F3\U0001F1F4","Sweden":"\U0001F1F8\U0001F1EA","Denmark":"\U0001F1E9\U0001F1F0",
 "Poland":"\U0001F1F5\U0001F1F1","Egypt":"\U0001F1EA\U0001F1EC","Senegal":"\U0001F1F8\U0001F1F3",
 "Morocco":"\U0001F1F2\U0001F1E6","Nigeria":"\U0001F1F3\U0001F1EC","Ghana":"\U0001F1EC\U0001F1ED",
 "Cameroon":"\U0001F1E8\U0001F1F2","Algeria":"\U0001F1E9\U0001F1FF","Ivory Coast":"\U0001F1E8\U0001F1EE",
 "Cote d'Ivoire":"\U0001F1E8\U0001F1EE","C\u00f4te d\u2019Ivoire":"\U0001F1E8\U0001F1EE",
 "Gambia":"\U0001F1EC\U0001F1F2","Japan":"\U0001F1EF\U0001F1F5","South Korea":"\U0001F1F0\U0001F1F7",
 "Korea Republic":"\U0001F1F0\U0001F1F7","Australia":"\U0001F1E6\U0001F1FA","Mexico":"\U0001F1F2\U0001F1FD",
 "United States":"\U0001F1FA\U0001F1F8","USA":"\U0001F1FA\U0001F1F8","Canada":"\U0001F1E8\U0001F1E6",
 "Colombia":"\U0001F1E8\U0001F1F4","Chile":"\U0001F1E8\U0001F1F1","Peru":"\U0001F1F5\U0001F1EA",
 "Ecuador":"\U0001F1EA\U0001F1E8","Paraguay":"\U0001F1F5\U0001F1FE","Venezuela":"\U0001F1FB\U0001F1EA",
 "Turkey":"\U0001F1F9\U0001F1F7","T\u00fcrkiye":"\U0001F1F9\U0001F1F7","Austria":"\U0001F1E6\U0001F1F9",
 "Switzerland":"\U0001F1E8\U0001F1ED","Serbia":"\U0001F1F7\U0001F1F8","Ukraine":"\U0001F1FA\U0001F1E6",
 "Russia":"\U0001F1F7\U0001F1FA","Czech Republic":"\U0001F1E8\U0001F1FF","Czechia":"\U0001F1E8\U0001F1FF",
 "Slovakia":"\U0001F1F8\U0001F1F0","Slovenia":"\U0001F1F8\U0001F1EE","Hungary":"\U0001F1ED\U0001F1FA",
 "Romania":"\U0001F1F7\U0001F1F4","Bulgaria":"\U0001F1E7\U0001F1EC","Greece":"\U0001F1EC\U0001F1F7",
 "Scotland":"\U0001F3F4","Wales":"\U0001F3F4","Ireland":"\U0001F1EE\U0001F1EA",
 "Republic of Ireland":"\U0001F1EE\U0001F1EA","Northern Ireland":"\U0001F3F4",
 "Finland":"\U0001F1EB\U0001F1EE","Iceland":"\U0001F1EE\U0001F1F8","Albania":"\U0001F1E6\U0001F1F1",
 "Bosnia and Herzegovina":"\U0001F1E7\U0001F1E6","North Macedonia":"\U0001F1F2\U0001F1F0",
 "Georgia":"\U0001F1EC\U0001F1EA","Armenia":"\U0001F1E6\U0001F1F2","Israel":"\U0001F1EE\U0001F1F1",
 "Iran":"\U0001F1EE\U0001F1F7","Iraq":"\U0001F1EE\U0001F1F6","Saudi Arabia":"\U0001F1F8\U0001F1E6",
 "Qatar":"\U0001F1F6\U0001F1E6","United Arab Emirates":"\U0001F1E6\U0001F1EA","Tunisia":"\U0001F1F9\U0001F1F3",
 "Mali":"\U0001F1F2\U0001F1F1","Guinea":"\U0001F1EC\U0001F1F3","Gabon":"\U0001F1EC\U0001F1E6",
 "Congo DR":"\U0001F1E8\U0001F1E9","DR Congo":"\U0001F1E8\U0001F1E9","Zambia":"\U0001F1FF\U0001F1F2",
 "South Africa":"\U0001F1FF\U0001F1E6","Kenya":"\U0001F1F0\U0001F1EA","Uzbekistan":"\U0001F1FA\U0001F1FF",
 "China":"\U0001F1E8\U0001F1F3","China PR":"\U0001F1E8\U0001F1F3","India":"\U0001F1EE\U0001F1F3",
 "Indonesia":"\U0001F1EE\U0001F1E9","Thailand":"\U0001F1F9\U0001F1ED","Vietnam":"\U0001F1FB\U0001F1F3",
 "New Zealand":"\U0001F1F3\U0001F1FF","Costa Rica":"\U0001F1E8\U0001F1F7","Panama":"\U0001F1F5\U0001F1E6",
 "Jamaica":"\U0001F1EF\U0001F1F2","Honduras":"\U0001F1ED\U0001F1F3","Bolivia":"\U0001F1E7\U0001F1F4",
 "Cape Verde":"\U0001F1E8\U0001F1FB","Angola":"\U0001F1E6\U0001F1F4","Kosovo":"\U0001F1FD\U0001F1F0",
 "Montenegro":"\U0001F1F2\U0001F1EA","Belarus":"\U0001F1E7\U0001F1FE","Estonia":"\U0001F1EA\U0001F1EA",
 "Latvia":"\U0001F1F1\U0001F1FB","Lithuania":"\U0001F1F1\U0001F1F9","Luxembourg":"\U0001F1F1\U0001F1FA",
}

GK_IDS = {"mvm_022","mvm_023","mvm_052","mvm_053","mvm_092","mvm_136","mvm_144"}
PATTERNS = ["rays","stripes","grid","chevron","waves","diagonal","halo","burst",
            "speed","silk","shield","crown"]

MOTTOS = ["Every pack tells a story.", "Work first, headlines later.",
          "The badge before the name.", "Ninety minutes, no excuses.",
          "Built in training, proven on grass.", "Quiet feet, loud results.",
          "One more run, always.", "Pressure is a privilege."]


def jitter(pid, key, span):
    h = hashlib.md5((pid + ":" + key).encode("utf-8")).hexdigest()
    return (int(h[:6], 16) % (2 * span + 1)) - span


def cl(v):
    return max(20, min(99, int(round(v))))


def pick(pid, key, arr):
    h = hashlib.md5((pid + "#" + key).encode("utf-8")).hexdigest()
    return arr[int(h[:8], 16) % len(arr)]


def tier_of(raw):
    t = (raw or "").lower()
    if "gold" in t:
        return "gold"
    if "silver" in t:
        return "silver"
    return "bronze"


def outfield_sub(p, s):
    pid = p["id"]
    pac, sho, pas, dri, dfn, phy = s["pac"], s["sho"], s["pas"], s["dri"], s["def"], s["phy"]
    m = {
        "acceleration": pac + 2, "sprint": pac - 1, "positioning": sho + 1,
        "finishing": sho, "shotPower": sho + 2, "longShots": sho - 4,
        "volleys": sho - 7, "penalties": sho - 3, "vision": pas + 1,
        "crossing": pas - 3, "fkAccuracy": pas - 6, "shortPass": pas + 3,
        "longPass": pas - 1, "curve": pas - 4, "agility": dri + 1,
        "balance": dri, "reactions": (dri + phy) // 2 + 2, "ballControl": dri + 2,
        "dribbling": dri, "composure": (dri + pas) // 2, "interceptions": dfn - 1,
        "heading": (phy + sho) // 2 - 4, "defAwareness": dfn, "standTackle": dfn + 1,
        "slideTackle": dfn - 3, "jumping": phy - 1, "stamina": phy + 2,
        "strength": phy, "aggression": (phy + dfn) // 2,
    }
    return {k: cl(v + jitter(pid, k, 3)) for k, v in m.items()}


def gk_main(p, s):
    """The raw JSON keeps outfield-shaped numbers for keepers, so the six
    goalkeeper faces are rebuilt from OVR to stay believable."""
    pid, ovr = p["id"], p["ovr"]
    return {
        "DIV": cl(ovr + jitter(pid, "div", 2)),
        "HAN": cl(ovr - 3 + jitter(pid, "han", 3)),
        "KIC": cl(s["pas"] + jitter(pid, "kic", 3)),
        "REF": cl(ovr + 1 + jitter(pid, "ref", 2)),
        "SPD": cl(42 + jitter(pid, "spd", 8)),
        "POS": cl(ovr - 2 + jitter(pid, "pos", 3)),
    }


def gk_sub(p, s, m6):
    pid = p["id"]
    div, han, kic = m6["DIV"], m6["HAN"], m6["KIC"]
    ref, spd, pos = m6["REF"], m6["SPD"], m6["POS"]
    m = {
        "diving": div, "handling": han, "kicking": kic, "reflexes": ref,
        "gkSpeed": spd, "gkPositioning": pos, "oneOnOne": ref - 2,
        "penaltySave": div - 4, "crossClaim": han - 2, "sweeperKeeper": kic - 3,
        "longThrow": kic - 5, "punching": han - 3, "reactions": ref + 2,
        "composure": pos, "jumping": div - 1, "strength": han - 1,
        "stamina": 58 + jitter(pid, "stam", 6), "aggression": 38 + jitter(pid, "agg", 8),
        "vision": kic - 6,
        "shortPass": kic - 2, "longPass": kic - 4,
    }
    return {k: cl(v + jitter(pid, k, 3)) for k, v in m.items()}


PS_POOL = {
    "ST": ["Finesse Shot", "Power Shot", "Aerial", "Quick Step", "Rapid"],
    "CF": ["First Touch", "Finesse Shot", "Trickster", "Press Proven"],
    "LW": ["Rapid", "Trickster", "Whipped Pass", "Flair"],
    "RW": ["Rapid", "Technical", "Trivela", "Flair"],
    "CAM": ["Incisive Pass", "Technical", "Pinged Pass", "Press Proven"],
    "CM": ["Pinged Pass", "Long Ball Pass", "Relentless", "Press Proven"],
    "CDM": ["Anticipate", "Block", "Intercept", "Long Ball Pass"],
    "CB": ["Anticipate", "Jockey", "Aerial", "Bruiser"],
    "LB": ["Whipped Pass", "Relentless", "Jockey", "Quick Step"],
    "RB": ["Whipped Pass", "Relentless", "Jockey", "Quick Step"],
    "LM": ["Whipped Pass", "Rapid", "Technical", "Relentless"],
    "RM": ["Whipped Pass", "Rapid", "Technical", "Relentless"],
    "GK": ["Far Throw", "Rush Out", "Deflector", "Quick Reflexes"],
}

ALT = {
    "ST": ["CF"], "CF": ["ST", "CAM"], "LW": ["LM"], "RW": ["RM"],
    "CAM": ["CM"], "CM": ["CAM"], "CDM": ["CM"], "CB": ["CDM"],
    "LB": ["LM"], "RB": ["RM"], "LM": ["LW"], "RM": ["RW"], "GK": [],
}

TRAITS = ["Squad regular", "Big-game temperament", "Coach's favourite",
          "Academy graduate", "Set-piece specialist", "Leader in the tunnel",
          "Never hides in a derby", "Trains like it is a final",
          "Reads the game early", "Fitness machine"]


def price_of(ovr):
    if ovr >= 86:
        return "%.1fM" % (2.2 + (ovr - 86) * 1.4)
    if ovr >= 80:
        return "%.1fM" % (0.45 + (ovr - 80) * 0.28)
    if ovr >= 74:
        return "%dK" % (90 + (ovr - 74) * 55)
    return "%dK" % (6 + (ovr - 60) * 5)


def pull_of(ovr):
    # low OVR is common, high OVR is rare
    return round(max(0.35, 12.0 * (0.86 ** (ovr - 60))), 2)


def js(v):
    return json.dumps(v, ensure_ascii=False)


def main():
    with open(SRC, encoding="utf-8") as f:
        players = json.load(f)

    total = len(players)
    parts = []
    for i, p in enumerate(players):
        pid = p["id"]
        num = pid.split("_")[1]
        tier = tier_of(p.get("tier"))
        s = p["stats"]
        is_gk = pid in GK_IDS or p["position"] == "GK"
        pos = "GK" if is_gk else p["position"]
        if is_gk:
            main_stats = gk_main(p, s)
            sub = gk_sub(p, s, main_stats)
        else:
            main_stats = {"PAC": s["pac"], "SHO": s["sho"], "PAS": s["pas"],
                          "DRI": s["dri"], "DEF": s["def"], "PHY": s["phy"]}
            sub = outfield_sub(p, s)

        base = PS_POOL.get(pos, PS_POOL["CM"])
        ps = [base[0] + "+", base[1 % len(base)], base[2 % len(base)]]
        t1 = pick(pid, "t1", TRAITS)
        rest = [t for t in TRAITS if t != t1]
        tr = [t1, pick(pid, "t2", rest),
              ("Shot-stopper by trade" if is_gk else pos + " specialist")]
        c1 = {"gold": "#d8a12a", "silver": "#9aa7b4", "bronze": "#a4622c"}[tier]
        c2 = {"gold": "#2a1a05", "silver": "#1b2530", "bronze": "#2a1408"}[tier]

        card = {
            "id": "std-" + num,
            "name": p["short_name"].upper(),
            "full": p["full_name"],
            "pos": pos,
            "alt": ALT.get(pos, []),
            "nation": p["nation"],
            "flag": FLAGS.get(p["nation"], "\U0001F3F3"),
            "club": p["club"],
            "era": "MVM 26",
            "foot": p["preferred_foot"],
            "weak": p["weak_foot"],
            "skills": p["skill_moves"],
            "height": p["height_cm"],
            "weight": p["weight_kg"],
            "age": p["age"],
            "wr": p["work_rate"],
            "main": main_stats,
            "sub": sub,
            "playstyles": ps,
            "traits": tr,
            "price": price_of(p["ovr"]),
            "pull": pull_of(p["ovr"]),
            "ovr": p["ovr"],
            "gk": is_gk,
            "stdTier": tier,
            "photo": "assets/players/player_" + num + ".jpg",
            "art": "assets/players/illustrated/player_" + num + ".png",
            "frame": "assets/frames/" + tier + ".png",
            "league": p["league"],
            "back": {
                "theme": p["club"],
                "c1": c1,
                "c2": c2,
                "pattern": PATTERNS[i % len(PATTERNS)],
                "motto": pick(pid, "m", MOTTOS),
                "serial": "STD-%s/%d" % (num, total),
                "sign": p["short_name"],
            },
        }
        parts.append("    S(" + js(card) + ")")

    body = ",\n".join(parts)

    out = """/* ============================================================================
 * MVMPACK 26 \u2014 STANDARD SET (%d cards, %s\u2013%s OVR)
 * ----------------------------------------------------------------------------
 * Generated from data/players_220.json by tools/gen_cards_std.py \u2014 do not
 * hand-edit. Every card carries a real portrait (assets/players), an
 * illustrated fallback, a tier frame (gold / silver / bronze) and the full
 * attribute sheet (29 outfield / 21 goalkeeper).
 * Ids are prefixed "std-" so they never clash with icon / wc / cl / meme.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  if (!DB) { return; }

  var RARITY = { gold: "GOLD", silver: "SILVER", bronze: "BRONZE" };
  var SETNAME = {
    gold: "MVM Standard \\u00b7 Gold",
    silver: "MVM Standard \\u00b7 Silver",
    bronze: "MVM Standard \\u00b7 Bronze"
  };

  /* helper: every standard card shares the same type / rarity wiring */
  function S(o) {
    o.type = "std";
    o.tier = o.stdTier;
    o.rarity = RARITY[o.stdTier] || "BRONZE";
    o.set = SETNAME[o.stdTier] || SETNAME.bronze;
    return o;
  }

  var STD = [
%s
  ];

  /* -------- merge into the shared database (same array reference) -------- */
  STD.forEach(function (c) {
    if (DB.byId[c.id]) { return; }
    DB.all.push(c);
    DB.byId[c.id] = c;
  });
  DB.count = DB.all.length;

  /* refresh the position index now that the standard set joined the pool */
  DB.positions = (function () {
    var s = [];
    DB.all.forEach(function (c) {
      if (s.indexOf(c.pos) === -1) { s.push(c.pos); }
    });
    return s;
  })();

  /* set-aware helpers used by the collection / pack screens */
  DB.std = STD;
  DB.stdGold = STD.filter(function (c) { return c.stdTier === "gold"; });
  DB.stdSilver = STD.filter(function (c) { return c.stdTier === "silver"; });
  DB.stdBronze = STD.filter(function (c) { return c.stdTier === "bronze"; });

  window.MVM_STD = STD;
})();
""" % (total, min(p["ovr"] for p in players), max(p["ovr"] for p in players), body)

    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print("wrote", OUT, total, "cards")


if __name__ == "__main__":
    main()
