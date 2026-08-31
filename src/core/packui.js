/* ============================================================================
 * MVMPACK 26 — PACK STORE & OPENING UI
 * Renders the store shelves, the odds tables, the multi-card reveal and the
 * receipt. Registers itself into MVM_UI.screens so app.js routing picks it up.
 * ==========================================================================*/
(function () {
  "use strict";

  var UI = window.MVM_UI;
  var EC = window.MVM_ECON;
  var PK = window.MVM_PACKS;
  var DB = window.MVM_CARDS;
  if (!UI || !EC || !PK || !DB) { return; }

  var esc = UI.esc;

  /* multiplier the player last selected in the store */
  var picked = 1;

  function money(cost) {
    var out = [];
    if (cost.coins) { out.push(EC.short(cost.coins) + " ◉"); }
    if (cost.gems) { out.push(EC.fmt(cost.gems) + " ◆"); }
    return out.join(" + ") || "FREE";
  }

  /* 0.002 -> "0.002%", 96 -> "96%" — keep the tiny numbers readable */
  function pct(v) {
    if (v >= 10) { return v.toFixed(1).replace(/\.0$/, "") + "%"; }
    if (v >= 1) { return v.toFixed(2).replace(/\.?0+$/, "") + "%"; }
    if (v >= 0.01) { return v.toFixed(3).replace(/0+$/, "") + "%"; }
    return v.toFixed(4).replace(/0+$/, "") + "%";
  }

  /* --------------------------------------------------------------- wallet -- */
  function wallet() {
    var l = EC.luck();
    var st = EC.state;
    return '<div class="wallet">' +
      '<div class="wallet__box"><span class="wallet__k">Coins</span>' +
        '<span class="wallet__v">' + esc(EC.fmt(st.coins)) + "</span></div>" +
      '<div class="wallet__box wallet__box--gems"><span class="wallet__k">Gems</span>' +
        '<span class="wallet__v">' + esc(EC.fmt(st.gems)) + "</span></div>" +
      '<div class="wallet__box wallet__box--luck"><span class="wallet__k">Luck</span>' +
        '<span class="wallet__v">' + esc(l) + "</span>" +
        '<i class="luckbar"><i style="width:' + l + '%"></i></i></div>' +
      "</div>";
  }

  function multiRow() {
    return '<div class="multirow">' + PK.multipliers.map(function (m) {
      return '<button type="button" class="multi' +
        (m.x === picked ? " is-on" : "") + '" data-multi="' + m.x + '">' +
        esc(m.label) + "</button>";
    }).join("") + "</div>";
  }

  /* every OVR a pack can print, highest first — read straight off its table */
  function tiersOf(tbl) {
    return Object.keys(tbl).map(Number).sort(function (a, b) { return b - a; });
  }

  /* colour bucket for an OVR chip: legends keep their own tints, the base set
   * is coloured by its gold / silver / bronze window */
  function oddsClass(t) {
    if (t >= 96) { return "odds--" + t; }
    if (t >= 80) { return "odds--stdgold"; }
    if (t >= 70) { return "odds--stdsilver"; }
    return "odds--stdbronze";
  }

  function oddsChip(t, tbl, live) {
    var boost = live[t] > tbl[t] * 1.02 ? " → " + pct(live[t]) : "";
    return '<span class="odds ' + oddsClass(t) + '">' + esc(String(t)) + " · " +
      esc(pct(tbl[t]) + boost) + "</span>";
  }

  /* A standard pack spreads over up to ten OVRs, which is far too many chips
   * for a phone shelf. Print the three best ones and fold the remainder into a
   * single range chip carrying their combined odds. */
  function oddsStrip(tbl, live) {
    var tiers = tiersOf(tbl);
    var shown = tiers.length > 4 ? tiers.slice(0, 3) : tiers;
    var rest = tiers.slice(shown.length);
    var chips = shown.map(function (t) { return oddsChip(t, tbl, live); });

    if (rest.length) {
      var sum = 0, i;
      for (i = 0; i < rest.length; i++) { sum += tbl[rest[i]]; }
      chips.push('<span class="odds ' + oddsClass(rest[0]) + ' odds--rest">' +
        esc(rest[rest.length - 1] + "–" + rest[0]) + " · " + esc(pct(sum)) +
        "</span>");
    }
    return chips.join("");
  }

  /* --------------------------------------------------------- a pack shelf -- */
  function packCard(p) {
    var cost = PK.price(p, picked);
    var tbl = PK.odds(p.id, false);
    var live = PK.odds(p.id, true);
    var locked = !EC.canPay(cost);
    var chips = oddsStrip(tbl, live);

    return '<li><button type="button" class="packcard packcard--' + esc(p.tone) +
      (p.std ? " packcard--std" : "") +
      (locked ? " is-locked" : "") + '" data-pack="' + esc(p.id) + '">' +
      '<span class="packcard__head">' +
        '<span class="packcard__name">' + esc(p.name) + "</span>" +
        '<span class="packcard__cost">' + esc(money(cost)) + "</span>" +
      "</span>" +
      '<span class="packcard__sub">' + esc(p.sub) +
        (picked > 1 ? " · " + (p.cards * picked) + " cards total" : "") +
      "</span>" +
      '<span class="oddsrow">' + chips + "</span>" +
      "</button></li>";
  }

  function store() {
    var st = EC.state;
    var charmTxt = st.charm > 0
      ? "LUCK CHARM ACTIVE · " + st.charm + " PACKS LEFT"
      : "BUY LUCK CHARM · " + EC.fmt(PK.charm.cost.gems) + " ◆";

    var legends = PK.all.filter(function (p) { return !p.std; });
    var base = PK.all.filter(function (p) { return p.std; });

    function shelf(label, note, list) {
      if (!list.length) { return ""; }
      return '<h3 class="shelfttl">' + esc(label) + "</h3>" +
        '<p class="hint hint--tight">' + esc(note) + "</p>" +
        '<ul class="packlist">' + list.map(packCard).join("") + "</ul>";
    }

    return {
      title: "PACK STORE",
      html: wallet() + multiRow() +
        shelf("Legend packs · 96–99",
              "Icons, World Cup heroes, Champions League legends and memes.",
              legends) +
        shelf("Standard packs · 60–88",
              "The 220-card MVM 26 base set — cheap, fast, no legends inside.",
              base) +
        '<div class="actbar">' +
          '<button type="button" class="btn btn--ghost" data-charm="1">' +
            esc(charmTxt) + "</button>" +
          '<button type="button" class="btn btn--ghost" data-screen="earn">' +
            "EARN COINS</button>" +
          '<button type="button" class="btn btn--ghost" data-screen="collection">' +
            "MY PULLS · " + esc(EC.total()) + "</button>" +
        "</div>" +
        '<p class="hint">Printed odds are luck-free. The arrow shows your live ' +
        "odds at luck " + esc(EC.luck()) + ". Dry runs raise your luck, a 98+ " +
        "resets it. Pity: guaranteed 98+ after " + PK.pity.p98 +
        " cards, guaranteed 99 after " + PK.pity.p99 + " cards — you are at " +
        esc(st.pity98) + " / " + esc(st.pity99) + ". Standard packs roll inside " +
        "their own OVR window and never touch those counters.</p>"
    };
  }

  /* --------------------------------------------------------- open results -- */
  function pullCell(p, i) {
    var c = p.card;
    var ovr = c.ovr || 99;
    return '<li class="pullcell pullcell--' + ovr + '" style="--i:' + i + '">' +
      UI.card(c, { reveal: true }) +
      '<span class="pullcell__meta">' +
        (p.isNew ? '<span class="pullcell__new">NEW</span>'
                 : '<span class="pullcell__dupe">×' + esc(p.copies) + "</span>") +
        "<span>" + esc(EC.short(p.sell)) + " ◉</span>" +
      "</span>" +
      "</li>";
  }

  function receipt(res) {
    return '<div class="receipt">' +
      '<div class="is-minus"><span>Pack cost</span><b>-' +
        esc(money(res.cost)) + "</b></div>" +
      '<div class="is-plus"><span>Pack bonus</span><b>+' +
        esc(money(res.bonus)) + "</b></div>" +
      "<div><span>Cards pulled</span><b>" + esc(res.pulls.length) + "</b></div>" +
      "<div><span>Luck used</span><b>" + esc(Math.round(res.luck)) + "</b></div>" +
      "<div><span>Coins left</span><b>" + esc(EC.fmt(EC.coins())) + "</b></div>" +
      "</div>";
  }

  function result(res) {
    var n = res.pulls.length;
    var mod = n === 1 ? " pullgrid--wide" : n > 6 ? " pullgrid--dense" : "";
    var dupes = res.pulls.filter(function (p) { return !p.isNew; });
    var dupeCoins = dupes.reduce(function (a, p) { return a + p.sell; }, 0);

    return {
      title: res.pack.name + " · ×" + res.x,
      html: '<div class="openhead">' +
          '<span class="openhead__ttl">' + esc(res.pack.name) + "</span>" +
          '<span class="openhead__best">BEST ' + esc(res.best) + " OVR</span>" +
        "</div>" +
        '<ul class="pullgrid' + mod + '">' +
          res.pulls.map(pullCell).join("") +
        "</ul>" +
        receipt(res) +
        '<div class="actbar">' +
          '<button type="button" class="btn" data-pack="' + esc(res.pack.id) +
            '">OPEN AGAIN · ' + esc(money(PK.price(res.pack, res.x))) + "</button>" +
          (dupes.length
            ? '<button type="button" class="btn btn--ghost" data-quicksell="1">' +
              "QUICK SELL " + dupes.length + " DUPES · +" +
              esc(EC.short(dupeCoins)) + " ◉</button>"
            : "") +
          '<button type="button" class="btn btn--ghost" data-screen="store">' +
            "BACK TO STORE</button>" +
        "</div>" +
        '<p class="hint">Tap a card to open its full stat sheet, double tap to ' +
        "flip it. Duplicates can be quick-sold for coins.</p>"
    };
  }

  /* -------------------------------------------------------------- earning -- */
  function earn() {
    var rows = Object.keys(PK.income).map(function (k) {
      var s = PK.income[k];
      return '<li><button type="button" class="mktrow" data-claim="' + esc(k) + '">' +
        '<span class="mktrow__price">◉</span>' +
        "<span>" +
          '<span class="mktrow__name">' + esc(s.label) + "</span><br />" +
          '<span class="mktrow__sub">' + esc(EC.fmt(s.coins)) + " coins" +
            (s.gems ? " · " + esc(s.gems) + " gems" : "") + "</span>" +
        "</span>" +
        '<span class="mktrow__price">CLAIM</span>' +
      "</button></li>";
    }).join("");

    return {
      title: "EARN COINS",
      html: wallet() + "<h3>Where the money comes from</h3>" +
        '<ul class="mktlist">' + rows + "</ul>" +
        '<div class="actbar">' +
          '<button type="button" class="btn" data-screen="store">TO THE PACK STORE</button>' +
        "</div>" +
        '<p class="hint">Every mode pays out coins and gems — that is your pack ' +
        "budget. Quick-selling duplicates is the fastest top-up.</p>"
    };
  }

  /* ------------------------------------------------------- my collection -- */
  function collection() {
    var st = EC.state;
    var ids = Object.keys(st.col);
    var list = ids.map(function (id) { return DB.get(id); })
      .filter(Boolean)
      .sort(function (a, b) { return (b.ovr || 99) - (a.ovr || 99); });

    var rows = list.map(function (c) {
      var n = EC.owned(c.id);
      return '<li><button type="button" class="mktrow" data-open="' + esc(c.id) + '">' +
        '<img src="' + esc(c.art) + '" alt="" loading="lazy" />' +
        "<span>" +
          '<span class="mktrow__name">' + esc(c.flag + " " + c.name) + "</span><br />" +
          '<span class="mktrow__sub">' + esc(c.ovr || 99) + " " + esc(c.pos) +
            " · ×" + esc(n) + " · sell " + esc(EC.short(EC.sellValue(c))) +
            "</span>" +
        "</span>" +
        '<span class="mktrow__price">×' + esc(n) + "</span>" +
      "</button></li>";
    }).join("");

    return {
      title: "MY PULLS · " + EC.total(),
      html: wallet() +
        "<h3>" + EC.unique() + " unique · " + EC.total() + " cards owned</h3>" +
        (rows ? '<ul class="mktlist">' + rows + "</ul>"
              : '<p class="hint">Nothing pulled yet — open a pack first.</p>') +
        '<div class="actbar">' +
          '<button type="button" class="btn" data-screen="store">OPEN MORE PACKS</button>' +
        "</div>"
    };
  }

  /* ------------------------------------------------------------- exports -- */
  UI.packs = {
    store: store,
    result: result,
    earn: earn,
    collection: collection,
    wallet: wallet,
    money: money,
    pct: pct,
    setMulti: function (x) { picked = x; },
    getMulti: function () { return picked; }
  };

  /* the store replaces the old static pack placeholders */
  UI.screens.store = store;
  UI.screens.pack = store;
  UI.screens["open-pack"] = store;
  UI.screens.earn = earn;
  UI.screens.pulls = collection;
  UI.screens.collection = collection;

  /* every coin source in the game funnels into the same earn sheet */
  UI.screens.missions = earn;
  UI.screens.rewards = earn;
  UI.screens.tournaments = earn;
  UI.screens.play = earn;
  UI.screens.ai = earn;
  UI.screens.coins = earn;
  UI.screens.gems = earn;
})();
