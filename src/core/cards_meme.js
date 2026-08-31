/* ============================================================================
 * MVMPACK 26 — MEME ICONS CARD SET (16 cards)
 * ----------------------------------------------------------------------------
 * Sliced from the two uploaded "Meme Icons" sheets (assets/meme/*.png).
 *   • TYPE A — 8 cards, 98 OVR, "PRIME MEME" — the hard pulls (low `pull`)
 *   • TYPE B — 8 cards, 96 OVR, "MEME ICON"  — the easy pulls (high `pull`)
 * Every card carries its own main stats, full 29-attribute sheet, playstyles,
 * traits, price, pull rate, back design and its own front animation
 * (`anim` → .memefx--<anim> in memefx.css).
 * Ids are prefixed "ma-" / "mb-" so they never clash with icon / wc / cl.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  if (!DB) { return; }

  /* helper: TYPE A — prime meme, 98 OVR, rare */
  function MA(o) {
    o.ovr = 98;
    o.type = "meme";
    o.tier = "A";
    o.rarity = "PRIME MEME";
    o.set = "Meme Icons · Prime";
    o.art = "assets/meme/a-" + o.id.replace(/^ma-/, "") + ".png";
    o.gk = false;
    return o;
  }

  /* helper: TYPE B — standard meme icon, 96 OVR, common */
  function MB(o) {
    o.ovr = 96;
    o.type = "meme";
    o.tier = "B";
    o.rarity = "MEME ICON";
    o.set = "Meme Icons";
    o.art = "assets/meme/b-" + o.id.replace(/^mb-/, "") + ".png";
    o.gk = false;
    return o;
  }

  var MEME = [

    /* ================================================================== *
     * TYPE A — PRIME MEME · 98 OVR · the ones you almost never pull
     * ================================================================== */

    MA({
      id: "ma-jackson", name: "N. JACKSON", full: "Nicolas Jackson",
      pos: "ST", alt: ["CF", "LW"], nation: "Senegal", flag: "\uD83C\uDDF8\uD83C\uDDF3",
      club: "Chelsea", era: "MEME 2026", foot: "Right", weak: 4, skills: 4,
      height: 185, weight: 79, age: 24, wr: "High / Med",
      main: { PAC: 99, SHO: 97, PAS: 88, DRI: 96, DEF: 48, PHY: 94 },
      sub: {
        acceleration: 99, sprint: 99, positioning: 96, finishing: 98,
        shotPower: 96, longShots: 90, volleys: 92, penalties: 88,
        vision: 87, crossing: 84, fkAccuracy: 78, shortPass: 89,
        longPass: 82, curve: 86, agility: 95, balance: 93,
        reactions: 97, ballControl: 96, dribbling: 96, composure: 90,
        interceptions: 44, heading: 90, defAwareness: 38, standTackle: 46,
        slideTackle: 40, jumping: 92, stamina: 94, strength: 92, aggression: 82
      },
      playstyles: ["Rapid+", "Power Shot+", "Trivela+", "Relentless"],
      traits: ["Offside merchant, canonised", "Sprints first, thinks later", "Chelsea chaos engine", "Zero chill in the box"],
      price: "24.8M", pull: 0.14, anim: "rizz",
      back: {
        theme: "Certified Rizzler", c1: "#7b2ff7", c2: "#2b6cff",
        pattern: "burst", motto: "Offside? Never heard of her.",
        serial: "MEME-A01/08", sign: "NJ 15"
      }
    }),

    MA({
      id: "ma-antony", name: "ANTONY", full: "Antony Matheus dos Santos",
      pos: "RW", alt: ["LW", "CAM"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Manchester United", era: "MEME 2026", foot: "Left", weak: 3, skills: 5,
      height: 174, weight: 63, age: 25, wr: "Med / Low",
      main: { PAC: 98, SHO: 94, PAS: 93, DRI: 99, DEF: 52, PHY: 90 },
      sub: {
        acceleration: 99, sprint: 96, positioning: 92, finishing: 93,
        shotPower: 90, longShots: 91, volleys: 86, penalties: 84,
        vision: 93, crossing: 92, fkAccuracy: 86, shortPass: 93,
        longPass: 86, curve: 95, agility: 99, balance: 97,
        reactions: 95, ballControl: 99, dribbling: 99, composure: 88,
        interceptions: 48, heading: 68, defAwareness: 42, standTackle: 52,
        slideTackle: 45, jumping: 78, stamina: 92, strength: 74, aggression: 70
      },
      playstyles: ["Trickster+", "Technical+", "Flair+", "Rapid"],
      traits: ["The 360° spin, forever", "Left foot only, always", "Costs more than the highlight", "Spin first, cross never"],
      price: "23.4M", pull: 0.15, anim: "sigma",
      back: {
        theme: "360 Sigma Spin", c1: "#39ff14", c2: "#0b0b0b",
        pattern: "halo", motto: "Spin the ball, spin the narrative.",
        serial: "MEME-A02/08", sign: "A21"
      }
    }),

    MA({
      id: "ma-bellingham", name: "BELLINGHAM", full: "Jude Victor William Bellingham",
      pos: "CAM", alt: ["CM", "CF"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 4, skills: 4,
      height: 186, weight: 75, age: 22, wr: "High / High",
      main: { PAC: 94, SHO: 93, PAS: 96, DRI: 98, DEF: 92, PHY: 95 },
      sub: {
        acceleration: 93, sprint: 94, positioning: 94, finishing: 92,
        shotPower: 94, longShots: 90, volleys: 88, penalties: 86,
        vision: 96, crossing: 88, fkAccuracy: 84, shortPass: 96,
        longPass: 93, curve: 87, agility: 94, balance: 96,
        reactions: 98, ballControl: 97, dribbling: 96, composure: 97,
        interceptions: 91, heading: 89, defAwareness: 88, standTackle: 92,
        slideTackle: 87, jumping: 90, stamina: 97, strength: 93, aggression: 90
      },
      playstyles: ["Press Proven+", "Relentless+", "Technical+", "Long Ball Pass"],
      traits: ["Arms-wide celebration", "Hey Jude on loop", "Box-to-box cheat code", "Runs the whole midfield alone"],
      price: "26.2M", pull: 0.12, anim: "gigachad",
      back: {
        theme: "Hey Jude Gigachad", c1: "#22d3ee", c2: "#1d4ed8",
        pattern: "rays", motto: "Arms wide, game over.",
        serial: "MEME-A03/08", sign: "Jude 5"
      }
    }),

    MA({
      id: "ma-vinicius", name: "VINI JR.", full: "Vin\u00edcius Jos\u00e9 Paix\u00e3o de Oliveira J\u00fanior",
      pos: "LW", alt: ["ST", "RW"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 4, skills: 5,
      height: 176, weight: 73, age: 25, wr: "High / Low",
      main: { PAC: 99, SHO: 92, PAS: 88, DRI: 98, DEF: 44, PHY: 86 },
      sub: {
        acceleration: 99, sprint: 99, positioning: 92, finishing: 91,
        shotPower: 88, longShots: 85, volleys: 82, penalties: 80,
        vision: 88, crossing: 86, fkAccuracy: 74, shortPass: 88,
        longPass: 80, curve: 88, agility: 98, balance: 95,
        reactions: 95, ballControl: 97, dribbling: 98, composure: 87,
        interceptions: 40, heading: 72, defAwareness: 34, standTackle: 44,
        slideTackle: 38, jumping: 84, stamina: 90, strength: 76, aggression: 72
      },
      playstyles: ["Rapid+", "Flair+", "Trickster+", "Quick Step"],
      traits: ["The dance after the goal", "Samba on the touchline", "Left-wing turbo lane", "Sends full-backs to Ohio"],
      price: "25.6M", pull: 0.13, anim: "aura",
      back: {
        theme: "Aura Farming", c1: "#ffd400", c2: "#0b0b0b",
        pattern: "speed", motto: "Catch me? Cute.",
        serial: "MEME-A04/08", sign: "Vini 7"
      }
    }),

    MA({
      id: "ma-dybala", name: "DYBALA", full: "Paulo Bruno Exequiel Dybala",
      pos: "CF", alt: ["CAM", "RW"], nation: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7",
      club: "Roma", era: "MEME 2026", foot: "Left", weak: 4, skills: 5,
      height: 177, weight: 75, age: 32, wr: "Med / Low",
      main: { PAC: 90, SHO: 95, PAS: 94, DRI: 97, DEF: 42, PHY: 78 },
      sub: {
        acceleration: 91, sprint: 88, positioning: 94, finishing: 96,
        shotPower: 90, longShots: 95, volleys: 90, penalties: 92,
        vision: 95, crossing: 88, fkAccuracy: 94, shortPass: 95,
        longPass: 88, curve: 96, agility: 96, balance: 92,
        reactions: 94, ballControl: 97, dribbling: 97, composure: 95,
        interceptions: 38, heading: 66, defAwareness: 32, standTackle: 40,
        slideTackle: 34, jumping: 74, stamina: 80, strength: 72, aggression: 60
      },
      playstyles: ["Finesse Shot+", "Dead Ball+", "Technical+", "Chip Shot"],
      traits: ["La Joya mask celebration", "Top-corner finesse only", "Hamstring lore", "Free-kick artist"],
      price: "22.1M", pull: 0.17, anim: "delulu",
      back: {
        theme: "Delulu Joya", c1: "#7a0b1e", c2: "#e1122c",
        pattern: "silk", motto: "The mask goes on, the net goes in.",
        serial: "MEME-A05/08", sign: "PD 21"
      }
    }),

    MA({
      id: "ma-haaland", name: "HAALAND", full: "Erling Braut Haaland",
      pos: "ST", alt: ["CF"], nation: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4",
      club: "Manchester City", era: "MEME 2026", foot: "Left", weak: 4, skills: 3,
      height: 195, weight: 94, age: 25, wr: "High / Med",
      main: { PAC: 96, SHO: 99, PAS: 82, DRI: 92, DEF: 50, PHY: 99 },
      sub: {
        acceleration: 95, sprint: 97, positioning: 99, finishing: 99,
        shotPower: 98, longShots: 88, volleys: 92, penalties: 94,
        vision: 82, crossing: 68, fkAccuracy: 62, shortPass: 82,
        longPass: 76, curve: 78, agility: 86, balance: 90,
        reactions: 97, ballControl: 91, dribbling: 88, composure: 96,
        interceptions: 46, heading: 96, defAwareness: 40, standTackle: 48,
        slideTackle: 42, jumping: 97, stamina: 90, strength: 99, aggression: 92
      },
      playstyles: ["Power Shot+", "Aerial+", "Power Header+", "Acrobatic"],
      traits: ["Zen meditation celebration", "Goal-per-game NPC settings", "Cyborg physique", "Left foot = cannon"],
      price: "27.4M", pull: 0.11, anim: "goated",
      back: {
        theme: "Goated Cyborg", c1: "#ff8a00", c2: "#3a1f0b",
        pattern: "shield", motto: "Statistically unfair, officially legal.",
        serial: "MEME-A06/08", sign: "EBH 9"
      }
    }),

    MA({
      id: "ma-mbappe", name: "MBAPP\u00c9", full: "Kylian Mbapp\u00e9 Lottin",
      pos: "ST", alt: ["LW", "RW"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 4, skills: 5,
      height: 178, weight: 75, age: 27, wr: "High / Low",
      main: { PAC: 99, SHO: 96, PAS: 90, DRI: 98, DEF: 40, PHY: 88 },
      sub: {
        acceleration: 99, sprint: 99, positioning: 96, finishing: 96,
        shotPower: 93, longShots: 89, volleys: 88, penalties: 90,
        vision: 90, crossing: 84, fkAccuracy: 74, shortPass: 90,
        longPass: 82, curve: 88, agility: 97, balance: 94,
        reactions: 97, ballControl: 97, dribbling: 98, composure: 94,
        interceptions: 36, heading: 76, defAwareness: 30, standTackle: 38,
        slideTackle: 32, jumping: 88, stamina: 90, strength: 80, aggression: 66
      },
      playstyles: ["Rapid+", "Finesse Shot+", "Quick Step+", "Trickster"],
      traits: ["Arms-crossed pose", "36 km/h and rising", "Turbo button permanently held", "Donatello arc"],
      price: "28.6M", pull: 0.10, anim: "sheesh",
      back: {
        theme: "Sheesh Turbo", c1: "#0b1f4d", c2: "#3b82f6",
        pattern: "speed", motto: "Blink and I already scored.",
        serial: "MEME-A07/08", sign: "KM 10"
      }
    }),

    MA({
      id: "ma-ramos", name: "RAMOS", full: "Sergio Ramos Garc\u00eda",
      pos: "CB", alt: ["CDM", "RB"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 3, skills: 3,
      height: 184, weight: 82, age: 34, wr: "Med / High",
      main: { PAC: 86, SHO: 78, PAS: 82, DRI: 84, DEF: 99, PHY: 97 },
      sub: {
        acceleration: 84, sprint: 88, positioning: 74, finishing: 72,
        shotPower: 86, longShots: 70, volleys: 68, penalties: 82,
        vision: 80, crossing: 74, fkAccuracy: 72, shortPass: 84,
        longPass: 82, curve: 74, agility: 82, balance: 88,
        reactions: 93, ballControl: 84, dribbling: 80, composure: 92,
        interceptions: 96, heading: 96, defAwareness: 99, standTackle: 98,
        slideTackle: 96, jumping: 95, stamina: 92, strength: 96, aggression: 99
      },
      playstyles: ["Aerial+", "Bruiser+", "Anticipate+", "Block"],
      traits: ["Red-card collector", "93:20 header", "Shirt-pull specialist", "Wins it, then fights about it"],
      price: "21.8M", pull: 0.18, anim: "npc",
      back: {
        theme: "Final Boss NPC", c1: "#e1122c", c2: "#ff8a00",
        pattern: "chevron", motto: "Referee, we meet again.",
        serial: "MEME-A08/08", sign: "SR4"
      }
    }),

    /* ================================================================== *
     * TYPE B — MEME ICON · 96 OVR · the friendly pulls (stats read off the
     * sheet artwork itself)
     * ================================================================== */

    MB({
      id: "mb-jackson", name: "N. JACKSON", full: "Nicolas Jackson",
      pos: "ST", alt: ["CF"], nation: "Senegal", flag: "\uD83C\uDDF8\uD83C\uDDF3",
      club: "Chelsea", era: "MEME 2026", foot: "Right", weak: 3, skills: 4,
      height: 185, weight: 79, age: 24, wr: "High / Med",
      main: { PAC: 97, SHO: 95, PAS: 86, DRI: 94, DEF: 45, PHY: 92 },
      sub: {
        acceleration: 97, sprint: 97, positioning: 94, finishing: 95,
        shotPower: 93, longShots: 87, volleys: 88, penalties: 85,
        vision: 85, crossing: 81, fkAccuracy: 74, shortPass: 87,
        longPass: 79, curve: 83, agility: 93, balance: 91,
        reactions: 94, ballControl: 94, dribbling: 94, composure: 87,
        interceptions: 41, heading: 87, defAwareness: 35, standTackle: 43,
        slideTackle: 37, jumping: 90, stamina: 92, strength: 90, aggression: 79
      },
      playstyles: ["Rapid+", "Power Shot", "Relentless", "Acrobatic"],
      traits: ["Runs before the pass arrives", "Linesman's favourite", "Fearless in the six-yard box", "Chaos striker"],
      price: "9.4M", pull: 1.5, anim: "bussin",
      back: {
        theme: "Bussin Finisher", c1: "#ffcf40", c2: "#0b0b0b",
        pattern: "grid", motto: "Ball first, offside flag later.",
        serial: "MEME-B01/08", sign: "NJ 15"
      }
    }),

    MB({
      id: "mb-antony", name: "ANTONY", full: "Antony Matheus dos Santos",
      pos: "RW", alt: ["LW"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Manchester United", era: "MEME 2026", foot: "Left", weak: 3, skills: 5,
      height: 174, weight: 63, age: 25, wr: "Med / Low",
      main: { PAC: 97, SHO: 93, PAS: 92, DRI: 97, DEF: 55, PHY: 91 },
      sub: {
        acceleration: 98, sprint: 95, positioning: 90, finishing: 91,
        shotPower: 89, longShots: 90, volleys: 84, penalties: 82,
        vision: 92, crossing: 91, fkAccuracy: 84, shortPass: 92,
        longPass: 85, curve: 93, agility: 97, balance: 95,
        reactions: 93, ballControl: 97, dribbling: 97, composure: 86,
        interceptions: 52, heading: 66, defAwareness: 45, standTackle: 55,
        slideTackle: 48, jumping: 76, stamina: 91, strength: 76, aggression: 68
      },
      playstyles: ["Trickster+", "Flair+", "Technical", "Whipped Pass"],
      traits: ["One spin, one meme", "Only knows left foot", "Highlight reel merchant", "Crowd-pleaser"],
      price: "8.8M", pull: 1.6, anim: "skibidi",
      back: {
        theme: "Skibidi Spin", c1: "#14b85a", c2: "#0b0b0b",
        pattern: "waves", motto: "Spin cycle: infinite.",
        serial: "MEME-B02/08", sign: "A21"
      }
    }),

    MB({
      id: "mb-mbappe", name: "MBAPP\u00c9", full: "Kylian Mbapp\u00e9 Lottin",
      pos: "ST", alt: ["LW"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 4, skills: 5,
      height: 178, weight: 75, age: 27, wr: "High / Low",
      main: { PAC: 99, SHO: 94, PAS: 88, DRI: 97, DEF: 40, PHY: 85 },
      sub: {
        acceleration: 99, sprint: 99, positioning: 94, finishing: 94,
        shotPower: 91, longShots: 87, volleys: 85, penalties: 88,
        vision: 88, crossing: 82, fkAccuracy: 72, shortPass: 88,
        longPass: 80, curve: 86, agility: 96, balance: 92,
        reactions: 95, ballControl: 96, dribbling: 97, composure: 92,
        interceptions: 36, heading: 74, defAwareness: 30, standTackle: 38,
        slideTackle: 32, jumping: 86, stamina: 88, strength: 78, aggression: 64
      },
      playstyles: ["Rapid+", "Quick Step+", "Finesse Shot", "First Touch"],
      traits: ["Arms crossed, job done", "Fastest man in the lobby", "Turbo sprint lore", "Cold finisher"],
      price: "11.2M", pull: 1.2, anim: "gyatt",
      back: {
        theme: "Gyatt Speed", c1: "#8b5cf6", c2: "#2563eb",
        pattern: "speed", motto: "Zero to net in three touches.",
        serial: "MEME-B03/08", sign: "KM 10"
      }
    }),

    MB({
      id: "mb-haaland", name: "HAALAND", full: "Erling Braut Haaland",
      pos: "ST", alt: ["CF"], nation: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4",
      club: "Manchester City", era: "MEME 2026", foot: "Left", weak: 3, skills: 3,
      height: 195, weight: 94, age: 25, wr: "High / Med",
      main: { PAC: 97, SHO: 97, PAS: 80, DRI: 92, DEF: 50, PHY: 98 },
      sub: {
        acceleration: 95, sprint: 97, positioning: 98, finishing: 98,
        shotPower: 96, longShots: 85, volleys: 90, penalties: 92,
        vision: 80, crossing: 65, fkAccuracy: 60, shortPass: 80,
        longPass: 74, curve: 75, agility: 85, balance: 89,
        reactions: 96, ballControl: 90, dribbling: 88, composure: 94,
        interceptions: 46, heading: 95, defAwareness: 40, standTackle: 48,
        slideTackle: 42, jumping: 96, stamina: 88, strength: 98, aggression: 90
      },
      playstyles: ["Power Shot+", "Aerial+", "Power Header", "Bruiser"],
      traits: ["Meditation pose", "Header machine", "Built in a lab", "Left-foot rocket"],
      price: "12.6M", pull: 1.1, anim: "cooked",
      back: {
        theme: "You're Cooked", c1: "#1e6bff", c2: "#eaf2ff",
        pattern: "shield", motto: "Defenders: cooked. Every time.",
        serial: "MEME-B04/08", sign: "EBH 9"
      }
    }),

    MB({
      id: "mb-bellingham", name: "BELLINGHAM", full: "Jude Victor William Bellingham",
      pos: "CAM", alt: ["CM"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Real Madrid", era: "MEME 2026", foot: "Right", weak: 4, skills: 4,
      height: 186, weight: 75, age: 22, wr: "High / High",
      main: { PAC: 92, SHO: 90, PAS: 94, DRI: 96, DEF: 90, PHY: 91 },
      sub: {
        acceleration: 91, sprint: 92, positioning: 91, finishing: 89,
        shotPower: 91, longShots: 87, volleys: 85, penalties: 84,
        vision: 94, crossing: 86, fkAccuracy: 81, shortPass: 94,
        longPass: 91, curve: 85, agility: 92, balance: 94,
        reactions: 96, ballControl: 95, dribbling: 94, composure: 95,
        interceptions: 89, heading: 87, defAwareness: 86, standTackle: 90,
        slideTackle: 85, jumping: 88, stamina: 95, strength: 90, aggression: 88
      },
      playstyles: ["Relentless+", "Press Proven+", "Technical", "Long Ball Pass"],
      traits: ["Hey Jude chant", "Runs box to box all night", "Arms-wide celebration", "Big-game brain"],
      price: "12.1M", pull: 1.15, anim: "mogged",
      back: {
        theme: "Mogged Midfield", c1: "#f0c14b", c2: "#101010",
        pattern: "rays", motto: "I cover the pitch you forgot about.",
        serial: "MEME-B05/08", sign: "Jude 5"
      }
    }),

    MB({
      id: "mb-ronaldo", name: "RONALDO", full: "Cristiano Ronaldo dos Santos Aveiro",
      pos: "ST", alt: ["LW", "CF"], nation: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9",
      club: "Al Nassr", era: "MEME 2026", foot: "Right", weak: 4, skills: 5,
      height: 187, weight: 84, age: 41, wr: "High / Low",
      main: { PAC: 94, SHO: 98, PAS: 88, DRI: 95, DEF: 45, PHY: 90 },
      sub: {
        acceleration: 92, sprint: 95, positioning: 98, finishing: 98,
        shotPower: 97, longShots: 94, volleys: 93, penalties: 92,
        vision: 87, crossing: 84, fkAccuracy: 88, shortPass: 88,
        longPass: 81, curve: 89, agility: 92, balance: 89,
        reactions: 96, ballControl: 95, dribbling: 94, composure: 97,
        interceptions: 38, heading: 95, defAwareness: 32, standTackle: 40,
        slideTackle: 34, jumping: 96, stamina: 89, strength: 89, aggression: 76
      },
      playstyles: ["Power Shot+", "Power Header+", "Aerial", "Dead Ball"],
      traits: ["SIUUU on demand", "Calma calma", "Still jumping higher than you", "Penalty-box gravity"],
      price: "13.8M", pull: 1.0, anim: "siuupink",
      back: {
        theme: "Siuu Neon", c1: "#ff2fb9", c2: "#6d28d9",
        pattern: "burst", motto: "SIUUU is a full sentence.",
        serial: "MEME-B06/08", sign: "CR7"
      }
    }),

    MB({
      id: "mb-suarez", name: "SU\u00c1REZ", full: "Luis Alberto Su\u00e1rez D\u00edaz",
      pos: "ST", alt: ["CF"], nation: "Uruguay", flag: "\uD83C\uDDFA\uD83C\uDDFE",
      club: "Inter Miami", era: "MEME 2026", foot: "Right", weak: 4, skills: 4,
      height: 182, weight: 86, age: 39, wr: "High / Med",
      main: { PAC: 92, SHO: 95, PAS: 90, DRI: 93, DEF: 55, PHY: 90 },
      sub: {
        acceleration: 90, sprint: 92, positioning: 96, finishing: 96,
        shotPower: 93, longShots: 88, volleys: 90, penalties: 90,
        vision: 90, crossing: 84, fkAccuracy: 84, shortPass: 90,
        longPass: 85, curve: 86, agility: 89, balance: 90,
        reactions: 95, ballControl: 93, dribbling: 92, composure: 92,
        interceptions: 52, heading: 90, defAwareness: 44, standTackle: 54,
        slideTackle: 48, jumping: 86, stamina: 88, strength: 89, aggression: 94
      },
      playstyles: ["Finesse Shot+", "First Touch+", "Bruiser", "Chip Shot"],
      traits: ["The bite heard worldwide", "Hand of Uruguay", "Villain arc complete", "Scores from nothing"],
      price: "10.4M", pull: 1.3, anim: "cap",
      back: {
        theme: "No Cap Bite", c1: "#e8b64c", c2: "#0b0b0b",
        pattern: "diagonal", motto: "I only bite in big games.",
        serial: "MEME-B07/08", sign: "LS9"
      }
    }),

    MB({
      id: "mb-vandijk", name: "VAN DIJK", full: "Virgil van Dijk",
      pos: "CB", alt: ["CDM"], nation: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1",
      club: "Liverpool", era: "MEME 2026", foot: "Right", weak: 3, skills: 2,
      height: 195, weight: 92, age: 34, wr: "Med / High",
      main: { PAC: 88, SHO: 70, PAS: 80, DRI: 85, DEF: 98, PHY: 96 },
      sub: {
        acceleration: 85, sprint: 90, positioning: 62, finishing: 64,
        shotPower: 84, longShots: 60, volleys: 55, penalties: 62,
        vision: 78, crossing: 66, fkAccuracy: 58, shortPass: 84,
        longPass: 82, curve: 66, agility: 80, balance: 90,
        reactions: 92, ballControl: 85, dribbling: 82, composure: 96,
        interceptions: 95, heading: 95, defAwareness: 98, standTackle: 97,
        slideTackle: 90, jumping: 96, stamina: 88, strength: 96, aggression: 86
      },
      playstyles: ["Anticipate+", "Aerial+", "Jockey+", "Long Ball Pass"],
      traits: ["Never sprints, never needs to", "Walks strikers out of the game", "Header from another postcode", "Calm under everything"],
      price: "9.8M", pull: 1.4, anim: "mid",
      back: {
        theme: "Certified Not Mid", c1: "#0b3b8c", c2: "#0b0b0b",
        pattern: "stripes", motto: "You shall not pass. Literally.",
        serial: "MEME-B08/08", sign: "VVD 4"
      }
    })
  ];

  /* -------- merge into the shared database (same array reference) -------- */
  MEME.forEach(function (c) {
    if (DB.byId[c.id]) { return; }
    DB.all.push(c);
    DB.byId[c.id] = c;
  });
  DB.count = DB.all.length;

  /* refresh the position index now that the meme set joined the pool */
  DB.positions = (function () {
    var s = [];
    DB.all.forEach(function (c) {
      if (s.indexOf(c.pos) === -1) { s.push(c.pos); }
    });
    return s;
  })();

  /* set-aware helpers used by the collection / pack screens */
  DB.meme = MEME;
  DB.memeA = MEME.filter(function (c) { return c.tier === "A"; });
  DB.memeB = MEME.filter(function (c) { return c.tier === "B"; });

  window.MVM_MEME = MEME;
})();
