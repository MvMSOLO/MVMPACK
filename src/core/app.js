/* MVMPACK 26 - interaction layer for the hotspot UI */
(function () {
  "use strict";

  var data = window.MVM_DATA || { screens: {}, toasts: {} };
  var DB = window.MVM_CARDS || null;
  var UI = window.MVM_UI || null;
  var stage = document.getElementById("stage");
  var screenEl = document.getElementById("screen");
  var screenTitle = document.getElementById("screenTitle");
  var screenBody = document.getElementById("screenBody");
  var screenClose = document.getElementById("screenClose");
  var toastEl = document.getElementById("toast");
  var lastFocus = null;
  var toastTimer = null;

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-open");
    }, 1800);
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
    var row = ev.target.closest("[data-open]");
    if (row) { openCard(row.getAttribute("data-open")); return; }

    if (ev.target.closest("[data-pull]") && DB && UI) {
      var pulled = DB.random();
      paint({ title: "LEGEND PACK", html: UI.packStage(pulled, true) });
      showToast(pulled.type === "wc" ? "WORLD CUP HERO PULLED"
        : pulled.type === "cl" ? "CHAMPIONS LEAGUE LEGEND PULLED"
        : pulled.type === "meme"
          ? (pulled.tier === "A" ? "PRIME MEME PULLED \u2014 ABSOLUTE CINEMA"
                                 : "MEME ICON PULLED \u2014 NO CAP")
        : "NEW ICON PULLED");
      return;
    }

    var card = ev.target.closest(".mvm-card");
    if (card) { card.classList.toggle("is-flipped"); }
  });

  /* double tap / double click a card to read its full stats */
  screenBody.addEventListener("dblclick", function (ev) {
    var card = ev.target.closest(".mvm-card");
    if (card) { openCard(card.getAttribute("data-card")); }
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
