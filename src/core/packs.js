/* ============================================================================
 * MVMPACK 26 — PACK ENGINE (rarity tables, luck, multipliers, pity)
 * ----------------------------------------------------------------------------
 * THE PROBABILITY MODEL
 *
 * Cards live in two families.
 *
 * LEGEND cards, four OVR tiers:
 *   99  Icons (21)                        — the jackpot
 *   98  World Cup Heroes + Prime Meme (26)
 *   97  Champions League Legends (28)
 *   96  Meme Icons · tier B (8)
 *
 * STANDARD cards (220), three tiers of the MVM 26 base set:
 *   80–88  gold      · the base-set stars
 *   72–79  silver    · solid squad players
 *   60–69  bronze    · the everyday filler
 * Standard packs are cheap, roll only inside their own OVR window and never
 * touch the legend pity counters — they are the grind, not the jackpot.
 *
 * Every pack owns a WEIGHT TABLE over those tiers plus a `floor` (the lowest
 * OVR it can ever produce). Printed odds are the nominal, luck-free numbers:
 *
 *   STARTER   1 card   96:96.0%   97:3.5%    98:0.498%  99:0.002%
 *   PREMIUM   3 cards  96:88.0%   97:10.5%   98:1.49%   99:0.01%
 *   MEME GIGA 5 cards  96:70.0%   97:24.0%   98:5.9%    99:0.1%
 *   97+ PACK  3 cards  —          97:89.0%   98:9.0%    99:2.0%
 *   98+ PACK  2 cards  —          —          98:88.0%   99:12.0%
 *   99 PACK   1 card   —          —          —          99:100%   (guaranteed)
 *
 * LUCK (0..100, see economy.js) multiplies the high tiers before the table is
 * renormalised: 99 up to ×2.5, 98 up to ×1.8, 97 up to ×1.35 at luck 100.
 * MULTIPLIERS (×1 ×5 ×10) open the pack several times for a bulk discount and
 * add a small luck kicker, so bulk opening is genuinely better value.
 * PITY protects long dry runs: a forced 98+ after 60 cards without one and a
 * forced 99 after 900 cards without one.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  var EC = window.MVM_ECON;
  if (!DB || !EC) { return; }

  /* --------------------------------------------------------- definitions -- */
  var PACKS = [
    {
      id: "starter",
      name: "MEME STARTER",
      sub: "1 card · 96+ guaranteed",
      cards: 1,
      floor: 96,
      cost: { coins: 250000 },
      table: { 96: 96.0, 97: 3.5, 98: 0.498, 99: 0.002 },
      tone: "green"
    },
    {
      id: "premium",
      name: "GOLD PREMIUM",
      sub: "3 cards · better 98 odds",
      cards: 3,
      floor: 96,
      cost: { coins: 1200000 },
      table: { 96: 88.0, 97: 10.5, 98: 1.49, 99: 0.01 },
      tone: "gold"
    },
    {
      id: "giga",
      name: "90+ GIGA SPECIAL",
      sub: "5 cards · meme-loaded",
      cards: 5,
      floor: 96,
      cost: { coins: 9000000, gems: 400 },
      table: { 96: 70.0, 97: 24.0, 98: 5.9, 99: 0.1 },
      memeBoost: true,
      tone: "purple"
    },
    {
      id: "p97",
      name: "97+ PACK",
      sub: "3 cards · nothing below 97",
      cards: 3,
      floor: 97,
      cost: { coins: 24000000, gems: 1200 },
      table: { 97: 89.0, 98: 9.0, 99: 2.0 },
      tone: "cyan"
    },
    {
      id: "p98",
      name: "98+ PACK",
      sub: "2 cards · heroes & prime memes",
      cards: 2,
      floor: 98,
      cost: { coins: 90000000, gems: 4500 },
      table: { 98: 88.0, 99: 12.0 },
      tone: "red"
    },
    {
      id: "p99",
      name: "99 ICON PACK",
      sub: "1 card · 100% guaranteed icon",
      cards: 1,
      floor: 99,
      cost: { coins: 380000000, gems: 18000 },
      table: { 99: 100 },
      guaranteed: 99,
      tone: "icon"
    },

    /* ---- standard set packs (60–88 OVR, no legends inside) -------------- */
    {
      id: "std_bronze",
      name: "BRONZE STANDARD",
      sub: "3 cards · 60–69 base set",
      cards: 3,
      floor: 60,
      cost: { coins: 12000 },
      table: { 60: 1.0, 61: 1.5, 62: 2.0, 63: 2.5, 64: 4.0, 65: 5.0,
               66: 9.0, 67: 15.0, 68: 25.0, 69: 35.0 },
      std: true,
      tone: "bronze"
    },
    {
      id: "std_silver",
      name: "SILVER STANDARD",
      sub: "3 cards · 72–79 base set",
      cards: 3,
      floor: 72,
      cost: { coins: 90000 },
      table: { 72: 4.0, 73: 5.0, 74: 12.0, 75: 13.0, 76: 20.0, 77: 20.0,
               78: 15.0, 79: 11.0 },
      std: true,
      tone: "silver"
    },
    {
      id: "std_gold",
      name: "GOLD STANDARD",
      sub: "2 cards · 80–88 base set",
      cards: 2,
      floor: 80,
      cost: { coins: 420000 },
      table: { 80: 40.0, 81: 17.0, 82: 15.0, 83: 8.0, 84: 11.0, 85: 4.0,
               86: 2.5, 87: 1.5, 88: 1.0 },
      std: true,
      tone: "stdgold"
    }
  ];

  var byId = {};
  PACKS.forEach(function (p) { byId[p.id] = p; });

  /* ------------------------------------------------------------ pools ----- */
  function poolFor(ovr) {
    return DB.all.filter(function (c) { return (c.ovr || 99) === ovr; });
  }

  /* every OVR the app can roll: the 220-card standard set plus the legends */
  var POOL = {};
  (function () {
    for (var o = 60; o <= 99; o++) {
      var pool = poolFor(o);
      if (pool.length) { POOL[o] = pool; }
    }
  })();

  /* ------------------------------------------------------- multipliers ---- */
  var MULTI = [
    { x: 1,  price: 1.00, luck: 0,  label: "×1" },
    { x: 5,  price: 4.50, luck: 4,  label: "×5 · -10%" },
    { x: 10, price: 8.00, luck: 8,  label: "×10 · -20%" }
  ];

  function multi(x) {
    for (var i = 0; i < MULTI.length; i++) {
      if (MULTI[i].x === x) { return MULTI[i]; }
    }
    return MULTI[0];
  }

  function priceOf(pack, x) {
    var m = multi(x);
    return {
      coins: Math.round((pack.cost.coins || 0) * m.price),
      gems: Math.round((pack.cost.gems || 0) * m.price)
    };
  }

  /* ------------------------------------------------------- luck shaping --
   * Returns the effective weight table for a pack at a given luck value.
   */
  var LUCK_GAIN = { 99: 1.5, 98: 0.8, 97: 0.35, 96: 0 };

  /* standard tiers get a gentler curve: the top OVR of a window gains most */
  (function () {
    var windows = [
      { lo: 60, hi: 69, top: 0.60 },
      { lo: 72, hi: 79, top: 0.55 },
      { lo: 80, hi: 88, top: 0.90 }
    ];
    windows.forEach(function (w) {
      for (var o = w.lo; o <= w.hi; o++) {
        var t = (o - w.lo) / (w.hi - w.lo);
        /* only the upper half of a window benefits from luck */
        LUCK_GAIN[o] = t < 0.5 ? 0 : w.top * ((t - 0.5) / 0.5);
      }
    });
  })();
  var PITY_98 = 60;    // cards without a 98+ before one is forced
  var PITY_99 = 900;   // cards without a 99 before one is forced

  function shaped(pack, luck) {
    var l = Math.max(0, Math.min(100, luck)) / 100;
    var out = {}, tiers = Object.keys(pack.table), i, t, w, sum = 0;

    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      w = pack.table[t] * (1 + l * (LUCK_GAIN[t] || 0));
      out[t] = w;
      sum += w;
    }
    /* the floor tier soaks up what the boosted tiers took: table stays at 100 */
    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      out[t] = out[t] / sum * 100;
    }
    return out;
  }

  /* printed (nominal) odds, and live odds with the player's current luck */
  function odds(packId, useLuck) {
    var pack = byId[packId];
    if (!pack) { return null; }
    return useLuck === false ? pack.table : shaped(pack, EC.luck());
  }

  /* ------------------------------------------------------------- rolling -- */
  function pickTier(pack, luck) {
    var tbl = shaped(pack, luck);
    var r = Math.random() * 100;
    /* walk from the top tier down so the rare ones are checked first */
    var tiers = Object.keys(tbl).sort(function (a, b) { return b - a; });
    for (var i = 0; i < tiers.length; i++) {
      r -= tbl[tiers[i]];
      if (r <= 0) { return Number(tiers[i]); }
    }
    return Number(tiers[tiers.length - 1]);
  }

  /* one card out of a tier, weighted by the card's own `pull` rate */
  function pickCard(ovr, pack) {
    var pool = POOL[ovr] || POOL[96];
    if (!pool.length) { return DB.all[0]; }
    var total = 0, i, w = [];
    for (i = 0; i < pool.length; i++) {
      var p = pool[i].pull || 1;
      /* the Giga pack is meme-flavoured: meme cards pull twice as often */
      if (pack && pack.memeBoost && pool[i].type === "meme") { p *= 2; }
      w.push(p);
      total += p;
    }
    var r = Math.random() * total;
    for (i = 0; i < pool.length; i++) {
      r -= w[i];
      if (r <= 0) { return pool[i]; }
    }
    return pool[pool.length - 1];
  }

  /* roll a single card, honouring guarantees and pity counters */
  function rollOne(pack, luck, st) {
    var ovr;

    if (pack.guaranteed) {
      ovr = pack.guaranteed;
    } else if (pack.std) {
      /* standard packs stay inside their own OVR window — no legend pity */
      ovr = pickTier(pack, luck);
    } else if (st && st.pity99 >= PITY_99) {
      ovr = 99;
    } else if (st && st.pity98 >= PITY_98 && pack.table[98] !== undefined) {
      ovr = Math.random() < 0.06 ? 99 : 98;
    } else {
      ovr = pickTier(pack, luck);
    }
    if (ovr < pack.floor) { ovr = pack.floor; }
    if (!POOL[ovr] || !POOL[ovr].length) { ovr = pack.floor; }
    return pickCard(ovr, pack);
  }

  /* --------------------------------------------------------- open a pack --
   * Charges the wallet, rolls `cards × multiplier` cards, files them in the
   * collection, updates luck / pity / xp and returns everything the UI needs.
   */
  function open(packId, x) {
    /* accept an id or an already-resolved pack object */
    var pack = (packId && typeof packId === "object") ? byId[packId.id] : byId[packId];
    if (!pack) { return { ok: false, reason: "unknown pack" }; }

    x = multi(x || 1).x;
    var cost = priceOf(pack, x);
    if (!EC.canPay(cost)) { return { ok: false, reason: "funds", cost: cost }; }
    EC.pay(cost);

    var st = EC.state;
    var luck = EC.luck() + multi(x).luck;
    var n = pack.cards * x;
    var pulls = [], best = 0, i;

    for (i = 0; i < n; i++) {
      var c = rollOne(pack, luck, st);
      var ovr = c.ovr || 99;
      var reg = EC.add(c);

      /* pity bookkeeping: standard pulls must not feed the legend counters */
      if (!pack.std) {
        st.pity99 = ovr >= 99 ? 0 : st.pity99 + 1;
        st.pity98 = ovr >= 98 ? 0 : st.pity98 + 1;
      }

      if (ovr > best) { best = ovr; }
      pulls.push({ card: c, isNew: reg.isNew, copies: reg.count,
                   sell: EC.sellValue(c) });
    }

    /* dry streak: mercy luck grows while no 98+ shows up (legend packs only) */
    if (!pack.std) { st.dry = best >= 98 ? 0 : st.dry + x; }
    if (st.charm > 0) { st.charm = Math.max(0, st.charm - x); }

    st.opened += x;
    st.xp += (pack.std ? 12 : 40) * x
      + (best >= 99 ? 600 : best >= 98 ? 150 : 0);
    while (st.xp >= 15000) { st.xp -= 15000; st.level += 1; }

    /* every pack refunds a little: gems on a 98+, coins on the filler cards */
    var bonus = { coins: 0, gems: 0 };
    for (i = 0; i < pulls.length; i++) {
      var o = pulls[i].card.ovr || 99;
      if (o >= 99) { bonus.gems += 250; }
      else if (o >= 98) { bonus.gems += 50; }
      else if (o >= 96) { bonus.coins += 12000; }
      else if (o >= 80) { bonus.coins += 4000; }
      else if (o >= 72) { bonus.coins += 1200; }
      else { bonus.coins += 300; }
    }
    EC.earn(bonus);

    return {
      ok: true,
      pack: pack,
      x: x,
      cost: cost,
      bonus: bonus,
      best: best,
      luck: Math.min(100, luck),
      pulls: pulls
    };
  }

  /* -------------------------------------------------------- luck charm ---- */
  var CHARM = { cost: { gems: 1500 }, packs: 10 };

  function buyCharm() {
    if (!EC.canPay(CHARM.cost)) { return false; }
    EC.pay(CHARM.cost);
    EC.state.charm += CHARM.packs;
    EC.commit();
    return true;
  }

  /* ------------------------------------------------------------- income --
   * Coins have to come from somewhere, otherwise the store is decoration.
   */
  var INCOME = {
    play:        { coins: 850000,  gems: 0,   label: "QUICK MATCH WON" },
    ai:          { coins: 1400000, gems: 20,  label: "AI MATCH · LEGENDARY" },
    draft:       { coins: 2600000, gems: 60,  label: "DRAFT RUN FINISHED" },
    missions:    { coins: 1800000, gems: 80,  label: "DAILY MISSIONS CLAIMED" },
    rewards:     { coins: 3200000, gems: 150, label: "REWARDS CLAIMED" },
    tournaments: { coins: 5500000, gems: 250, label: "TOURNAMENT PAYOUT" }
  };

  function claim(key) {
    var src = INCOME[key];
    if (!src) { return null; }
    EC.earn({ coins: src.coins, gems: src.gems });
    return src;
  }

  window.MVM_PACKS = {
    all: PACKS,
    byId: byId,
    get: function (id) { return byId[id] || null; },
    pools: POOL,
    multipliers: MULTI,
    price: priceOf,
    odds: odds,
    open: open,
    charm: CHARM,
    buyCharm: buyCharm,
    income: INCOME,
    claim: claim,
    pity: { p98: PITY_98, p99: PITY_99 },
    /* exposed for the automated probability test */
    _rollOne: rollOne,
    _shaped: shaped
  };
})();
