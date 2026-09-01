/* ============================================================================
 * MVMPACK 26 — CARD RENDERER
 * Turns MVM_CARDS entries into real DOM: flippable front/back cards, full
 * stat sheets, squad pitch, market rows and the pack-opening reveal.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  if (!DB) { return; }

  /* every value that reaches innerHTML goes through this first */
  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var PATTERNS = {
    rays: 1, stripes: 1, grid: 1, chevron: 1, waves: 1, diagonal: 1,
    halo: 1, burst: 1, speed: 1, silk: 1, shield: 1, crown: 1, web: 1
  };

  function patClass(name) {
    return PATTERNS[name] ? "pat-" + name : "pat-grid";
  }

  /* every World Cup hero owns one signature front animation (wcfx.css) */
  var ANIMS = {
    siuu: 1, cosmic: 1, handofgod: 1, phenom: 1, turbo: 1, roulette: 1,
    nextgen: 1, heyjude: 1, samba: 1, salto: 1, orbit: 1, ironwall: 1,
    saniker: 1, leftcut: 1, iceman: 1, glide: 1, batigol: 1, skyflare: 1
  };

  /* and every Champions League legend owns his own one too (clfx.css) */
  var CL_ANIMS = {
    decima: 1, magia: 1, nueve: 1, chupete: 1, joga: 1, velocita: 1,
    sheva: 1, metronom: 1, illusion: 1, istanbul: 1, munich: 1, trigger: 1,
    glasgow: 1, quattro: 1, maestro: 1, curva: 1, ginga: 1, vavavoom: 1,
    lion: 1, wolf: 1, zlatan: 1, bandiera: 1, eleganza: 1, tiburon: 1,
    noventa: 1, captain: 1, guardian: 1, superman: 1
  };

  /* and every Meme Icon owns his own one too (memefx.css) */
  var MEME_ANIMS = {
    rizz: 1, sigma: 1, gigachad: 1, aura: 1, delulu: 1, goated: 1,
    sheesh: 1, npc: 1, bussin: 1, skibidi: 1, gyatt: 1, cooked: 1,
    mogged: 1, siuupink: 1, cap: 1, mid: 1
  };

  function animClass(c) {
    if (!c.anim) { return ""; }
    if (c.type === "cl") {
      return CL_ANIMS[c.anim] ? " clfx clfx--" + c.anim : "";
    }
    if (c.type === "meme") {
      return MEME_ANIMS[c.anim] ? " memefx memefx--" + c.anim : "";
    }
    return ANIMS[c.anim] ? " wcfx wcfx--" + c.anim : "";
  }

  /* ---------------------------------------------------------------- card --
   * opts: { flipped:true starts on the back, tag:false hides the chip,
   *         reveal:true plays the pack-opening animation }
   */
  function cardMarkup(c, opts) {
    opts = opts || {};
    var b = c.back;
    var ovr = c.ovr || 99;
    var cls = "mvm-card" +
      (c.type === "wc" ? " mvm-card--wc" : "") +
      (c.type === "cl" ? " mvm-card--cl" : "") +
      (c.type === "meme" ? " mvm-card--meme" : "") +
      (c.type === "meme" && c.tier ? " is-tier-" + c.tier.toLowerCase() : "") +
      animClass(c) +
      (opts.flipped ? " is-flipped" : "") +
      (opts.reveal ? " pack-reveal" : "");

    return "" +
      '<button type="button" class="' + cls + '" data-card="' + esc(c.id) + '"' +
      ' style="--c1:' + esc(b.c1) + ';--c2:' + esc(b.c2) + '"' +
      ' aria-label="' + esc(c.name + ", " + ovr + " " + c.pos + ", " + c.nation +
                            ". Tap to open the full stat sheet") + '">' +
        '<span class="mvm-card__glow" aria-hidden="true"></span>' +
        '<span class="mvm-card__inner">' +

          '<span class="mvm-card__face mvm-card__face--front">' +
            '<span class="mvm-card__fx" aria-hidden="true"></span>' +
            '<img class="mvm-card__art" src="' + esc(c.art) + '" alt="" ' +
                 'loading="lazy" decoding="async" />' +
            '<span class="mvm-card__shine" aria-hidden="true"></span>' +
            (opts.tag === false ? "" :
              '<span class="mvm-card__tag">' + esc(ovr) + ' &middot; ' +
              esc(c.pos) + '</span>') +
          '</span>' +

          '<span class="mvm-card__face mvm-card__face--back">' +
            '<span class="mvm-back">' +
              '<span class="mvm-back__pattern ' + patClass(b.pattern) + '" ' +
                    'aria-hidden="true"></span>' +
              '<span class="mvm-back__mono">' +
                (c.type === "wc" ? "WORLD CUP HEROES"
                  : c.type === "cl" ? "CHAMPIONS LEAGUE LEGENDS"
                  : c.type === "meme" ? "MEME ICONS"
                  : "MVMPACK 26") + '</span>' +
              '<span class="mvm-back__crest">' + esc(c.flag) + '</span>' +
              '<span class="mvm-back__theme">' + esc(b.theme) + '</span>' +
              '<span class="mvm-back__motto">&ldquo;' + esc(b.motto) + '&rdquo;</span>' +
              '<span class="mvm-back__sign">' + esc(b.sign) + '</span>' +
              '<span class="mvm-back__serial">' + esc(b.serial) + '</span>' +
            '</span>' +
          '</span>' +

        '</span>' +
      '</button>';
  }

  /* ------------------------------------------------------ standard cards --
   * The 220-card standard set (60-88 OVR) uses a flat, animation-free layout:
   * real portrait, tier frame, OVR / POS / league header and six main stats.
   */
  function stdMarkup(c, opts) {
    opts = opts || {};
    var ovr = c.ovr || 60;
    var tier = c.tier || c.stdTier || "bronze";
    var m = c.main || {};
    var stats = Object.keys(m).map(function (k) {
      return "<div><b>" + esc(m[k]) + "</b><span>" + esc(k) + "</span></div>";
    }).join("");

    return '<button type="button" class="stdc t-' + esc(tier) +
      (opts.big ? " big" : "") + '" data-card="' + esc(c.id) + '"' +
      ' aria-label="' + esc(c.name + ", " + ovr + " " + c.pos + ", " + c.club +
        ". Tap to open the full stat sheet") + '">' +
      '<span class="std-frame" aria-hidden="true"></span>' +
      '<img class="std-photo" src="' + esc(c.photo || c.art) + '" alt="" ' +
           'loading="lazy" decoding="async" />' +
      '<span class="std-top">' +
        '<span class="std-ovr">' + esc(ovr) + "</span>" +
        '<span class="std-pos">' + esc(c.pos) + "</span>" +
        '<span class="std-league">' + esc(c.flag) + "</span>" +
      "</span>" +
      '<span class="std-name">' + esc(c.name) + "</span>" +
      '<span class="std-stats">' + stats + "</span>" +
      "</button>";
  }

  /* one entry point for every card: standard set goes flat, the rest animate */
  function anyCard(c, opts) {
    return c && c.type === "std" ? stdMarkup(c, opts) : cardMarkup(c, opts);
  }

  /* --------------------------------------------------------------- grids -- */
  function grid(list, opts) {
    var cells = list.map(function (c) {
      return '<li class="cardgrid__cell">' + anyCard(c, opts) + '</li>';
    }).join("");
    return '<ul class="cardgrid">' + cells + '</ul>';
  }

  /* std sections share the same header + grid shape */
  function stdSection(list, label, note) {
    if (!list || !list.length) { return ""; }
    return "<h3>" + esc(label) + " \u2014 " + list.length + " cards</h3>" +
      '<p class="hint">' + esc(note) + "</p>" + grid(list);
  }

  /* --------------------------------------------------------- stat sheet -- */
  var LABELS = {
    acceleration: "Acceleration", sprint: "Sprint speed", positioning: "Positioning",
    finishing: "Finishing", shotPower: "Shot power", longShots: "Long shots",
    volleys: "Volleys", penalties: "Penalties", vision: "Vision",
    crossing: "Crossing", fkAccuracy: "FK accuracy", shortPass: "Short pass",
    longPass: "Long pass", curve: "Curve", agility: "Agility", balance: "Balance",
    reactions: "Reactions", ballControl: "Ball control", dribbling: "Dribbling",
    composure: "Composure", interceptions: "Interceptions", heading: "Heading",
    defAwareness: "Def. awareness", standTackle: "Standing tackle",
    slideTackle: "Sliding tackle", jumping: "Jumping", stamina: "Stamina",
    strength: "Strength", aggression: "Aggression",
    diving: "Diving", handling: "Handling", kicking: "Kicking",
    reflexes: "Reflexes", gkSpeed: "GK speed", gkPositioning: "GK positioning",
    oneOnOne: "1 on 1", penaltySave: "Penalty saves", crossClaim: "Cross claim",
    sweeperKeeper: "Sweeper keeper", longThrow: "Long throw", punching: "Punching"
  };

  function mainStats(c) {
    var rows = Object.keys(c.main).map(function (k) {
      return "<li><b>" + esc(k) + "</b><span>" + esc(c.main[k]) + "</span></li>";
    }).join("");
    return '<ul class="mainstats">' + rows + "</ul>";
  }

  function subStats(c) {
    var rows = Object.keys(c.sub).map(function (k) {
      var v = c.sub[k];
      return "<li>" + esc(LABELS[k] || k) + "<span>" + esc(v) + "</span>" +
             '<i class="bar"><i style="width:' + Math.max(0, Math.min(100, v)) +
             '%"></i></i></li>';
    }).join("");
    return '<ul class="substats">' + rows + "</ul>";
  }

  function detail(c) {
    var b = c.back;
    return '<div class="cdetail" style="--c1:' + esc(b.c1) + ';--c2:' + esc(b.c2) + '">' +
      '<div class="cdetail__top">' +
        anyCard(c, { big: true }) +
        '<div class="cdetail__meta">' +
          '<h3 class="cdetail__name">' + esc(c.flag + " " + c.name) + "</h3>" +
          '<span class="cdetail__full">' + esc(c.full) + "</span>" +
          '<div class="cdetail__chips">' +
            '<span class="chip chip--gold">' + esc(c.ovr || 99) + " " + esc(c.pos) + "</span>" +
            (c.alt.length ? '<span class="chip">' + esc(c.alt.join(" / ")) + "</span>" : "") +
            '<span class="chip chip--cyan">' + esc(c.rarity) + "</span>" +
            (c.set ? '<span class="chip chip--cyan">' + esc(c.set) + "</span>" : "") +
            '<span class="chip">' + esc(c.club) + "</span>" +
            '<span class="chip">' + esc(c.era) + "</span>" +
            '<span class="chip">' + esc(c.foot) + " foot</span>" +
            '<span class="chip">WF ' + esc(c.weak) + "\u2605</span>" +
            '<span class="chip">SM ' + esc(c.skills) + "\u2605</span>" +
            '<span class="chip">' + esc(c.height) + " cm</span>" +
            '<span class="chip">' + esc(c.weight) + " kg</span>" +
            '<span class="chip">' + esc(c.wr) + "</span>" +
            '<span class="chip chip--gold">' + esc(c.price) + "</span>" +
          "</div>" +
        "</div>" +
      "</div>" +

      '<h4 class="sec-title">Main stats</h4>' + mainStats(c) +
      '<h4 class="sec-title">Playstyles</h4>' +
      '<div class="cdetail__chips">' +
        c.playstyles.map(function (p) {
          return '<span class="chip chip--cyan">' + esc(p) + "</span>";
        }).join("") +
      "</div>" +
      '<h4 class="sec-title">Legend traits</h4>' +
      '<div class="cdetail__chips">' +
        c.traits.map(function (t) {
          return '<span class="chip">' + esc(t) + "</span>";
        }).join("") +
      "</div>" +
      '<h4 class="sec-title">' + (c.gk ? "21" : "29") + " attributes</h4>" +
      subStats(c) +
      (c.anim ? '<h4 class="sec-title">Signature animation</h4>' +
                '<div class="cdetail__chips"><span class="chip chip--gold">' +
                esc(c.anim.toUpperCase()) + "</span></div>" : "") +
      '<h4 class="sec-title">Card back \u2014 ' + esc(b.theme) + "</h4>" +
      '<p class="hint">Serial ' + esc(b.serial) + " &middot; signed " +
        esc(b.sign) + " &middot; double tap the card to see its back</p>" +
      "</div>";
  }

  /* ------------------------------------------------------------- screens -- */
  var FORMATION = [
    { x: 50, y: 88, pos: "GK" },
    { x: 16, y: 68, pos: "LB" }, { x: 38, y: 72, pos: "CB" },
    { x: 62, y: 72, pos: "CB" }, { x: 84, y: 68, pos: "RB" },
    { x: 26, y: 46, pos: "CM" }, { x: 50, y: 52, pos: "CDM" },
    { x: 74, y: 46, pos: "CAM" },
    { x: 18, y: 20, pos: "LW" }, { x: 50, y: 14, pos: "ST" },
    { x: 82, y: 20, pos: "RW" }
  ];

  function pitch() {
    var used = {};
    var slots = FORMATION.map(function (s) {
      var pool = DB.byPos(s.pos).filter(function (c) { return !used[c.id]; });
      var c = pool[0] || DB.all.filter(function (x) { return !used[x.id]; })[0];
      if (!c) { return ""; }
      used[c.id] = 1;
      return '<div class="pitch__slot" style="--x:' + s.x + '%;--y:' + s.y + '%">' +
             anyCard(c, { tag: false }) + "</div>";
    }).join("");
    return '<div class="pitch">' + slots + "</div>";
  }

  function marketRows(list) {
    var rows = list.map(function (c) {
      return '<li><button type="button" class="mktrow" data-open="' + esc(c.id) + '">' +
        '<img src="' + esc(c.art) + '" alt="" loading="lazy" />' +
        "<span>" +
          '<span class="mktrow__name">' + esc(c.flag + " " + c.name) + "</span><br />" +
          '<span class="mktrow__sub">' + esc(c.ovr || 99) + " " + esc(c.pos) + " &middot; " +
            esc(c.club) + "</span>" +
        "</span>" +
        '<span class="mktrow__price">' + esc(c.price) + "</span>" +
      "</button></li>";
    }).join("");
    return '<ul class="mktlist">' + rows + "</ul>";
  }

  function packStage(c, revealed) {
    var pool = esc(DB.count) + " cards in the pool \u2014 " +
      ((DB.icons || DB.all).length) + " icons at 99, " +
      ((DB.wc || []).length) + " World Cup heroes at 98, " +
      ((DB.cl || []).length) + " Champions League legends at 97 and " +
      ((DB.meme || []).length) + " Meme Icons at 98 / 96";

    return '<div class="packstage">' +
      anyCard(c, { flipped: !revealed, reveal: revealed }) +
      '<p class="hint">' +
        (revealed ? esc(c.name) + " \u2014 " + esc(c.ovr || 99) + " " + esc(c.pos) +
                    " &middot; " + esc(c.back.serial) +
                    (c.type === "meme"
                      ? " &middot; " + esc(c.rarity) +
                        (c.tier === "A" ? " \u2014 absolute cinema" : " \u2014 no cap")
                      : "")
                  : pool) +
      "</p>" +
      '<button type="button" class="btn" data-pull="1">' +
        (revealed ? "OPEN ANOTHER" : "OPEN PACK") + "</button>" +
      "</div>";
  }

  /* n different cards, weighted by their pull rate */
  function sample(n) {
    var out = [], seen = {}, guard = 0;
    while (out.length < n && guard++ < 400) {
      var c = DB.random();
      if (!seen[c.id]) { seen[c.id] = 1; out.push(c); }
    }
    return out;
  }

  window.MVM_UI = {
    esc: esc,
    card: anyCard,
    stdCard: stdMarkup,
    iconCard: cardMarkup,
    grid: grid,
    detail: detail,
    pitch: pitch,
    marketRows: marketRows,
    packStage: packStage,

    /* screens that are generated from the card database */
    screens: {
      club: function () {
        var icons = DB.icons || DB.all;
        var wc = DB.wc || [];
        var cl = DB.cl || [];
        var ma = DB.memeA || [];
        var mb = DB.memeB || [];
        var std = DB.std || [];
        return {
          title: "MY CLUB \u00b7 " + DB.count + " CARDS",
          html: "<h3>Icons \u2014 " + icons.length + " cards at 99 OVR</h3>" +
                '<p class="hint">Tap any card to open its full stat sheet, ' +
                "double tap to flip it.</p>" + grid(icons) +
                (wc.length
                  ? '<h3 class="wcsec__title">World Cup Heroes \u2014 ' +
                    wc.length + " cards at 98 OVR</h3>" +
                    '<p class="hint">Every hero has his own signature ' +
                    "animation and his own stat sheet.</p>" + grid(wc)
                  : "") +
                (cl.length
                  ? '<h3 class="clsec__title">Champions League Legends \u2014 ' +
                    cl.length + " cards at 97 OVR</h3>" +
                    '<p class="hint">Kings of Europe \u2014 tap a legend for his ' +
                    "full stat sheet.</p>" + grid(cl)
                  : "") +
                (ma.length
                  ? '<h3 class="memesec__title">Meme Icons \u00b7 Prime \u2014 ' +
                    ma.length + " cards at 98 OVR</h3>" +
                    '<p class="hint">The hard pulls \u2014 rizz, sigma and ' +
                    "gigachad energy only.</p>" + grid(ma)
                  : "") +
                (mb.length
                  ? '<h3 class="memesec__title memesec__title--b">Meme Icons \u2014 ' +
                    mb.length + " cards at 96 OVR</h3>" +
                    '<p class="hint">The easy pulls \u2014 still bussin.</p>' +
                    grid(mb)
                  : "") +
                (std.length
                  ? '<h3 class="stdsec__title">MVM Standard \u2014 ' +
                    std.length + " cards at 60\u201388 OVR</h3>" +
                    '<p class="hint">The everyday squad players: gold, silver ' +
                    "and bronze tiers with real portraits.</p>" +
                    grid(std.slice(0, 30)) +
                    '<div class="actbar">' +
                      '<button type="button" class="btn" data-screen="std">' +
                      "OPEN THE FULL STANDARD SET</button></div>"
                  : "")
        };
      },
      std: function () {
        return {
          title: "MVM STANDARD \u00b7 " + (DB.std || []).length + " CARDS",
          html: '<div class="actbar">' +
              '<button type="button" class="btn" data-screen="gold">GOLD ' +
                ((DB.stdGold || []).length) + "</button>" +
              '<button type="button" class="btn btn--ghost" data-screen="silver">' +
                "SILVER " + ((DB.stdSilver || []).length) + "</button>" +
              '<button type="button" class="btn btn--ghost" data-screen="bronze">' +
                "BRONZE " + ((DB.stdBronze || []).length) + "</button>" +
            "</div>" +
            stdSection(DB.stdGold, "Gold \u00b7 80\u201388 OVR",
              "The best of the standard set \u2014 tap a card for its full sheet.") +
            stdSection(DB.stdSilver, "Silver \u00b7 72\u201379 OVR",
              "Solid squad depth and the cheapest chemistry links.") +
            stdSection(DB.stdBronze, "Bronze \u00b7 60\u201369 OVR",
              "Where every collection starts \u2014 quick-sell fodder or a bargain.")
        };
      },
      gold: function () {
        return {
          title: "STANDARD GOLD",
          html: stdSection(DB.stdGold, "Gold \u00b7 80\u201388 OVR",
            "29 attributes, real portraits, no animation \u2014 pure football.") ||
            '<p class="hint">No gold cards loaded.</p>'
        };
      },
      silver: function () {
        return {
          title: "STANDARD SILVER",
          html: stdSection(DB.stdSilver, "Silver \u00b7 72\u201379 OVR",
            "The engine room of any budget squad.") ||
            '<p class="hint">No silver cards loaded.</p>'
        };
      },
      bronze: function () {
        return {
          title: "STANDARD BRONZE",
          html: stdSection(DB.stdBronze, "Bronze \u00b7 60\u201369 OVR",
            "Cheap, cheerful and the fastest way to fill a formation.") ||
            '<p class="hint">No bronze cards loaded.</p>'
        };
      },
      squad: function () {
        return {
          title: "SQUAD BUILDER",
          html: '<div style="display:flex; justify-content:space-around; align-items:center; background:rgba(255,255,255,0.06); padding: .6em; border-radius:8px; margin-bottom:.8em;">' +
              '<div><b>SQUAD OVR:</b> <span style="color:#ffcc00; font-size:1.2em; font-weight:900;">98</span></div>' +
              '<div><b>CHEMISTRY:</b> <span style="color:#00f2ff; font-size:1.2em; font-weight:900;">100</span></div>' +
            '</div>' + pitch() +
            '<p class="hint" style="margin-top:.8em;">Ultimate Squad active. Tap cards for player attributes.</p>'
        };
      },
      market: function () {
        var EC = window.MVM_ECON;
        var list = DB.all.slice(0, 15).sort(function (a, b) {
          return parseFloat(b.price) - parseFloat(a.price);
        });

        var rows = list.map(function (c) {
          var priceCoins = Math.round((c.ovr || 80) * 15000);
          var canAfford = EC && EC.coins() >= priceCoins;
          return '<li><div class="mktrow">' +
            '<img src="' + esc(c.art) + '" alt="" loading="lazy" style="width: 2.8em;" />' +
            '<span>' +
              '<span class="mktrow__name">' + esc(c.flag + " " + c.name) + '</span><br />' +
              '<span class="mktrow__sub">' + esc(c.ovr || 99) + ' ' + esc(c.pos) + ' &middot; ' + esc(c.club) + '</span>' +
            '</span>' +
            '<button type="button" class="btn ' + (canAfford ? "" : "btn--ghost") + '" data-buy-card="' + esc(c.id) + ':' + priceCoins + '">' +
              esc(EC ? EC.short(priceCoins) : c.price) + ' ◉' +
            '</button>' +
          '</div></li>';
        }).join("");

        return {
          title: "TRANSFER MARKET",
          html: '<h3>Live Market Bids</h3>' +
            '<ul class="mktlist">' + rows + '</ul>'
        };
      },
      transfers: function () {
        var list = DB.all.slice(0, 8);
        return {
          title: "TRANSFERS",
          html: "<h3>Active bids</h3>" + marketRows(list)
        };
      },
      pack: function () {
        return { title: "PACK OPENING", html: packStage(DB.random(), false) };
      },
      "open-pack": function () {
        return { title: "LEGEND PACK", html: packStage(DB.random(), false) };
      },
      draft: function () {
        var DR = window.MVM_DRAFT;
        if (!DR) {
          return {
            title: "DRAFT",
            html: "<h3>Pick your six</h3>" + grid(sample(6))
          };
        }

        if (!DR.state.active) {
          // Formation selector
          var formsHtml = DR.FORMATIONS.map(function (f) {
            return '<button type="button" class="btn btn--ghost" data-draft-form="' + esc(f.id) + '" style="margin: .3em; padding: .8em 1.4em;">' +
              '<b>' + esc(f.name) + '</b> FORMATION' +
              '</button>';
          }).join("");

          return {
            title: "MADFUT DRAFT 26",
            html: '<div style="text-align:center; padding: 1em 0;">' +
              '<h3>CHOOSE FORMATION</h3>' +
              '<p class="hint">Select tactical layout to build squad chemistry &amp; rating</p>' +
              '<div style="display:flex; justify-content:center; flex-wrap:wrap; gap: .5em; margin-top: 1.2em;">' +
                formsHtml +
              '</div>' +
              '</div>'
          };
        }

        // Active Draft Board
        var stats = DR.calculateStats();
        var form = DR.state.formation;

        // Candidate modal view
        if (DR.state.pickingSlot) {
          var pickSlot = DR.state.pickingSlot;
          var candCards = DR.state.candidates.map(function (c) {
            return '<div style="flex: 1; min-width: 5.5em; max-width: 8em;" data-draft-pick="' + esc(c.id) + '">' +
              anyCard(c, { tag: true }) +
              '</div>';
          }).join("");

          return {
            title: "SELECT " + esc(pickSlot.pos) + " PICK",
            html: '<div style="text-align:center; padding: .5em 0;">' +
              '<p class="hint">Tap a card to select for slot <b>' + esc(pickSlot.pos) + '</b></p>' +
              '<div style="display:flex; justify-content:center; flex-wrap:wrap; gap: .6em; margin: 1em 0;">' +
                candCards +
              '</div>' +
              '</div>'
          };
        }

        // Pitch Slots
        var slotsHtml = form.slots.map(function (s) {
          var picked = DR.state.picks[s.id];
          return '<div class="pitch__slot" style="--x:' + s.x + '%;--y:' + s.y + '%" data-draft-slot="starting:' + esc(s.id) + ':' + esc(s.pos) + '">' +
            (picked ? anyCard(picked, { tag: true })
                    : '<button type="button" class="btn btn--ghost" style="width:100%; aspect-ratio:1; border-radius:50%; font-size: 0.8em; font-weight:900; background:rgba(0,242,255,0.15); border: 2px dashed #00f2ff;">' + esc(s.pos) + '</button>') +
            '</div>';
        }).join("");

        // Bench Slots
        var benchHtml = DR.state.bench.map(function (b, idx) {
          return '<div style="width: 4.5em; display:inline-block; margin: .2em;" data-draft-slot="bench:' + idx + ':SUB">' +
            (b ? anyCard(b, { tag: true })
               : '<button type="button" class="btn btn--ghost" style="width:100%; aspect-ratio:1; border-radius:50%; font-size: 0.7em; font-weight:800; background:rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.3);">SUB</button>') +
            '</div>';
        }).join("");

        var isComplete = stats.pickedCount >= (form.slots.length + 5);

        return {
          title: form.name + " DRAFT · RATING " + stats.rating + " · CHEM " + stats.chemistry,
          html: '<div style="display:flex; justify-content:space-around; align-items:center; background:rgba(255,255,255,0.06); padding: .5em; border-radius:8px; margin-bottom:.8em;">' +
              '<div><b>RATING:</b> <span style="color:#ffcc00; font-size:1.2em; font-weight:900;">' + stats.rating + '</span></div>' +
              '<div><b>CHEMISTRY:</b> <span style="color:#00f2ff; font-size:1.2em; font-weight:900;">' + stats.chemistry + '</span></div>' +
              '<div><b>PICKED:</b> ' + stats.pickedCount + ' / ' + (form.slots.length + 5) + '</div>' +
            '</div>' +
            '<div class="pitch" style="margin-bottom: 1em;">' + slotsHtml + '</div>' +
            '<h4 class="sec-title" style="margin: .5em 0 .2em;">SUBSTITUTES</h4>' +
            '<div style="text-align:center; overflow-x:auto; white-space:nowrap; margin-bottom: 1em;">' + benchHtml + '</div>' +
            '<div class="actbar">' +
              (isComplete
                ? '<button type="button" class="btn" data-draft-sim="1">PLAY DRAFT MATCH &amp; CLAIM REWARDS</button>'
                : '') +
              '<button type="button" class="btn btn--ghost" data-draft-reset="1">RESET DRAFT</button>' +
            '</div>'
        };
      },
      wc: function () {
        var wc = DB.wc || [];
        return {
          title: "WORLD CUP HEROES",
          html: "<h3>" + wc.length + " heroes \u00b7 98 OVR</h3>" +
                '<p class="hint">Each card animates differently \u2014 tap for stats.</p>' +
                grid(wc)
        };
      },
      cl: function () {
        var cl = DB.cl || [];
        return {
          title: "CHAMPIONS LEAGUE LEGENDS",
          html: "<h3>" + cl.length + " legends \u00b7 97 OVR</h3>" +
                '<p class="hint">Every legend has his own signature animation ' +
                "and his own full stat sheet \u2014 tap to open it.</p>" +
                grid(cl)
        };
      },
      meme: function () {
        var ma = DB.memeA || [];
        var mb = DB.memeB || [];
        return {
          title: "MEME ICONS",
          html: "<h3>" + (ma.length + mb.length) + " meme cards \u00b7 98 / 96 OVR</h3>" +
                '<p class="hint">Prime Meme cards are the rare ones \u2014 low pull ' +
                "rate, higher stats. Every card animates its own way.</p>" +
                '<h4 class="sec-title">Prime Meme \u00b7 98 OVR \u00b7 hard pull</h4>' +
                grid(ma) +
                '<h4 class="sec-title">Meme Icon \u00b7 96 OVR \u00b7 easy pull</h4>' +
                grid(mb)
        };
      }
    }
  };

  /* the home-screen event banner opens the World Cup Heroes set */
  window.MVM_UI.screens.event = window.MVM_UI.screens.wc;
})();
