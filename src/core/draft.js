/* ============================================================================
 * MVMPACK 26 — MADFUT DRAFT ENGINE
 * ----------------------------------------------------------------------------
 * Interactive draft logic: Formations, 5 candidate picks per slot, Starting XI,
 * Bench (5), Reserves (5), chemistry & rating calculation, and tournament simulation.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  var EC = window.MVM_ECON;
  if (!DB) { return; }

  var FORMATIONS = [
    {
      id: "433",
      name: "4-3-3",
      slots: [
        { id: "gk", pos: "GK", x: 50, y: 88, links: ["cb1", "cb2"] },
        { id: "lb", pos: "LB", x: 16, y: 68, links: ["cb1", "cm1"] },
        { id: "cb1", pos: "CB", x: 38, y: 72, links: ["gk", "lb", "cb2", "cdm"] },
        { id: "cb2", pos: "CB", x: 62, y: 72, links: ["gk", "cb1", "rb", "cdm"] },
        { id: "rb", pos: "RB", x: 84, y: 68, links: ["cb2", "cm2"] },
        { id: "cm1", pos: "CM", x: 26, y: 46, links: ["lb", "cdm", "lw"] },
        { id: "cdm", pos: "CDM", x: 50, y: 52, links: ["cb1", "cb2", "cm1", "cm2", "st"] },
        { id: "cm2", pos: "CAM", x: 74, y: 46, links: ["rb", "cdm", "rw"] },
        { id: "lw", pos: "LW", x: 18, y: 20, links: ["cm1", "st"] },
        { id: "st", pos: "ST", x: 50, y: 14, links: ["cdm", "lw", "rw"] },
        { id: "rw", pos: "RW", x: 82, y: 20, links: ["cm2", "st"] }
      ]
    },
    {
      id: "442",
      name: "4-4-2",
      slots: [
        { id: "gk", pos: "GK", x: 50, y: 88, links: ["cb1", "cb2"] },
        { id: "lb", pos: "LB", x: 16, y: 70, links: ["cb1", "lm"] },
        { id: "cb1", pos: "CB", x: 38, y: 74, links: ["gk", "lb", "cb2", "cm1"] },
        { id: "cb2", pos: "CB", x: 62, y: 74, links: ["gk", "cb1", "rb", "cm2"] },
        { id: "rb", pos: "RB", x: 84, y: 70, links: ["cb2", "rm"] },
        { id: "lm", pos: "LM", x: 16, y: 44, links: ["lb", "cm1", "st1"] },
        { id: "cm1", pos: "CM", x: 38, y: 46, links: ["cb1", "lm", "cm2", "st1"] },
        { id: "cm2", pos: "CM", x: 62, y: 46, links: ["cb2", "cm1", "rm", "st2"] },
        { id: "rm", pos: "RM", x: 84, y: 44, links: ["rb", "cm2", "st2"] },
        { id: "st1", pos: "ST", x: 38, y: 18, links: ["lm", "cm1", "st2"] },
        { id: "st2", pos: "ST", x: 62, y: 18, links: ["rm", "cm2", "st1"] }
      ]
    },
    {
      id: "4231",
      name: "4-2-3-1",
      slots: [
        { id: "gk", pos: "GK", x: 50, y: 88, links: ["cb1", "cb2"] },
        { id: "lb", pos: "LB", x: 16, y: 70, links: ["cb1", "cdm1"] },
        { id: "cb1", pos: "CB", x: 38, y: 74, links: ["gk", "lb", "cb2", "cdm1"] },
        { id: "cb2", pos: "CB", x: 62, y: 74, links: ["gk", "cb1", "rb", "cdm2"] },
        { id: "rb", pos: "RB", x: 84, y: 70, links: ["cb2", "cdm2"] },
        { id: "cdm1", pos: "CDM", x: 36, y: 54, links: ["cb1", "lb", "cdm2", "cam"] },
        { id: "cdm2", pos: "CDM", x: 64, y: 54, links: ["cb2", "rb", "cdm1", "cam"] },
        { id: "cam1", pos: "CAM", x: 20, y: 34, links: ["cdm1", "cam"] },
        { id: "cam", pos: "CAM", x: 50, y: 32, links: ["cdm1", "cdm2", "cam1", "cam2", "st"] },
        { id: "cam2", pos: "CAM", x: 80, y: 34, links: ["cdm2", "cam"] },
        { id: "st", pos: "ST", x: 50, y: 14, links: ["cam"] }
      ]
    }
  ];

  /* Active draft state */
  var state = {
    active: false,
    formation: null,
    picks: {},      // slotId -> card object
    bench: [null, null, null, null, null],
    reserves: [null, null, null, null, null],
    pickingSlot: null,
    candidates: [],
    history: []
  };

  function startDraft(formationId) {
    var form = FORMATIONS.find(function (f) { return f.id === formationId; }) || FORMATIONS[0];
    state.active = true;
    state.formation = form;
    state.picks = {};
    state.bench = [null, null, null, null, null];
    state.reserves = [null, null, null, null, null];
    state.pickingSlot = null;
    state.candidates = [];
    return state;
  }

  function getUsedCardIds() {
    var ids = [];
    Object.keys(state.picks).forEach(function (k) {
      if (state.picks[k]) { ids.push(state.picks[k].id); }
    });
    state.bench.concat(state.reserves).forEach(function (c) {
      if (c) { ids.push(c.id); }
    });
    return ids;
  }

  /* Generate 5 candidate cards for target slot position */
  function generateCandidates(pos) {
    var used = getUsedCardIds();
    var all = DB.all.filter(function (c) { return used.indexOf(c.id) === -1; });

    // Priority: matching position or alternate position
    var matches = all.filter(function (c) {
      return c.pos === pos || (c.alt && c.alt.indexOf(pos) !== -1);
    });

    // Shuffle and pick
    matches.sort(function () { return 0.5 - Math.random(); });
    all.sort(function () { return 0.5 - Math.random(); });

    var candidates = [];
    // take up to 3 position matches
    for (var i = 0; i < matches.length && candidates.length < 3; i++) {
      candidates.push(matches[i]);
    }
    // fill rest with high rated / general cards
    for (var j = 0; j < all.length && candidates.length < 5; j++) {
      if (candidates.indexOf(all[j]) === -1) {
        candidates.push(all[j]);
      }
    }
    state.candidates = candidates;
    return candidates;
  }

  function pickCard(slotType, slotIndex, card) {
    if (slotType === "starting") {
      state.picks[slotIndex] = card;
    } else if (slotType === "bench") {
      state.bench[slotIndex] = card;
    } else if (slotType === "reserves") {
      state.reserves[slotIndex] = card;
    }
    state.pickingSlot = null;
    state.candidates = [];
    return calculateStats();
  }

  /* Calculate rating & chemistry */
  function calculateStats() {
    if (!state.formation) { return { rating: 0, chemistry: 0, count: 0 }; }

    var slots = state.formation.slots;
    var totalOvr = 0;
    var pickedCount = 0;
    var chemTotal = 0;

    // Slot map for quick link evaluation
    var slotMap = {};
    slots.forEach(function (s) {
      slotMap[s.id] = { slot: s, card: state.picks[s.id] || null };
      if (state.picks[s.id]) {
        pickedCount++;
        totalOvr += (state.picks[s.id].ovr || 60);
      }
    });

    // Add bench / reserves to pickedCount & rating calculation if needed
    state.bench.concat(state.reserves).forEach(function (c) {
      if (c) {
        pickedCount++;
        totalOvr += (c.ovr || 60);
      }
    });

    var rating = pickedCount > 0 ? Math.round(totalOvr / pickedCount) : 0;

    // Calculate chemistry for each picked starting slot
    slots.forEach(function (s) {
      var item = slotMap[s.id];
      if (!item || !item.card) { return; }

      var card = item.card;
      var slotChem = 0;

      // Position accuracy (0-3 points)
      if (card.pos === s.pos) {
        slotChem += 3;
      } else if (card.alt && card.alt.indexOf(s.pos) !== -1) {
        slotChem += 2;
      } else {
        slotChem += 1;
      }

      // Link bonuses from adjacent slots
      s.links.forEach(function (linkId) {
        var neighbor = slotMap[linkId];
        if (neighbor && neighbor.card) {
          var nCard = neighbor.card;
          if (nCard.nation === card.nation) { slotChem += 1.5; }
          if (nCard.club === card.club) { slotChem += 2; }
          if (nCard.type === card.type) { slotChem += 1; }
        }
      });

      chemTotal += Math.min(10, slotChem);
    });

    var chemistry = Math.min(100, Math.round((chemTotal / (slots.length * 10)) * 100));

    return {
      rating: rating,
      chemistry: chemistry,
      pickedCount: pickedCount,
      totalSlots: slots.length + 10
    };
  }

  /* Simulate Draft Tournament Match */
  function simulateMatch(opponentName, opponentOvr) {
    var stats = calculateStats();
    var userOvr = stats.rating + Math.round(stats.chemistry / 10);
    var oppRating = opponentOvr || (80 + Math.floor(Math.random() * 15));

    var userGoals = 0;
    var oppGoals = 0;

    var chanceDiff = userOvr - oppRating;

    for (var minute = 10; minute <= 90; minute += 15) {
      var roll = Math.random() * 100;
      if (roll < 30 + chanceDiff * 2) {
        userGoals++;
      } else if (roll > 80 - chanceDiff * 1.5) {
        oppGoals++;
      }
    }

    var win = userGoals >= oppGoals;
    var coinReward = win ? 250000 + (userGoals * 50000) : 100000;
    var gemReward = win ? 50 : 10;

    if (EC) {
      EC.earn({ coins: coinReward, gems: gemReward });
    }

    return {
      userGoals: userGoals,
      oppGoals: oppGoals,
      win: win,
      opponent: opponentName || "FC Rivals",
      coins: coinReward,
      gems: gemReward
    };
  }

  window.MVM_DRAFT = {
    FORMATIONS: FORMATIONS,
    state: state,
    startDraft: startDraft,
    generateCandidates: generateCandidates,
    pickCard: pickCard,
    calculateStats: calculateStats,
    simulateMatch: simulateMatch
  };
})();
