/* ============================================================================
 * MVMPACK 26 — ECONOMY CORE
 * ----------------------------------------------------------------------------
 * Single source of truth for the player wallet (coins + gems), the collection
 * (owned card counts), the luck stat and the pity counters. Everything is
 * persisted to localStorage so a refresh never eats the player's progress.
 *
 * Public API (window.MVM_ECON):
 *   state                 raw snapshot (do not mutate directly)
 *   coins() / gems()      current balance as numbers
 *   fmt(n)                46030068 -> "46,030,068"
 *   short(n)              46030068 -> "46.03M"
 *   canPay(cost)          cost = { coins:n, gems:n }
 *   pay(cost)             spends, returns true on success
 *   earn(gain)            adds coins / gems
 *   add(card)             registers a pulled card, returns { isNew, count }
 *   sell(id, n)           quick-sells n copies, returns coins earned
 *   sellValue(card)       quick-sell price of one copy
 *   owned(id) / total()   collection helpers
 *   luck()                effective luck 0..100 (level + streak + charm)
 *   onChange(fn)          subscribe to any wallet / collection change
 * ==========================================================================*/
(function () {
  "use strict";

  var KEY = "mvm26.economy.v4";

  /* ---------------------------------------------------------- start pot --
   * Clean starting state: 0 coins, 0 gems.
   */
  var START = {
    coins: 0,
    gems: 0,
    level: 1,
    xp: 0,
    /* collection: { cardId: copies } */
    col: {},
    /* luck engine */
    charm: 0,        // packs left with the LUCK CHARM buff active
    dry: 0,          // packs opened in a row without a 98+ card
    /* pity engine */
    pity99: 0,       // cards pulled in a row without a 99 OVR
    pity98: 0,       // cards pulled in a row without a 98+ OVR
    /* lifetime stats */
    opened: 0,       // packs opened
    pulled: 0,       // cards pulled
    spent: 0,        // coins spent
    got99: 0,
    got98: 0
  };

  /* ------------------------------------------------------------- storage -- */
  function load() {
    var s = {}, k;
    for (k in START) { if (START.hasOwnProperty(k)) { s[k] = START[k]; } }
    s.col = {};
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        for (k in START) {
          if (START.hasOwnProperty(k) && typeof saved[k] === typeof START[k]) {
            s[k] = saved[k];
          }
        }
        if (saved.col && typeof saved.col === "object") { s.col = saved.col; }
      }
    } catch (e) { /* private mode / quota: run in memory only */ }
    return s;
  }

  var state = load();
  var subs = [];

  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { /* ignore */ }
  }

  function fire() {
    save();
    for (var i = 0; i < subs.length; i++) {
      try { subs[i](state); } catch (e) { /* a broken listener must not stop the game */ }
    }
  }

  /* ------------------------------------------------------------ numbers -- */
  function fmt(n) {
    n = Math.max(0, Math.round(Number(n) || 0));
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function short(n) {
    n = Math.max(0, Math.round(Number(n) || 0));
    if (n >= 1e9) { return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B"; }
    if (n >= 1e6) { return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M"; }
    if (n >= 1e4) { return (n / 1e3).toFixed(1).replace(/\.?0+$/, "") + "K"; }
    return fmt(n);
  }

  /* ------------------------------------------------------------- wallet -- */
  function canPay(cost) {
    cost = cost || {};
    return state.coins >= (cost.coins || 0) && state.gems >= (cost.gems || 0);
  }

  function pay(cost) {
    if (!canPay(cost)) { return false; }
    cost = cost || {};
    state.coins -= (cost.coins || 0);
    state.gems -= (cost.gems || 0);
    state.spent += (cost.coins || 0);
    fire();
    return true;
  }

  function earn(gain) {
    gain = gain || {};
    state.coins += (gain.coins || 0);
    state.gems += (gain.gems || 0);
    fire();
    return gain;
  }

  /* --------------------------------------------------------- collection --
   * Quick-sell price scales hard with OVR — that is what makes a 99 pull feel
   * like a jackpot even when it is a duplicate.
   */
  var SELL = {
    /* special sets */
    99: 4000000, 98: 400000, 97: 90000, 96: 25000,
    /* standard set — gold 80-88 */
    88: 14000, 87: 11500, 86: 9200, 85: 7600, 84: 6300, 83: 5300, 82: 4500,
    81: 3800, 80: 3200,
    /* standard set — silver 72-79 */
    79: 2600, 78: 2200, 77: 1900, 76: 1600, 75: 1400, 74: 1200, 73: 1050,
    72: 920,
    /* standard set — bronze 60-69 */
    71: 820, 70: 730, 69: 650, 68: 580, 67: 520, 66: 470, 65: 420, 64: 380,
    63: 340, 62: 300, 61: 270, 60: 240
  };

  function sellValue(card) {
    if (!card) { return 0; }
    var base = SELL[card.ovr || 99] || 1500;
    /* standard cards are common by design — no premium, no penalty */
    if (card.type === "std") { return base; }
    /* Prime Meme (tier A) and icons carry a small collector premium */
    if (card.type === "icon") { base = Math.round(base * 1.15); }
    if (card.type === "meme" && card.tier === "A") { base = Math.round(base * 1.2); }
    return base;
  }

  function owned(id) { return state.col[id] || 0; }

  function total() {
    var n = 0, k;
    for (k in state.col) {
      if (state.col.hasOwnProperty(k)) { n += state.col[k]; }
    }
    return n;
  }

  function unique() { return Object.keys(state.col).length; }

  function add(card) {
    var had = owned(card.id);
    state.col[card.id] = had + 1;
    state.pulled += 1;
    if ((card.ovr || 99) >= 99) { state.got99 += 1; }
    else if ((card.ovr || 99) >= 98) { state.got98 += 1; }
    return { isNew: had === 0, count: had + 1 };
  }

  function sell(id, n) {
    var DB = window.MVM_CARDS;
    var card = DB && DB.get ? DB.get(id) : null;
    var have = owned(id);
    n = Math.max(1, Math.min(have, n || 1));
    if (!card || have < 1) { return 0; }
    var money = sellValue(card) * n;
    state.col[id] = have - n;
    if (state.col[id] <= 0) { delete state.col[id]; }
    state.coins += money;
    fire();
    return money;
  }

  /* ----------------------------------------------------------- luck 0-100 --
   * level         : long-term progression, up to +42
   * dry streak    : mercy bonus, +1 per packs opened without a 98+, cap +25
   * luck charm    : paid buff, flat +20 while it lasts
   */
  function luck() {
    var fromLevel = Math.min(42, Math.floor(state.level * 0.7));
    var fromDry = Math.min(25, state.dry);
    var fromCharm = state.charm > 0 ? 20 : 0;
    return Math.max(0, Math.min(100, 8 + fromLevel + fromDry + fromCharm));
  }

  window.MVM_ECON = {
    state: state,
    KEY: KEY,
    coins: function () { return state.coins; },
    gems: function () { return state.gems; },
    level: function () { return state.level; },
    fmt: fmt,
    short: short,
    canPay: canPay,
    pay: pay,
    earn: earn,
    add: add,
    sell: sell,
    sellValue: sellValue,
    owned: owned,
    total: total,
    unique: unique,
    luck: luck,
    commit: fire,
    reset: function () {
      try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      var fresh = load(), k;
      for (k in fresh) {
        if (fresh.hasOwnProperty(k)) { state[k] = fresh[k]; }
      }
      fire();
    },
    onChange: function (fn) {
      if (typeof fn === "function") { subs.push(fn); fn(state); }
    }
  };
})();
