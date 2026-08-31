/* MVMPACK 26 - interaction layer for the hotspot UI */
(function () {
  "use strict";

  var data = window.MVM_DATA || { screens: {}, toasts: {} };
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

  function openScreen(key) {
    var conf = data.screens[key];
    if (!conf) { return false; }
    lastFocus = document.activeElement;
    screenTitle.textContent = conf.title;
    /* content comes from the local static data file only */
    screenBody.innerHTML = conf.html;
    screenEl.classList.add("is-open");
    screenEl.setAttribute("aria-hidden", "false");
    screenClose.focus();
    return true;
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
