/* ============================================================================
 * MVMPACK 26 — WORLD CUP HEROES CARD SET (98 OVR)
 * ----------------------------------------------------------------------------
 * 18 cards sliced from the uploaded "World Cup Heroes" artwork (assets/wc/*.png).
 * Each card carries:
 *   • its own main stats + full sub-attribute sheet (29 outfield / 21 GK)
 *   • its own playstyles, traits, physical profile, price and pull rate
 *   • its own BACK design (colours, pattern, motto, serial, signature)
 *   • its own FRONT ANIMATION (`anim` → .wcfx--<anim> in cards.css)
 * Ids are prefixed with "wc-" so they never clash with the ICON set.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  if (!DB) { return; }

  /* helper: outfield World Cup hero ---------------------------------------- */
  function W(o) {
    o.ovr = 98;
    o.type = "wc";
    o.rarity = "WC HERO";
    o.set = "World Cup Heroes";
    o.art = "assets/wc/" + o.id.replace(/^wc-/, "") + ".png";
    o.gk = false;
    return o;
  }
  /* helper: goalkeeper World Cup hero -------------------------------------- */
  function WG(o) {
    o.ovr = 98;
    o.type = "wc";
    o.rarity = "WC HERO";
    o.set = "World Cup Heroes";
    o.art = "assets/wc/" + o.id.replace(/^wc-/, "") + ".png";
    o.gk = true;
    return o;
  }

  var WC = [

    /* ==================== ROW 1 — THE IMMORTALS ======================== */
    W({
      id: "wc-ronaldo", name: "RONALDO", full: "Cristiano Ronaldo dos Santos Aveiro",
      pos: "ST", alt: ["LW", "CF"], nation: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9",
      club: "Portugal NT", era: "World Cup 2018", foot: "Right", weak: 4, skills: 5,
      height: 187, weight: 84, age: 33, wr: "High / Low",
      main: { PAC: 92, SHO: 98, PAS: 83, DRI: 89, DEF: 38, PHY: 89 },
      sub: {
        acceleration: 89, sprint: 94, positioning: 98, finishing: 97,
        shotPower: 98, longShots: 93, volleys: 93, penalties: 92,
        vision: 83, crossing: 81, fkAccuracy: 90, shortPass: 83,
        longPass: 77, curve: 87, agility: 87, balance: 83,
        reactions: 96, ballControl: 91, dribbling: 88, composure: 97,
        interceptions: 30, heading: 95, defAwareness: 26, standTackle: 31,
        slideTackle: 25, jumping: 98, stamina: 89, strength: 88, aggression: 75
      },
      playstyles: ["Power Shot+", "Power Header+", "Aerial+", "Dead Ball"],
      traits: ["Hat-trick vs Spain", "Siuuu celebration", "5 World Cups played", "Knuckleball"],
      price: "18.4M", pull: 0.25, anim: "siuu",
      back: {
        theme: "Siuuu Nation", c1: "#e8112d", c2: "#ffd400",
        pattern: "burst", motto: "Five World Cups, one obsession.",
        serial: "WCH-01/18", sign: "CR7"
      }
    }),

    W({
      id: "wc-messi", name: "MESSI", full: "Lionel Andr\u00e9s Messi",
      pos: "CF", alt: ["CAM", "RW"], nation: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7",
      club: "Argentina NT", era: "World Cup 2022", foot: "Left", weak: 4, skills: 5,
      height: 170, weight: 72, age: 35, wr: "Med / Low",
      main: { PAC: 88, SHO: 94, PAS: 97, DRI: 98, DEF: 36, PHY: 70 },
      sub: {
        acceleration: 92, sprint: 84, positioning: 95, finishing: 96,
        shotPower: 89, longShots: 91, volleys: 87, penalties: 94,
        vision: 99, crossing: 89, fkAccuracy: 95, shortPass: 98,
        longPass: 93, curve: 96, agility: 97, balance: 96,
        reactions: 98, ballControl: 99, dribbling: 98, composure: 99,
        interceptions: 38, heading: 70, defAwareness: 28, standTackle: 34,
        slideTackle: 26, jumping: 68, stamina: 80, strength: 70, aggression: 46
      },
      playstyles: ["Incisive Pass+", "Technical+", "Finesse Shot+", "Trickster+"],
      traits: ["Lusail champion", "Golden Ball \u00d72", "The walk before the storm", "Left-foot chip"],
      price: "19.6M", pull: 0.25, anim: "cosmic",
      back: {
        theme: "La Tercera", c1: "#75aadb", c2: "#ffffff",
        pattern: "halo", motto: "The trophy was always coming home with me.",
        serial: "WCH-02/18", sign: "Leo \u00b7 2022"
      }
    }),

    W({
      id: "wc-maradona", name: "MARADONA", full: "Diego Armando Maradona",
      pos: "CAM", alt: ["CF", "LW"], nation: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7",
      club: "Argentina NT", era: "World Cup 1986", foot: "Left", weak: 3, skills: 5,
      height: 165, weight: 68, age: 25, wr: "High / Low",
      main: { PAC: 91, SHO: 91, PAS: 95, DRI: 98, DEF: 44, PHY: 76 },
      sub: {
        acceleration: 95, sprint: 87, positioning: 91, finishing: 91,
        shotPower: 90, longShots: 89, volleys: 86, penalties: 91,
        vision: 97, crossing: 89, fkAccuracy: 96, shortPass: 95,
        longPass: 91, curve: 95, agility: 98, balance: 99,
        reactions: 96, ballControl: 98, dribbling: 98, composure: 95,
        interceptions: 42, heading: 78, defAwareness: 36, standTackle: 40,
        slideTackle: 38, jumping: 80, stamina: 89, strength: 76, aggression: 80
      },
      playstyles: ["Trickster+", "Technical+", "Dead Ball+", "Press Proven"],
      traits: ["Goal of the Century", "Hand of God", "Beat five Englishmen", "Carried a nation"],
      price: "17.8M", pull: 0.3, anim: "handofgod",
      back: {
        theme: "M\u00e9xico \u002786", c1: "#5bc8ff", c2: "#f4f7ff",
        pattern: "stripes", motto: "Barrilete c\u00f3smico \u2014 sixty metres, five men, one nation.",
        serial: "WCH-03/18", sign: "D10S \u00b7 86"
      }
    }),

    W({
      id: "wc-ronaldo9", name: "RONALDO", full: "Ronaldo Lu\u00eds Naz\u00e1rio de Lima",
      pos: "ST", alt: ["CF", "RW"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Brazil NT", era: "World Cup 2002", foot: "Right", weak: 4, skills: 5,
      height: 183, weight: 82, age: 25, wr: "High / Low",
      main: { PAC: 97, SHO: 97, PAS: 80, DRI: 95, DEF: 34, PHY: 85 },
      sub: {
        acceleration: 98, sprint: 96, positioning: 97, finishing: 98,
        shotPower: 94, longShots: 85, volleys: 87, penalties: 90,
        vision: 81, crossing: 74, fkAccuracy: 76, shortPass: 81,
        longPass: 72, curve: 83, agility: 95, balance: 93,
        reactions: 97, ballControl: 95, dribbling: 96, composure: 95,
        interceptions: 28, heading: 83, defAwareness: 24, standTackle: 28,
        slideTackle: 24, jumping: 87, stamina: 82, strength: 88, aggression: 68
      },
      playstyles: ["Rapid+", "Quick Step+", "Power Shot+", "Trickster"],
      traits: ["8 goals in Korea/Japan", "The haircut", "Toe-poke finish", "O Fen\u00f4meno reborn"],
      price: "16.9M", pull: 0.3, anim: "phenom",
      back: {
        theme: "Penta 2002", c1: "#ffe100", c2: "#009c3b",
        pattern: "speed", motto: "Two knees rebuilt, one Golden Boot.",
        serial: "WCH-04/18", sign: "R9 \u00b7 2002"
      }
    }),

    W({
      id: "wc-mbappe", name: "MBAPP\u00c9", full: "Kylian Mbapp\u00e9 Lottin",
      pos: "LW", alt: ["ST", "RW"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "France NT", era: "World Cup 2022", foot: "Right", weak: 4, skills: 5,
      height: 178, weight: 75, age: 23, wr: "High / Low",
      main: { PAC: 99, SHO: 94, PAS: 82, DRI: 95, DEF: 36, PHY: 82 },
      sub: {
        acceleration: 99, sprint: 99, positioning: 94, finishing: 95,
        shotPower: 93, longShots: 86, volleys: 85, penalties: 93,
        vision: 83, crossing: 80, fkAccuracy: 74, shortPass: 84,
        longPass: 76, curve: 84, agility: 94, balance: 90,
        reactions: 95, ballControl: 93, dribbling: 95, composure: 92,
        interceptions: 32, heading: 74, defAwareness: 26, standTackle: 32,
        slideTackle: 28, jumping: 86, stamina: 88, strength: 78, aggression: 66
      },
      playstyles: ["Rapid+", "Quick Step+", "Trivela", "Power Shot"],
      traits: ["Final hat-trick", "36 km/h top speed", "Arms-crossed pose", "Youngest to 12 WC goals"],
      price: "15.4M", pull: 0.35, anim: "turbo",
      back: {
        theme: "Turbo Kylian", c1: "#00f2ff", c2: "#0a3b8c",
        pattern: "chevron", motto: "Speed is a decision, not a gift.",
        serial: "WCH-05/18", sign: "KM \u00b7 10"
      }
    }),

    W({
      id: "wc-zidane", name: "ZIDANE", full: "Zin\u00e9dine Yazid Zidane",
      pos: "CAM", alt: ["CM", "CF"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "France NT", era: "World Cup 1998", foot: "Right", weak: 4, skills: 5,
      height: 185, weight: 80, age: 26, wr: "Med / Med",
      main: { PAC: 83, SHO: 88, PAS: 96, DRI: 97, DEF: 64, PHY: 86 },
      sub: {
        acceleration: 81, sprint: 83, positioning: 85, finishing: 87,
        shotPower: 91, longShots: 88, volleys: 94, penalties: 90,
        vision: 97, crossing: 87, fkAccuracy: 85, shortPass: 97,
        longPass: 94, curve: 87, agility: 94, balance: 97,
        reactions: 95, ballControl: 98, dribbling: 96, composure: 96,
        interceptions: 64, heading: 93, defAwareness: 58, standTackle: 64,
        slideTackle: 56, jumping: 89, stamina: 88, strength: 87, aggression: 74
      },
      playstyles: ["Technical+", "First Touch+", "Press Proven+", "Acrobatic"],
      traits: ["Two headers in the final", "Roulette turn", "Ice in the storm", "Saint-Denis night"],
      price: "14.7M", pull: 0.4, anim: "roulette",
      back: {
        theme: "Saint-Denis \u002798", c1: "#b026ff", c2: "#e8ecf5",
        pattern: "silk", motto: "Turn once \u2014 the whole stadium turns with you.",
        serial: "WCH-06/18", sign: "Zizou \u00b7 10"
      }
    }),

    /* =============== ROW 2 — MODERN HEROES & MIDFIELD ================== */
    W({
      id: "wc-yamal", name: "YAMAL", full: "Lamine Yamal Nasraoui Ebana",
      pos: "RW", alt: ["LW", "CAM"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Spain NT", era: "New generation", foot: "Left", weak: 3, skills: 5,
      height: 180, weight: 72, age: 18, wr: "High / Med",
      main: { PAC: 94, SHO: 88, PAS: 92, DRI: 97, DEF: 42, PHY: 72 },
      sub: {
        acceleration: 96, sprint: 92, positioning: 87, finishing: 88,
        shotPower: 85, longShots: 87, volleys: 80, penalties: 82,
        vision: 93, crossing: 90, fkAccuracy: 84, shortPass: 93,
        longPass: 86, curve: 93, agility: 97, balance: 93,
        reactions: 93, ballControl: 97, dribbling: 98, composure: 90,
        interceptions: 40, heading: 66, defAwareness: 34, standTackle: 38,
        slideTackle: 32, jumping: 74, stamina: 87, strength: 70, aggression: 58
      },
      playstyles: ["Trickster+", "Technical+", "Whipped Pass+", "Flair"],
      traits: ["Youngest to shine", "Left-foot curler", "304 celebration", "Fearless at 18"],
      price: "13.2M", pull: 0.45, anim: "nextgen",
      back: {
        theme: "Next Gen 304", c1: "#ff2d55", c2: "#ffd400",
        pattern: "grid", motto: "Age is just a number on the shirt.",
        serial: "WCH-07/18", sign: "Lamine 19"
      }
    }),

    W({
      id: "wc-bellingham", name: "BELLINGHAM", full: "Jude Victor William Bellingham",
      pos: "CM", alt: ["CAM", "CDM"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "England NT", era: "World Cup 2022", foot: "Right", weak: 4, skills: 4,
      height: 186, weight: 75, age: 19, wr: "High / High",
      main: { PAC: 88, SHO: 89, PAS: 90, DRI: 92, DEF: 80, PHY: 90 },
      sub: {
        acceleration: 87, sprint: 89, positioning: 86, finishing: 88,
        shotPower: 92, longShots: 87, volleys: 82, penalties: 84,
        vision: 90, crossing: 84, fkAccuracy: 76, shortPass: 91,
        longPass: 88, curve: 82, agility: 89, balance: 90,
        reactions: 92, ballControl: 92, dribbling: 91, composure: 92,
        interceptions: 84, heading: 86, defAwareness: 78, standTackle: 82,
        slideTackle: 78, jumping: 88, stamina: 95, strength: 87, aggression: 88
      },
      playstyles: ["Relentless+", "Press Proven+", "Power Shot+", "Long Ball Pass"],
      traits: ["Box-to-box engine", "Hey Jude arms", "Header vs Iran", "Leader at 19"],
      price: "12.6M", pull: 0.5, anim: "heyjude",
      back: {
        theme: "Hey Jude", c1: "#ffffff", c2: "#1a4fd6",
        pattern: "shield", motto: "Run until the whistle argues with you.",
        serial: "WCH-08/18", sign: "Jude 22"
      }
    }),

    W({
      id: "wc-neymar", name: "NEYMAR", full: "Neymar da Silva Santos J\u00fanior",
      pos: "LW", alt: ["CAM", "CF"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Brazil NT", era: "World Cup 2022", foot: "Right", weak: 5, skills: 5,
      height: 175, weight: 68, age: 30, wr: "High / Low",
      main: { PAC: 91, SHO: 89, PAS: 91, DRI: 97, DEF: 38, PHY: 68 },
      sub: {
        acceleration: 94, sprint: 88, positioning: 88, finishing: 89,
        shotPower: 87, longShots: 85, volleys: 84, penalties: 92,
        vision: 92, crossing: 87, fkAccuracy: 89, shortPass: 92,
        longPass: 84, curve: 92, agility: 97, balance: 92,
        reactions: 93, ballControl: 97, dribbling: 98, composure: 90,
        interceptions: 34, heading: 66, defAwareness: 28, standTackle: 32,
        slideTackle: 30, jumping: 76, stamina: 82, strength: 64, aggression: 60
      },
      playstyles: ["Trickster+", "Flair+", "Technical+", "Rapid"],
      traits: ["Rainbow flick", "Solo goal vs Croatia", "Joga bonito heir", "Samba feet"],
      price: "12.9M", pull: 0.5, anim: "samba",
      back: {
        theme: "Samba Flow", c1: "#00ff9d", c2: "#ffe100",
        pattern: "waves", motto: "Dance first, score second.",
        serial: "WCH-09/18", sign: "Ney \u00b7 10"
      }
    }),

    W({
      id: "wc-klose", name: "KLOSE", full: "Miroslav Josef Klose",
      pos: "ST", alt: ["CF"], nation: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA",
      club: "Germany NT", era: "World Cup 2002\u20132014", foot: "Right", weak: 4, skills: 3,
      height: 182, weight: 76, age: 32, wr: "High / Med",
      main: { PAC: 84, SHO: 94, PAS: 80, DRI: 84, DEF: 44, PHY: 88 },
      sub: {
        acceleration: 82, sprint: 85, positioning: 98, finishing: 95,
        shotPower: 90, longShots: 80, volleys: 92, penalties: 84,
        vision: 82, crossing: 76, fkAccuracy: 68, shortPass: 82,
        longPass: 74, curve: 74, agility: 84, balance: 86,
        reactions: 96, ballControl: 86, dribbling: 82, composure: 94,
        interceptions: 44, heading: 97, defAwareness: 38, standTackle: 44,
        slideTackle: 40, jumping: 95, stamina: 90, strength: 88, aggression: 78
      },
      playstyles: ["Power Header+", "Aerial+", "Acrobatic+", "Finesse Shot"],
      traits: ["16 World Cup goals", "The somersault", "Header specialist", "All-time WC top scorer"],
      price: "11.4M", pull: 0.6, anim: "salto",
      back: {
        theme: "Salto Record", c1: "#111318", c2: "#ffcc00",
        pattern: "stripes", motto: "Sixteen goals, one somersault each.",
        serial: "WCH-10/18", sign: "Miro 11"
      }
    }),

    W({
      id: "wc-modric", name: "MODRI\u0106", full: "Luka Modri\u0107",
      pos: "CM", alt: ["CAM", "CDM"], nation: "Croatia", flag: "\uD83C\uDDED\uD83C\uDDF7",
      club: "Croatia NT", era: "World Cup 2018", foot: "Right", weak: 4, skills: 4,
      height: 172, weight: 66, age: 32, wr: "High / High",
      main: { PAC: 78, SHO: 84, PAS: 97, DRI: 94, DEF: 76, PHY: 72 },
      sub: {
        acceleration: 79, sprint: 77, positioning: 80, finishing: 84,
        shotPower: 88, longShots: 90, volleys: 82, penalties: 80,
        vision: 97, crossing: 89, fkAccuracy: 88, shortPass: 97,
        longPass: 96, curve: 92, agility: 94, balance: 92,
        reactions: 94, ballControl: 96, dribbling: 94, composure: 96,
        interceptions: 82, heading: 60, defAwareness: 76, standTackle: 80,
        slideTackle: 72, jumping: 62, stamina: 96, strength: 66, aggression: 80
      },
      playstyles: ["Pinged Pass+", "Incisive Pass+", "Relentless+", "Trivela"],
      traits: ["Golden Ball 2018", "Outside-boot pass", "Runs 14 km a game", "Metronome of Croatia"],
      price: "11.8M", pull: 0.6, anim: "orbit",
      back: {
        theme: "Vatreni Maestro", c1: "#ff3b3b", c2: "#ffffff",
        pattern: "grid", motto: "The pitch is a chessboard; I move first.",
        serial: "WCH-11/18", sign: "Luka 10"
      }
    }),

    W({
      id: "wc-cannavaro", name: "CANNAVARO", full: "Fabio Cannavaro",
      pos: "CB", alt: ["CDM"], nation: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9",
      club: "Italy NT", era: "World Cup 2006", foot: "Right", weak: 3, skills: 3,
      height: 176, weight: 76, age: 32, wr: "Med / High",
      main: { PAC: 86, SHO: 52, PAS: 76, DRI: 78, DEF: 97, PHY: 90 },
      sub: {
        acceleration: 87, sprint: 85, positioning: 46, finishing: 44,
        shotPower: 68, longShots: 52, volleys: 40, penalties: 50,
        vision: 76, crossing: 68, fkAccuracy: 54, shortPass: 82,
        longPass: 76, curve: 60, agility: 86, balance: 92,
        reactions: 96, ballControl: 82, dribbling: 76, composure: 97,
        interceptions: 97, heading: 92, defAwareness: 98, standTackle: 96,
        slideTackle: 94, jumping: 94, stamina: 92, strength: 88, aggression: 92
      },
      playstyles: ["Anticipate+", "Block+", "Jockey+", "Aerial"],
      traits: ["Berlin 2006 captain", "Ballon d'Or defender", "Jumps above giants", "Never beaten twice"],
      price: "10.6M", pull: 0.7, anim: "ironwall",
      back: {
        theme: "Berlino 2006", c1: "#0057b7", c2: "#e6eefc",
        pattern: "shield", motto: "Lift the cup on your birthday \u2014 then defend it.",
        serial: "WCH-12/18", sign: "Fabio 5"
      }
    }),

    /* ============ ROW 3 — KEEPER, WINGERS & FINISHERS ================== */
    WG({
      id: "wc-casillas", name: "CASILLAS", full: "Iker Casillas Fern\u00e1ndez",
      pos: "GK", alt: [], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Spain NT", era: "World Cup 2010", foot: "Right", weak: 3, skills: 1,
      height: 185, weight: 84, age: 29, wr: "Med / Med",
      main: { DIV: 95, HAN: 90, KIC: 80, REF: 98, SPD: 70, POS: 93 },
      sub: {
        diving: 95, handling: 90, kicking: 80, reflexes: 98,
        gkSpeed: 70, gkPositioning: 93, oneOnOne: 97, penaltySave: 94,
        crossClaim: 88, sweeperKeeper: 84, longThrow: 78, punching: 88,
        composure: 96, reactions: 98, aggression: 52, jumping: 90,
        strength: 82, stamina: 84, vision: 80, shortPass: 80, longPass: 78
      },
      playstyles: ["Quick Reflexes+", "1v1 Close Down+", "Footwork+", "Rush Out"],
      traits: ["San Iker", "Toe save vs Robben", "Captain of the champions", "Only one goal conceded in the knockouts"],
      price: "10.2M", pull: 0.7, anim: "saniker",
      back: {
        theme: "San Iker", c1: "#ffd400", c2: "#c60b1e",
        pattern: "web", motto: "One outstretched foot decided a World Cup.",
        serial: "WCH-13/18", sign: "Iker 1"
      }
    }),

    W({
      id: "wc-robben", name: "ROBBEN", full: "Arjen Robben",
      pos: "RW", alt: ["LW", "CF"], nation: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1",
      club: "Netherlands NT", era: "World Cup 2010\u20132014", foot: "Left", weak: 3, skills: 4,
      height: 180, weight: 80, age: 30, wr: "High / Low",
      main: { PAC: 96, SHO: 91, PAS: 84, DRI: 94, DEF: 40, PHY: 74 },
      sub: {
        acceleration: 96, sprint: 96, positioning: 90, finishing: 91,
        shotPower: 92, longShots: 90, volleys: 82, penalties: 84,
        vision: 86, crossing: 84, fkAccuracy: 82, shortPass: 86,
        longPass: 78, curve: 94, agility: 94, balance: 88,
        reactions: 93, ballControl: 94, dribbling: 95, composure: 90,
        interceptions: 36, heading: 66, defAwareness: 30, standTackle: 34,
        slideTackle: 30, jumping: 78, stamina: 86, strength: 74, aggression: 64
      },
      playstyles: ["Finesse Shot+", "Rapid+", "Trickster", "Quick Step"],
      traits: ["Cut inside, curl it", "Everyone knows it, nobody stops it", "Sprint vs Spain 2014", "Left-foot laser"],
      price: "9.8M", pull: 0.8, anim: "leftcut",
      back: {
        theme: "Cut Inside", c1: "#ff6a13", c2: "#0a2a6b",
        pattern: "diagonal", motto: "Right wing, left foot, same corner.",
        serial: "WCH-14/18", sign: "Arjen 11"
      }
    }),

    W({
      id: "wc-bergkamp", name: "BERGKAMP", full: "Dennis Nicolaas Maria Bergkamp",
      pos: "CF", alt: ["ST", "CAM"], nation: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1",
      club: "Netherlands NT", era: "World Cup 1998", foot: "Right", weak: 4, skills: 5,
      height: 183, weight: 78, age: 29, wr: "Med / Med",
      main: { PAC: 84, SHO: 92, PAS: 92, DRI: 95, DEF: 42, PHY: 76 },
      sub: {
        acceleration: 83, sprint: 84, positioning: 92, finishing: 94,
        shotPower: 89, longShots: 86, volleys: 90, penalties: 84,
        vision: 94, crossing: 86, fkAccuracy: 84, shortPass: 94,
        longPass: 88, curve: 90, agility: 92, balance: 90,
        reactions: 96, ballControl: 98, dribbling: 95, composure: 95,
        interceptions: 38, heading: 78, defAwareness: 32, standTackle: 36,
        slideTackle: 30, jumping: 80, stamina: 84, strength: 76, aggression: 62
      },
      playstyles: ["First Touch+", "Finesse Shot+", "Technical+", "Chip Shot"],
      traits: ["The touch vs Argentina", "Non-Flying Dutchman", "90th-minute genius", "Iceman finish"],
      price: "9.4M", pull: 0.8, anim: "iceman",
      back: {
        theme: "The Iceman", c1: "#8ee8ff", c2: "#ff6a13",
        pattern: "silk", motto: "One touch to kill it, one to score.",
        serial: "WCH-15/18", sign: "Dennis 8"
      }
    }),

    W({
      id: "wc-henry", name: "HENRY", full: "Thierry Daniel Henry",
      pos: "ST", alt: ["LW", "CF"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "France NT", era: "World Cup 1998\u20132006", foot: "Right", weak: 4, skills: 5,
      height: 188, weight: 83, age: 28, wr: "High / Med",
      main: { PAC: 96, SHO: 93, PAS: 87, DRI: 93, DEF: 42, PHY: 82 },
      sub: {
        acceleration: 96, sprint: 97, positioning: 93, finishing: 94,
        shotPower: 89, longShots: 87, volleys: 85, penalties: 82,
        vision: 89, crossing: 87, fkAccuracy: 86, shortPass: 88,
        longPass: 83, curve: 93, agility: 92, balance: 87,
        reactions: 93, ballControl: 93, dribbling: 93, composure: 95,
        interceptions: 38, heading: 76, defAwareness: 32, standTackle: 40,
        slideTackle: 36, jumping: 85, stamina: 91, strength: 82, aggression: 66
      },
      playstyles: ["Finesse Shot+", "Rapid+", "Chip Shot+", "Flair"],
      traits: ["1998 world champion", "Left-channel glide", "Side-foot into the corner", "Va-va-voom"],
      price: "9.9M", pull: 0.8, anim: "glide",
      back: {
        theme: "Va-Va-Voom", c1: "#0a3b8c", c2: "#ffffff",
        pattern: "rays", motto: "Glide past, side-foot in, walk away.",
        serial: "WCH-16/18", sign: "Titi 12"
      }
    }),

    W({
      id: "wc-batistuta", name: "BATISTUTA", full: "Gabriel Omar Batistuta",
      pos: "ST", alt: ["CF"], nation: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7",
      club: "Argentina NT", era: "World Cup 1994\u20131998", foot: "Right", weak: 4, skills: 3,
      height: 185, weight: 84, age: 29, wr: "Med / Med",
      main: { PAC: 88, SHO: 97, PAS: 76, DRI: 86, DEF: 40, PHY: 92 },
      sub: {
        acceleration: 86, sprint: 89, positioning: 95, finishing: 96,
        shotPower: 99, longShots: 94, volleys: 92, penalties: 90,
        vision: 76, crossing: 70, fkAccuracy: 82, shortPass: 78,
        longPass: 70, curve: 80, agility: 82, balance: 88,
        reactions: 93, ballControl: 87, dribbling: 85, composure: 92,
        interceptions: 36, heading: 90, defAwareness: 30, standTackle: 38,
        slideTackle: 34, jumping: 90, stamina: 87, strength: 94, aggression: 86
      },
      playstyles: ["Power Shot+", "Power Header+", "Bruiser+", "Aerial"],
      traits: ["Batigol", "Two WC hat-tricks", "Thunderbolt strike", "Long hair, longer range"],
      price: "9.2M", pull: 0.9, anim: "batigol",
      back: {
        theme: "Batigol Blast", c1: "#75aadb", c2: "#ffd400",
        pattern: "burst", motto: "Aim once. The net does the rest.",
        serial: "WCH-17/18", sign: "Bati 9"
      }
    }),

    W({
      id: "wc-kaka", name: "KAK\u00c1", full: "Ricardo Izecson dos Santos Leite",
      pos: "CAM", alt: ["CF", "CM"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "Brazil NT", era: "World Cup 2006\u20132010", foot: "Right", weak: 4, skills: 4,
      height: 186, weight: 82, age: 26, wr: "High / Med",
      main: { PAC: 93, SHO: 89, PAS: 93, DRI: 95, DEF: 48, PHY: 80 },
      sub: {
        acceleration: 92, sprint: 94, positioning: 88, finishing: 89,
        shotPower: 92, longShots: 90, volleys: 84, penalties: 84,
        vision: 95, crossing: 85, fkAccuracy: 82, shortPass: 94,
        longPass: 90, curve: 86, agility: 92, balance: 90,
        reactions: 93, ballControl: 95, dribbling: 95, composure: 93,
        interceptions: 50, heading: 74, defAwareness: 42, standTackle: 48,
        slideTackle: 42, jumping: 82, stamina: 92, strength: 80, aggression: 62
      },
      playstyles: ["Rapid+", "Incisive Pass+", "Long Ball Pass+", "Press Proven"],
      traits: ["Runs 60 m with the ball", "Ballon d'Or 2007", "Straight-line surge", "Arms to the sky"],
      price: "10.4M", pull: 0.7, anim: "skyflare",
      back: {
        theme: "Sky Flare", c1: "#ffffff", c2: "#00b2ff",
        pattern: "crown", motto: "Head up, sixty metres, goal.",
        serial: "WCH-18/18", sign: "Kak\u00e1 10"
      }
    })
  ];

  /* -------- merge into the shared database (same array reference) -------- */
  WC.forEach(function (c) {
    if (DB.byId[c.id]) { return; }
    DB.all.push(c);
    DB.byId[c.id] = c;
  });
  DB.count = DB.all.length;

  /* refresh the position index now that the WC set joined the pool */
  DB.positions = (function () {
    var s = [];
    DB.all.forEach(function (c) {
      if (s.indexOf(c.pos) === -1) { s.push(c.pos); }
    });
    return s;
  })();

  /* set-aware helpers used by the collection / pack screens */
  DB.wc = WC;
  DB.icons = DB.all.filter(function (c) { return c.type === "icon"; });
  DB.bySet = function (type) {
    return DB.all.filter(function (c) { return c.type === type; });
  };
  DB.randomFrom = function (list) {
    var total = 0, i;
    for (i = 0; i < list.length; i++) { total += list[i].pull; }
    var r = Math.random() * total;
    for (i = 0; i < list.length; i++) {
      r -= list[i].pull;
      if (r <= 0) { return list[i]; }
    }
    return list[0];
  };

  window.MVM_WC = WC;
})();
