/* MVMPACK 26 - interaction layer for the hotspot UI */
(function () {
  "use strict";

  var data = window.MVM_DATA || { screens: {}, toasts: {} };
  var DB = window.MVM_CARDS || null;
  var UI = window.MVM_UI || null;
  var EC = window.MVM_ECON || null;
  var PK = window.MVM_PACKS || null;
  var PUI = UI && UI.packs ? UI.packs : null;
  var stage = document.getElementById("stage");
  var screenEl = document.getElementById("screen");
  var screenTitle = document.getElementById("screenTitle");
  var screenBody = document.getElementById("screenBody");
  var screenClose = document.getElementById("screenClose");
  var toastEl = document.getElementById("toast");
  var lastFocus = null;
  var toastTimer = null;
  var lastResult = null;
  var hudCoins = document.getElementById("hudCoins");
  var hudGems = document.getElementById("hudGems");

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-open");
    }, 1800);
  }

  /* ---------------------------------------------------------------- HUD ---
   * The header artwork carries a coins / gems read-out; keep it in sync with
   * the wallet and bump it whenever a value actually changes.
   */
  function bump(el, text) {
    if (!el || el.textContent === text) { return; }
    el.textContent = text;
    el.classList.remove("is-bump");
    /* force a reflow so the animation restarts on every change */
    void el.offsetWidth;
    el.classList.add("is-bump");
  }

  function syncHud() {
    if (!EC) { return; }
    bump(hudCoins, EC.short(EC.coins()));
    bump(hudGems, EC.short(EC.gems()));
  }

  if (EC) { EC.onChange(syncHud); }

  /* jackpot flash for a 99 OVR pull */
  function flash() {
    var fx = document.createElement("div");
    fx.className = "flash";
    document.body.appendChild(fx);
    setTimeout(function () {
      if (fx.parentNode) { fx.parentNode.removeChild(fx); }
    }, 950);
  }

  function paint(conf) {
    screenTitle.textContent = conf.title;
    /* content is built locally from data.js / cards.js only */
    screenBody.innerHTML = conf.html;
    screenBody.scrollTop = 0;
  }

  function openScreen(key) {
    /* card-driven screens win over the static placeholders */
    var build = UI && UI.screens[key];
    var conf = build ? build() : data.screens[key];
    if (!conf) { return false; }
    lastFocus = document.activeElement;
    paint(conf);
    screenEl.classList.add("is-open");
    screenEl.setAttribute("aria-hidden", "false");
    screenClose.focus();
    return true;
  }

  /* full stat sheet for one card */
  function openCard(id) {
    if (!DB || !UI) { return; }
    var c = DB.get(id);
    if (!c) { return; }
    paint({ title: c.name + "  \u00b7  " + (c.ovr || 99) + " " + c.pos,
            html: UI.detail(c) });
    if (!screenEl.classList.contains("is-open")) {
      lastFocus = document.activeElement;
      screenEl.classList.add("is-open");
      screenEl.setAttribute("aria-hidden", "false");
    }
    screenClose.focus();
  }

  /* --------------------------------------------------- pack transactions --
   * Buying is the only way cards enter the collection, so the wallet check,
   * the roll and the result screen all live behind this one entry point.
   */
  function bestToast(res) {
    if (res.best >= 99) { return "99 OVR PULLED \u2014 ABSOLUTE CINEMA"; }
    if (res.best >= 98) { return "98 OVR PULLED \u2014 MASSIVE"; }
    if (res.best >= 97) { return "97 OVR PULLED \u2014 SOLID HIT"; }
    return "PACK OPENED \u00b7 NO 97+ THIS TIME";
  }

  function openPack(id) {
    var pack = PK.get(id);
    if (!pack) { return; }

    var res = PK.open(pack, PUI.getMulti());
    if (!res.ok) {
      showToast(res.reason === "funds"
        ? "NOT ENOUGH \u00b7 " + PUI.money(res.cost) + " NEEDED"
        : "PACK UNAVAILABLE");
      return;
    }

    lastResult = res;
    paint(PUI.result(res));
    if (!screenEl.classList.contains("is-open")) {
      lastFocus = document.activeElement;
      screenEl.classList.add("is-open");
      screenEl.setAttribute("aria-hidden", "false");
    }
    if (res.best >= 99) { flash(); }
    showToast(bestToast(res));
  }

  function quickSell() {
    var got = 0, i;
    for (i = 0; i < lastResult.pulls.length; i++) {
      var p = lastResult.pulls[i];
      if (!p.isNew) { got += EC.sell(p.card.id, 1); }
    }
    lastResult = null;
    showToast(got > 0 ? "DUPES SOLD \u00b7 +" + EC.short(got) + " \u25c9"
                      : "NOTHING LEFT TO SELL");
    openScreen("store");
  }

  function closeScreen() {
    screenEl.classList.remove("is-open");
    screenEl.setAttribute("aria-hidden", "true");
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }

  function setActiveNav(btn) {
    var items = stage.querySelectorAll(".hs--nav");
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("is-active");
    }
    btn.classList.add("is-active");
  }

  stage.addEventListener("click", function (ev) {
    var btn = ev.target.closest(".hs");
    if (!btn) { return; }
    var act = btn.getAttribute("data-act");

    if (btn.classList.contains("hs--nav")) { setActiveNav(btn); }

    if (!openScreen(act)) {
      showToast(data.toasts[act] || act.toUpperCase());
    }
  });

  /* ---------- inside the overlay: flip cards, open sheets, pull packs ---- */
  screenBody.addEventListener("click", function (ev) {
    var DR = window.MVM_DRAFT;

    /* ---- MADFUT Draft interactions ---------------------------------- */
    var dForm = ev.target.closest("[data-draft-form]");
    if (dForm && DR) {
      DR.startDraft(dForm.getAttribute("data-draft-form"));
      openScreen("draft");
      return;
    }

    var dSlot = ev.target.closest("[data-draft-slot]");
    if (dSlot && DR) {
      var parts = dSlot.getAttribute("data-draft-slot").split(":");
      var type = parts[0], id = parts[1], pos = parts[2];
      DR.state.pickingSlot = { type: type, id: id, pos: pos };
      DR.generateCandidates(pos);
      openScreen("draft");
      return;
    }

    var dPick = ev.target.closest("[data-draft-pick]");
    if (dPick && DR && DR.state.pickingSlot) {
      var cardId = dPick.getAttribute("data-draft-pick");
      var cardObj = DB.get(cardId);
      if (cardObj) {
        var pSlot = DR.state.pickingSlot;
        DR.pickCard(pSlot.type, pSlot.id, cardObj);
        showToast(cardObj.name + " SELECTED");
      }
      openScreen("draft");
      return;
    }

    var dSim = ev.target.closest("[data-draft-sim]");
    if (dSim && DR) {
      var res = DR.simulateMatch("Global All-Stars", 88);
      showToast(res.win ? "VICTORY! " + res.userGoals + "-" + res.oppGoals + " · +" + EC.short(res.coins) + " COINS"
                        : "MATCH ENDED " + res.userGoals + "-" + res.oppGoals + " · +" + EC.short(res.coins) + " COINS");
      DR.state.active = false;
      openScreen("draft");
      return;
    }

    var dReset = ev.target.closest("[data-draft-reset]");
    if (dReset && DR) {
      DR.state.active = false;
      openScreen("draft");
      return;
    }

    var bCard = ev.target.closest("[data-buy-card]");
    if (bCard && EC && DB) {
      var parts = bCard.getAttribute("data-buy-card").split(":");
      var cId = parts[0];
      var costCoins = parseInt(parts[1], 10) || 100000;
      var cardObj = DB.get(cId);

      if (cardObj) {
        if (EC.canPay({ coins: costCoins })) {
          EC.pay({ coins: costCoins });
          EC.add(cardObj);
          showToast("PURCHASED " + cardObj.name + "!");
          openScreen("market");
        } else {
          showToast("NOT ENOUGH COINS (" + EC.short(costCoins) + " NEEDED)");
        }
      }
      return;
    }

    var row = ev.target.closest("[data-open]");
    if (row) { openCard(row.getAttribute("data-open")); return; }

    /* ---- pack store: pick a multiplier ---------------------------------- */
    var multi = ev.target.closest("[data-multi]");
    if (multi && PUI) {
      PUI.setMulti(parseInt(multi.getAttribute("data-multi"), 10) || 1);
      openScreen("store");
      return;
    }

    /* ---- buy + open a pack --------------------------------------------- */
    var packBtn = ev.target.closest("[data-pack]");
    if (packBtn && PK && PUI) {
      openPack(packBtn.getAttribute("data-pack"));
      return;
    }

    /* ---- quick sell every duplicate from the last opening --------------- */
    if (ev.target.closest("[data-quicksell]") && EC && lastResult) {
      quickSell();
      return;
    }

    /* ---- luck charm ----------------------------------------------------- */
    if (ev.target.closest("[data-charm]") && PK) {
      if (PK.buyCharm()) {
        showToast("LUCK CHARM ACTIVE \u00b7 " + PK.charm.packs + " PACKS");
      } else {
        showToast("NOT ENOUGH GEMS FOR THE CHARM");
      }
      openScreen("store");
      return;
    }

    /* ---- claim an income source ---------------------------------------- */
    var claimBtn = ev.target.closest("[data-claim]");
    if (claimBtn && PK) {
      var src = PK.claim(claimBtn.getAttribute("data-claim"));
      if (src) {
        showToast(src.label + " \u00b7 +" + EC.short(src.coins) + " \u25c9");
      }
      openScreen("earn");
      return;
    }

    /* ---- jump between overlay screens ---------------------------------- */
    var jump = ev.target.closest("[data-screen]");
    if (jump) { openScreen(jump.getAttribute("data-screen")); return; }

    if (ev.target.closest("[data-pull]") && DB && UI) {
      var pulled = DB.random();
      paint({ title: "LEGEND PACK", html: UI.packStage(pulled, true) });
      showToast(pulled.type === "wc" ? "WORLD CUP HERO PULLED"
        : pulled.type === "cl" ? "CHAMPIONS LEAGUE LEGEND PULLED"
        : pulled.type === "meme"
          ? (pulled.tier === "A" ? "PRIME MEME PULLED \u2014 ABSOLUTE CINEMA"
                                 : "MEME ICON PULLED \u2014 NO CAP")
        : pulled.type === "std"
          ? (pulled.tier || "bronze").toUpperCase() + " CARD PULLED \u00b7 " +
            (pulled.ovr || 60) + " OVR"
        : "NEW ICON PULLED");
      return;
    }

    /* ---- single tap on a card opens its full stat sheet ----------------- */
    var card = ev.target.closest(".mvm-card, .stdc");
    if (card) { openCard(card.getAttribute("data-card")); }
  });

  /* double tap / double click still flips the card to show its back art */
  screenBody.addEventListener("dblclick", function (ev) {
    var card = ev.target.closest(".mvm-card");
    if (card) { card.classList.toggle("is-flipped"); }
  });

  screenClose.addEventListener("click", closeScreen);

  screenEl.addEventListener("click", function (ev) {
    if (ev.target === screenEl) { closeScreen(); }
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") { closeScreen(); }
  });

  /* keep the stage sized correctly on mobile browsers with dynamic toolbars */
  function syncHeight() {
    document.documentElement.style.setProperty(
      "--vh", window.innerHeight * 0.01 + "px");
  }
  window.addEventListener("resize", syncHeight);
  syncHeight();
})();
