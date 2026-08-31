/* ============================================================================
 * MVMPACK 26 — CHAMPIONS LEAGUE LEGENDS CARD SET (97 OVR)
 * ----------------------------------------------------------------------------
 * 28 cards sliced from the uploaded "Champions League Legends" sheet
 * (assets/cl/*.png). Each card carries:
 *   • its own main stats + full sub-attribute sheet (29 outfield / 21 GK)
 *   • its own playstyles, traits, physical profile, price and pull rate
 *   • its own BACK design (colours, pattern, motto, serial, signature)
 *   • its own FRONT ANIMATION (`anim` → .clfx--<anim> in clfx.css)
 * Ids are prefixed with "cl-" so they never clash with the ICON or WC sets.
 * ==========================================================================*/
(function () {
  "use strict";

  var DB = window.MVM_CARDS;
  if (!DB) { return; }

  /* helper: outfield Champions League legend ------------------------------- */
  function C(o) {
    o.ovr = 97;
    o.type = "cl";
    o.rarity = "UCL LEGEND";
    o.set = "Champions League Legends";
    o.art = "assets/cl/" + o.id.replace(/^cl-/, "") + ".png";
    o.gk = false;
    return o;
  }
  /* helper: goalkeeper Champions League legend ------------------------------ */
  function CG(o) {
    o.ovr = 97;
    o.type = "cl";
    o.rarity = "UCL LEGEND";
    o.set = "Champions League Legends";
    o.art = "assets/cl/" + o.id.replace(/^cl-/, "") + ".png";
    o.gk = true;
    return o;
  }

  var CL = [

    /* ============ ROW 1 — THE GOALSCORERS OF EUROPE ==================== */
    C({
      id: "cl-ronaldo", name: "RONALDO", full: "Cristiano Ronaldo dos Santos Aveiro",
      pos: "ST", alt: ["LW", "CF"], nation: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9",
      club: "Real Madrid", era: "UCL 2014–2018", foot: "Right", weak: 4, skills: 5,
      height: 187, weight: 84, age: 31, wr: "High / Low",
      main: { PAC: 93, SHO: 97, PAS: 82, DRI: 90, DEF: 36, PHY: 88 },
      sub: {
        acceleration: 91, sprint: 95, positioning: 98, finishing: 97,
        shotPower: 97, longShots: 94, volleys: 92, penalties: 91,
        vision: 82, crossing: 82, fkAccuracy: 88, shortPass: 83,
        longPass: 76, curve: 88, agility: 89, balance: 84,
        reactions: 96, ballControl: 92, dribbling: 89, composure: 97,
        interceptions: 29, heading: 94, defAwareness: 25, standTackle: 30,
        slideTackle: 24, jumping: 97, stamina: 88, strength: 87, aggression: 74
      },
      playstyles: ["Power Shot+", "Power Header+", "Aerial+", "Rapid"],
      traits: ["All-time UCL top scorer", "La D\u00e9cima", "Bicycle kick in Turin", "5 European Cups"],
      price: "17.9M", pull: 0.25, anim: "decima",
      back: {
        theme: "La D\u00e9cima", c1: "#0a1a4a", c2: "#ffd400",
        pattern: "burst", motto: "European nights belong to me.",
        serial: "UCL-01/28", sign: "CR7"
      }
    }),

    C({
      id: "cl-messi", name: "MESSI", full: "Lionel Andr\u00e9s Messi",
      pos: "RW", alt: ["CF", "CAM"], nation: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7",
      club: "FC Barcelona", era: "UCL 2009–2015", foot: "Left", weak: 4, skills: 5,
      height: 170, weight: 72, age: 27, wr: "Med / Low",
      main: { PAC: 90, SHO: 94, PAS: 95, DRI: 98, DEF: 34, PHY: 70 },
      sub: {
        acceleration: 94, sprint: 87, positioning: 95, finishing: 96,
        shotPower: 88, longShots: 92, volleys: 86, penalties: 89,
        vision: 97, crossing: 88, fkAccuracy: 94, shortPass: 96,
        longPass: 90, curve: 96, agility: 97, balance: 96,
        reactions: 97, ballControl: 99, dribbling: 98, composure: 98,
        interceptions: 34, heading: 71, defAwareness: 26, standTackle: 32,
        slideTackle: 24, jumping: 70, stamina: 79, strength: 69, aggression: 44
      },
      playstyles: ["Finesse Shot+", "Technical+", "Incisive Pass+", "Trickster+"],
      traits: ["Chip over Van der Sar", "Solo goal vs Bayern", "4 European Cups", "Left-foot geometry"],
      price: "19.2M", pull: 0.25, anim: "magia",
      back: {
        theme: "Magia Blaugrana", c1: "#004d98", c2: "#a50044",
        pattern: "halo", motto: "They watch the ball, I watch the space.",
        serial: "UCL-02/28", sign: "Leo 10"
      }
    }),

    C({
      id: "cl-benzema", name: "BENZEMA", full: "Karim Mostafa Benzema",
      pos: "ST", alt: ["CF"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "Real Madrid", era: "UCL 2018–2022", foot: "Right", weak: 4, skills: 4,
      height: 185, weight: 81, age: 34, wr: "High / Med",
      main: { PAC: 84, SHO: 93, PAS: 87, DRI: 91, DEF: 42, PHY: 83 },
      sub: {
        acceleration: 83, sprint: 85, positioning: 94, finishing: 94,
        shotPower: 90, longShots: 86, volleys: 89, penalties: 88,
        vision: 89, crossing: 82, fkAccuracy: 76, shortPass: 89,
        longPass: 84, curve: 85, agility: 88, balance: 87,
        reactions: 95, ballControl: 93, dribbling: 91, composure: 95,
        interceptions: 40, heading: 86, defAwareness: 36, standTackle: 44,
        slideTackle: 38, jumping: 84, stamina: 84, strength: 83, aggression: 70
      },
      playstyles: ["Finesse Shot+", "First Touch+", "Technical+", "Chip Shot"],
      traits: ["Hat-trick at Stamford Bridge", "Comeback king of 2022", "Ballon d'Or 2022", "The panenka in Manchester"],
      price: "11.6M", pull: 0.6, anim: "nueve",
      back: {
        theme: "Nueve Blanco", c1: "#f4f7ff", c2: "#c8a24a",
        pattern: "rays", motto: "When the night gets long, I get taller.",
        serial: "UCL-03/28", sign: "KB9"
      }
    }),

    C({
      id: "cl-raul", name: "RA\u00daL", full: "Ra\u00fal Gonz\u00e1lez Blanco",
      pos: "CF", alt: ["ST"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Real Madrid", era: "UCL 1998–2002", foot: "Right", weak: 4, skills: 4,
      height: 180, weight: 75, age: 25, wr: "High / Med",
      main: { PAC: 86, SHO: 93, PAS: 84, DRI: 90, DEF: 46, PHY: 79 },
      sub: {
        acceleration: 86, sprint: 86, positioning: 96, finishing: 94,
        shotPower: 88, longShots: 84, volleys: 90, penalties: 86,
        vision: 85, crossing: 78, fkAccuracy: 72, shortPass: 86,
        longPass: 79, curve: 80, agility: 89, balance: 88,
        reactions: 95, ballControl: 91, dribbling: 89, composure: 94,
        interceptions: 46, heading: 84, defAwareness: 40, standTackle: 48,
        slideTackle: 42, jumping: 82, stamina: 90, strength: 78, aggression: 74
      },
      playstyles: ["Poacher+", "First Touch+", "Relentless+", "Slide Tackle"],
      traits: ["3 European Cups", "The backheel flick vs Man United", "Captain of the Galacticos", "71 UCL goals"],
      price: "9.4M", pull: 0.8, anim: "chupete",
      back: {
        theme: "El Chupete", c1: "#eaeef8", c2: "#8e44ad",
        pattern: "chevron", motto: "The badge first, the goal second.",
        serial: "UCL-04/28", sign: "Ra\u00fal 7"
      }
    }),

    C({
      id: "cl-ronaldinho", name: "RONALDINHO", full: "Ronaldo de Assis Moreira",
      pos: "CAM", alt: ["LW", "CF"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "FC Barcelona", era: "UCL 2005–2006", foot: "Right", weak: 5, skills: 5,
      height: 182, weight: 80, age: 25, wr: "High / Low",
      main: { PAC: 91, SHO: 90, PAS: 93, DRI: 97, DEF: 38, PHY: 78 },
      sub: {
        acceleration: 92, sprint: 90, positioning: 88, finishing: 89,
        shotPower: 92, longShots: 90, volleys: 88, penalties: 87,
        vision: 95, crossing: 90, fkAccuracy: 94, shortPass: 93,
        longPass: 89, curve: 95, agility: 96, balance: 92,
        reactions: 93, ballControl: 97, dribbling: 97, composure: 92,
        interceptions: 34, heading: 74, defAwareness: 28, standTackle: 36,
        slideTackle: 30, jumping: 80, stamina: 82, strength: 78, aggression: 54
      },
      playstyles: ["Trickster+", "Flair+", "Dead Ball+", "Technical+"],
      traits: ["Standing ovation at the Bernab\u00e9u", "Elastico inventor", "UCL 2006 champion", "Toe-poke free kicks"],
      price: "13.2M", pull: 0.4, anim: "joga",
      back: {
        theme: "Joga Bonito", c1: "#00d95f", c2: "#ffd400",
        pattern: "waves", motto: "Football is a smile you play with your feet.",
        serial: "UCL-05/28", sign: "R10"
      }
    }),

    C({
      id: "cl-kaka", name: "KAK\u00c1", full: "Ricardo Izecson dos Santos Leite",
      pos: "CAM", alt: ["CF", "CM"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "AC Milan", era: "UCL 2007", foot: "Right", weak: 4, skills: 4,
      height: 186, weight: 82, age: 25, wr: "High / Med",
      main: { PAC: 94, SHO: 90, PAS: 90, DRI: 94, DEF: 42, PHY: 80 },
      sub: {
        acceleration: 94, sprint: 94, positioning: 90, finishing: 90,
        shotPower: 90, longShots: 89, volleys: 84, penalties: 86,
        vision: 92, crossing: 84, fkAccuracy: 80, shortPass: 91,
        longPass: 87, curve: 86, agility: 92, balance: 89,
        reactions: 93, ballControl: 94, dribbling: 94, composure: 91,
        interceptions: 40, heading: 76, defAwareness: 34, standTackle: 42,
        slideTackle: 36, jumping: 82, stamina: 88, strength: 80, aggression: 58
      },
      playstyles: ["Quick Step+", "Long Ball Pass+", "Press Proven+", "Flair"],
      traits: ["Solo run through Man United", "Ballon d'Or 2007", "Athens champion", "Straight-line devastation"],
      price: "11.1M", pull: 0.6, anim: "velocita",
      back: {
        theme: "Velocit\u00e0 Rossonera", c1: "#fb090b", c2: "#0b0b0b",
        pattern: "speed", motto: "I belong to Jesus — the run belongs to Milan.",
        serial: "UCL-06/28", sign: "Kak\u00e1 22"
      }
    }),

    C({
      id: "cl-shevchenko", name: "SHEVCHENKO", full: "Andriy Mykolayovych Shevchenko",
      pos: "ST", alt: ["CF", "LW"], nation: "Ukraine", flag: "\uD83C\uDDFA\uD83C\uDDE6",
      club: "AC Milan", era: "UCL 2003–2005", foot: "Right", weak: 4, skills: 4,
      height: 183, weight: 79, age: 27, wr: "High / Med",
      main: { PAC: 92, SHO: 94, PAS: 79, DRI: 89, DEF: 40, PHY: 84 },
      sub: {
        acceleration: 92, sprint: 92, positioning: 95, finishing: 95,
        shotPower: 93, longShots: 88, volleys: 88, penalties: 90,
        vision: 80, crossing: 76, fkAccuracy: 78, shortPass: 81,
        longPass: 74, curve: 82, agility: 89, balance: 87,
        reactions: 94, ballControl: 90, dribbling: 88, composure: 93,
        interceptions: 36, heading: 87, defAwareness: 32, standTackle: 40,
        slideTackle: 34, jumping: 88, stamina: 88, strength: 84, aggression: 72
      },
      playstyles: ["Rapid+", "Power Shot+", "Poacher+", "Acrobatic"],
      traits: ["Old Trafford winning penalty 2003", "Ballon d'Or 2004", "48 UCL goals", "Two-footed finisher"],
      price: "8.9M", pull: 0.8, anim: "sheva",
      back: {
        theme: "Sheva", c1: "#0057b7", c2: "#ffd700",
        pattern: "diagonal", motto: "From Kyiv to Manchester, one cold finish.",
        serial: "UCL-07/28", sign: "Sheva 7"
      }
    }),

    /* ============ ROW 2 — THE ENGINE ROOM ============================== */
    C({
      id: "cl-xavi", name: "XAVI", full: "Xavier Hern\u00e1ndez Creus",
      pos: "CM", alt: ["CDM", "CAM"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "FC Barcelona", era: "UCL 2009–2011", foot: "Right", weak: 4, skills: 4,
      height: 170, weight: 68, age: 30, wr: "Med / Med",
      main: { PAC: 72, SHO: 82, PAS: 97, DRI: 93, DEF: 74, PHY: 70 },
      sub: {
        acceleration: 74, sprint: 70, positioning: 82, finishing: 80,
        shotPower: 84, longShots: 85, volleys: 78, penalties: 80,
        vision: 97, crossing: 86, fkAccuracy: 84, shortPass: 99,
        longPass: 95, curve: 88, agility: 90, balance: 92,
        reactions: 94, ballControl: 96, dribbling: 92, composure: 98,
        interceptions: 80, heading: 62, defAwareness: 76, standTackle: 78,
        slideTackle: 70, jumping: 62, stamina: 90, strength: 66, aggression: 68
      },
      playstyles: ["Tiki Taka+", "Incisive Pass+", "Press Proven+", "Pinged Pass"],
      traits: ["The metronome of Wembley 2011", "4 European Cups", "La Masia brain", "Never loses the ball"],
      price: "10.8M", pull: 0.6, anim: "metronom",
      back: {
        theme: "Metr\u00f3nomo", c1: "#004d98", c2: "#edbb00",
        pattern: "grid", motto: "Think fast, look fast, play fast.",
        serial: "UCL-08/28", sign: "Xavi 6"
      }
    }),

    C({
      id: "cl-iniesta", name: "INIESTA", full: "Andr\u00e9s Iniesta Luj\u00e1n",
      pos: "CM", alt: ["CAM", "LM"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "FC Barcelona", era: "UCL 2009–2015", foot: "Right", weak: 4, skills: 4,
      height: 171, weight: 68, age: 28, wr: "High / Med",
      main: { PAC: 78, SHO: 82, PAS: 93, DRI: 96, DEF: 68, PHY: 68 },
      sub: {
        acceleration: 82, sprint: 74, positioning: 84, finishing: 80,
        shotPower: 82, longShots: 82, volleys: 76, penalties: 74,
        vision: 94, crossing: 84, fkAccuracy: 76, shortPass: 95,
        longPass: 89, curve: 84, agility: 96, balance: 96,
        reactions: 93, ballControl: 97, dribbling: 96, composure: 96,
        interceptions: 74, heading: 58, defAwareness: 68, standTackle: 72,
        slideTackle: 66, jumping: 60, stamina: 88, strength: 66, aggression: 60
      },
      playstyles: ["Technical+", "Press Proven+", "Tiki Taka+", "Flair"],
      traits: ["The Stamford Bridge strike", "Escapes any press", "4 European Cups", "Illusionist in traffic"],
      price: "10.4M", pull: 0.6, anim: "illusion",
      back: {
        theme: "El Ilusionista", c1: "#a50044", c2: "#f4f7ff",
        pattern: "silk", motto: "Space is not found, it is invented.",
        serial: "UCL-09/28", sign: "Andr\u00e9s 8"
      }
    }),

    C({
      id: "cl-gerrard", name: "GERRARD", full: "Steven George Gerrard",
      pos: "CM", alt: ["CDM", "CAM"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Liverpool", era: "UCL 2005", foot: "Right", weak: 4, skills: 4,
      height: 185, weight: 83, age: 25, wr: "High / High",
      main: { PAC: 82, SHO: 91, PAS: 90, DRI: 86, DEF: 82, PHY: 88 },
      sub: {
        acceleration: 80, sprint: 83, positioning: 88, finishing: 88,
        shotPower: 96, longShots: 95, volleys: 90, penalties: 87,
        vision: 91, crossing: 88, fkAccuracy: 86, shortPass: 89,
        longPass: 94, curve: 88, agility: 82, balance: 84,
        reactions: 92, ballControl: 88, dribbling: 85, composure: 90,
        interceptions: 84, heading: 84, defAwareness: 80, standTackle: 84,
        slideTackle: 82, jumping: 84, stamina: 94, strength: 88, aggression: 92
      },
      playstyles: ["Power Shot+", "Long Ball Pass+", "Relentless+", "Whipped Pass"],
      traits: ["Istanbul captain", "The header that started the miracle", "Thunder from 30 yards", "Box-to-box engine"],
      price: "9.8M", pull: 0.7, anim: "istanbul",
      back: {
        theme: "Istanbul ’05", c1: "#c8102e", c2: "#00b2a9",
        pattern: "burst", motto: "Three down, forty-five minutes, one anthem.",
        serial: "UCL-10/28", sign: "Stevie G"
      }
    }),

    C({
      id: "cl-lampard", name: "LAMPARD", full: "Frank James Lampard",
      pos: "CM", alt: ["CAM"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Chelsea", era: "UCL 2012", foot: "Right", weak: 4, skills: 3,
      height: 184, weight: 88, age: 33, wr: "High / Med",
      main: { PAC: 76, SHO: 92, PAS: 88, DRI: 84, DEF: 76, PHY: 86 },
      sub: {
        acceleration: 74, sprint: 77, positioning: 94, finishing: 92,
        shotPower: 94, longShots: 93, volleys: 90, penalties: 96,
        vision: 89, crossing: 84, fkAccuracy: 84, shortPass: 88,
        longPass: 90, curve: 84, agility: 78, balance: 84,
        reactions: 92, ballControl: 86, dribbling: 82, composure: 94,
        interceptions: 80, heading: 82, defAwareness: 74, standTackle: 78,
        slideTackle: 74, jumping: 80, stamina: 94, strength: 86, aggression: 84
      },
      playstyles: ["Power Shot+", "Dead Ball+", "Relentless+", "Finesse Shot"],
      traits: ["Munich 2012 champion", "Arriving late in the box", "Penalty machine", "211 Chelsea goals"],
      price: "9.1M", pull: 0.8, anim: "munich",
      back: {
        theme: "Munich Blue", c1: "#034694", c2: "#dba111",
        pattern: "chevron", motto: "Arrive one second later, score one second sooner.",
        serial: "UCL-11/28", sign: "Lamps 8"
      }
    }),

    C({
      id: "cl-scholes", name: "SCHOLES", full: "Paul Aaron Scholes",
      pos: "CM", alt: ["CDM", "CAM"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Manchester United", era: "UCL 1999–2008", foot: "Right", weak: 4, skills: 3,
      height: 170, weight: 70, age: 33, wr: "Med / Med",
      main: { PAC: 72, SHO: 90, PAS: 94, DRI: 87, DEF: 74, PHY: 76 },
      sub: {
        acceleration: 70, sprint: 73, positioning: 88, finishing: 88,
        shotPower: 94, longShots: 95, volleys: 92, penalties: 84,
        vision: 95, crossing: 86, fkAccuracy: 82, shortPass: 94,
        longPass: 96, curve: 88, agility: 82, balance: 86,
        reactions: 92, ballControl: 91, dribbling: 86, composure: 95,
        interceptions: 78, heading: 70, defAwareness: 72, standTackle: 74,
        slideTackle: 66, jumping: 66, stamina: 88, strength: 74, aggression: 78
      },
      playstyles: ["Long Ball Pass+", "Power Shot+", "Pinged Pass+", "Whipped Pass"],
      traits: ["Volley vs Barcelona 2008", "Ginger Prince", "Two European Cups", "Cross-field radar"],
      price: "8.6M", pull: 0.8, anim: "trigger",
      back: {
        theme: "Ginger Prince", c1: "#da291c", c2: "#fbe122",
        pattern: "grid", motto: "One touch to look, one touch to kill.",
        serial: "UCL-12/28", sign: "Scholesy"
      }
    }),

    C({
      id: "cl-zidane", name: "ZIDANE", full: "Zin\u00e9dine Yazid Zidane",
      pos: "CAM", alt: ["CM", "CF"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "Real Madrid", era: "UCL 2002", foot: "Right", weak: 4, skills: 5,
      height: 185, weight: 80, age: 30, wr: "Med / Med",
      main: { PAC: 80, SHO: 88, PAS: 95, DRI: 96, DEF: 66, PHY: 84 },
      sub: {
        acceleration: 78, sprint: 80, positioning: 86, finishing: 88,
        shotPower: 92, longShots: 88, volleys: 96, penalties: 86,
        vision: 96, crossing: 88, fkAccuracy: 88, shortPass: 96,
        longPass: 93, curve: 90, agility: 92, balance: 96,
        reactions: 95, ballControl: 98, dribbling: 96, composure: 96,
        interceptions: 68, heading: 88, defAwareness: 60, standTackle: 68,
        slideTackle: 60, jumping: 86, stamina: 86, strength: 86, aggression: 74
      },
      playstyles: ["Technical+", "First Touch+", "Trickster+", "Power Shot"],
      traits: ["Glasgow volley 2002", "Roulette turn", "Ballon d'Or 1998", "Calm inside chaos"],
      price: "14.6M", pull: 0.35, anim: "glasgow",
      back: {
        theme: "Glasgow ’02", c1: "#f4f7ff", c2: "#0b3d91",
        pattern: "silk", motto: "Left foot, half a volley, one European Cup.",
        serial: "UCL-13/28", sign: "Zizou 5"
      }
    }),

    C({
      id: "cl-seedorf", name: "SEEDORF", full: "Clarence Clyde Seedorf",
      pos: "CM", alt: ["CAM", "LM"], nation: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1",
      club: "AC Milan", era: "UCL 1995–2007", foot: "Right", weak: 4, skills: 4,
      height: 176, weight: 76, age: 31, wr: "High / Med",
      main: { PAC: 82, SHO: 88, PAS: 90, DRI: 90, DEF: 76, PHY: 82 },
      sub: {
        acceleration: 82, sprint: 82, positioning: 84, finishing: 85,
        shotPower: 93, longShots: 91, volleys: 86, penalties: 82,
        vision: 90, crossing: 84, fkAccuracy: 84, shortPass: 91,
        longPass: 89, curve: 86, agility: 88, balance: 90,
        reactions: 90, ballControl: 92, dribbling: 90, composure: 92,
        interceptions: 80, heading: 74, defAwareness: 74, standTackle: 80,
        slideTackle: 74, jumping: 76, stamina: 90, strength: 82, aggression: 80
      },
      playstyles: ["Power Shot+", "Press Proven+", "Technical+", "Pinged Pass"],
      traits: ["Four European Cups, three clubs", "Ajax 1995 wonderkid", "Long-range specialist", "Never lost a final"],
      price: "8.2M", pull: 0.9, anim: "quattro",
      back: {
        theme: "Quattro Coppe", c1: "#0b0b0b", c2: "#fb090b",
        pattern: "stripes", motto: "Four finals, four medals, zero doubts.",
        serial: "UCL-14/28", sign: "Clarence 10"
      }
    }),

    /* ============ ROW 3 — THE MATCHWINNERS ============================= */
    C({
      id: "cl-pirlo", name: "PIRLO", full: "Andrea Pirlo",
      pos: "CM", alt: ["CDM"], nation: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9",
      club: "AC Milan", era: "UCL 2003–2007", foot: "Right", weak: 4, skills: 4,
      height: 177, weight: 68, age: 27, wr: "Med / Low",
      main: { PAC: 68, SHO: 86, PAS: 97, DRI: 90, DEF: 70, PHY: 72 },
      sub: {
        acceleration: 66, sprint: 69, positioning: 80, finishing: 82,
        shotPower: 88, longShots: 90, volleys: 84, penalties: 88,
        vision: 98, crossing: 88, fkAccuracy: 97, shortPass: 95,
        longPass: 98, curve: 95, agility: 84, balance: 86,
        reactions: 90, ballControl: 93, dribbling: 88, composure: 97,
        interceptions: 74, heading: 58, defAwareness: 70, standTackle: 72,
        slideTackle: 64, jumping: 60, stamina: 84, strength: 68, aggression: 58
      },
      playstyles: ["Dead Ball+", "Long Ball Pass+", "Incisive Pass+", "Pinged Pass+"],
      traits: ["Il Maestro", "Two European Cups with Milan", "Maledetta free kick", "Slows the game to his tempo"],
      price: "10.2M", pull: 0.6, anim: "maestro",
      back: {
        theme: "Il Maestro", c1: "#0b0b0b", c2: "#c9a227",
        pattern: "grid", motto: "I do not run — the ball does it for me.",
        serial: "UCL-15/28", sign: "Pirlo 21"
      }
    }),

    C({
      id: "cl-beckham", name: "BECKHAM", full: "David Robert Joseph Beckham",
      pos: "RM", alt: ["CM", "RW"], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Manchester United", era: "UCL 1999", foot: "Right", weak: 3, skills: 4,
      height: 183, weight: 75, age: 24, wr: "High / Med",
      main: { PAC: 80, SHO: 86, PAS: 97, DRI: 86, DEF: 70, PHY: 78 },
      sub: {
        acceleration: 78, sprint: 81, positioning: 82, finishing: 82,
        shotPower: 90, longShots: 90, volleys: 82, penalties: 84,
        vision: 93, crossing: 99, fkAccuracy: 98, shortPass: 92,
        longPass: 97, curve: 98, agility: 84, balance: 84,
        reactions: 88, ballControl: 88, dribbling: 85, composure: 90,
        interceptions: 72, heading: 74, defAwareness: 66, standTackle: 72,
        slideTackle: 68, jumping: 72, stamina: 92, strength: 76, aggression: 76
      },
      playstyles: ["Whipped Pass+", "Dead Ball+", "Crosser+", "Long Ball Pass+"],
      traits: ["Two corners in Barcelona 1999", "Bend it like Beckham", "The treble", "Right foot of a surgeon"],
      price: "9.6M", pull: 0.7, anim: "curva",
      back: {
        theme: "Bend It", c1: "#da291c", c2: "#f4f7ff",
        pattern: "waves", motto: "Give me a corner and I will give you a trophy.",
        serial: "UCL-16/28", sign: "Becks 7"
      }
    }),

    C({
      id: "cl-neymar", name: "NEYMAR JR", full: "Neymar da Silva Santos J\u00fanior",
      pos: "LW", alt: ["CF", "CAM"], nation: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7",
      club: "FC Barcelona", era: "UCL 2015", foot: "Right", weak: 5, skills: 5,
      height: 175, weight: 68, age: 23, wr: "High / Med",
      main: { PAC: 93, SHO: 89, PAS: 87, DRI: 96, DEF: 36, PHY: 68 },
      sub: {
        acceleration: 94, sprint: 91, positioning: 90, finishing: 90,
        shotPower: 86, longShots: 84, volleys: 84, penalties: 88,
        vision: 90, crossing: 84, fkAccuracy: 87, shortPass: 89,
        longPass: 82, curve: 90, agility: 96, balance: 92,
        reactions: 92, ballControl: 96, dribbling: 96, composure: 90,
        interceptions: 32, heading: 68, defAwareness: 28, standTackle: 34,
        slideTackle: 28, jumping: 76, stamina: 82, strength: 64, aggression: 56
      },
      playstyles: ["Trickster+", "Flair+", "Rapid+", "Technical+"],
      traits: ["Berlin 2015 champion", "MSN front three", "Rainbow flicks", "Fearless in the final third"],
      price: "11.8M", pull: 0.5, anim: "ginga",
      back: {
        theme: "Ginga", c1: "#ffd400", c2: "#00d95f",
        pattern: "waves", motto: "If you don't dance, you don't play.",
        serial: "UCL-17/28", sign: "NJR 11"
      }
    }),

    C({
      id: "cl-henry", name: "HENRY", full: "Thierry Daniel Henry",
      pos: "ST", alt: ["LW", "CF"], nation: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7",
      club: "FC Barcelona", era: "UCL 2009", foot: "Right", weak: 4, skills: 4,
      height: 188, weight: 83, age: 31, wr: "High / Low",
      main: { PAC: 95, SHO: 92, PAS: 88, DRI: 93, DEF: 40, PHY: 80 },
      sub: {
        acceleration: 95, sprint: 96, positioning: 93, finishing: 93,
        shotPower: 90, longShots: 88, volleys: 86, penalties: 84,
        vision: 90, crossing: 86, fkAccuracy: 82, shortPass: 89,
        longPass: 84, curve: 90, agility: 92, balance: 88,
        reactions: 93, ballControl: 93, dribbling: 93, composure: 93,
        interceptions: 36, heading: 76, defAwareness: 30, standTackle: 38,
        slideTackle: 32, jumping: 82, stamina: 88, strength: 80, aggression: 62
      },
      playstyles: ["Rapid+", "Finesse Shot+", "Technical+", "Quick Step"],
      traits: ["Rome 2009 champion", "The side-foot into the far corner", "Va-va-voom", "Left channel terror"],
      price: "10.6M", pull: 0.6, anim: "vavavoom",
      back: {
        theme: "Va-Va-Voom", c1: "#a50044", c2: "#ef0107",
        pattern: "speed", motto: "Angle, silence, far corner.",
        serial: "UCL-18/28", sign: "Titi 14"
      }
    }),

    C({
      id: "cl-drogba", name: "DROGBA", full: "Didier Yves Drogba T\u00e9b\u00e9ly",
      pos: "ST", alt: ["CF"], nation: "Ivory Coast", flag: "\uD83C\uDDE8\uD83C\uDDEE",
      club: "Chelsea", era: "UCL 2012", foot: "Right", weak: 4, skills: 3,
      height: 189, weight: 91, age: 34, wr: "High / Med",
      main: { PAC: 84, SHO: 93, PAS: 79, DRI: 84, DEF: 44, PHY: 95 },
      sub: {
        acceleration: 82, sprint: 86, positioning: 92, finishing: 93,
        shotPower: 96, longShots: 89, volleys: 88, penalties: 92,
        vision: 80, crossing: 74, fkAccuracy: 84, shortPass: 80,
        longPass: 74, curve: 82, agility: 78, balance: 86,
        reactions: 92, ballControl: 86, dribbling: 83, composure: 94,
        interceptions: 40, heading: 96, defAwareness: 36, standTackle: 46,
        slideTackle: 40, jumping: 92, stamina: 86, strength: 96, aggression: 90
      },
      playstyles: ["Power Header+", "Power Shot+", "Aerial+", "Bruiser"],
      traits: ["The header and the penalty in Munich", "Big-game monster", "Never lost a final for Chelsea", "Back-to-goal king"],
      price: "9.3M", pull: 0.7, anim: "lion",
      back: {
        theme: "The Lion", c1: "#034694", c2: "#ff7900",
        pattern: "shield", motto: "The bigger the night, the calmer my head.",
        serial: "UCL-19/28", sign: "Drogba 11"
      }
    }),

    C({
      id: "cl-haaland", name: "HAALAND", full: "Erling Braut Haaland",
      pos: "ST", alt: ["CF"], nation: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4",
      club: "Manchester City", era: "UCL 2023", foot: "Left", weak: 3, skills: 3,
      height: 195, weight: 94, age: 22, wr: "High / Med",
      main: { PAC: 94, SHO: 96, PAS: 70, DRI: 82, DEF: 44, PHY: 94 },
      sub: {
        acceleration: 92, sprint: 95, positioning: 97, finishing: 96,
        shotPower: 96, longShots: 84, volleys: 88, penalties: 88,
        vision: 72, crossing: 60, fkAccuracy: 62, shortPass: 74,
        longPass: 66, curve: 72, agility: 78, balance: 82,
        reactions: 95, ballControl: 84, dribbling: 80, composure: 90,
        interceptions: 38, heading: 90, defAwareness: 34, standTackle: 44,
        slideTackle: 38, jumping: 94, stamina: 86, strength: 95, aggression: 84
      },
      playstyles: ["Poacher+", "Power Shot+", "Aerial+", "Acrobatic"],
      traits: ["Istanbul 2023 treble", "Fastest to 35 UCL goals", "Left-foot cannon", "Yoga-flexible finishes"],
      price: "15.4M", pull: 0.35, anim: "wolf",
      back: {
        theme: "Nordic Wolf", c1: "#6cabdd", c2: "#ba0c2f",
        pattern: "burst", motto: "Goals are a habit, not a moment.",
        serial: "UCL-20/28", sign: "EBH 9"
      }
    }),

    C({
      id: "cl-ibrahimovic", name: "IBRAHIMOVIC", full: "Zlatan Ibrahimovi\u0107",
      pos: "ST", alt: ["CF"], nation: "Sweden", flag: "\uD83C\uDDF8\uD83C\uDDEA",
      club: "AC Milan", era: "UCL 2005–2016", foot: "Right", weak: 4, skills: 5,
      height: 195, weight: 95, age: 30, wr: "Med / Low",
      main: { PAC: 83, SHO: 94, PAS: 83, DRI: 89, DEF: 42, PHY: 94 },
      sub: {
        acceleration: 79, sprint: 85, positioning: 93, finishing: 94,
        shotPower: 96, longShots: 91, volleys: 97, penalties: 92,
        vision: 85, crossing: 76, fkAccuracy: 88, shortPass: 85,
        longPass: 79, curve: 86, agility: 86, balance: 88,
        reactions: 93, ballControl: 92, dribbling: 88, composure: 95,
        interceptions: 36, heading: 90, defAwareness: 32, standTackle: 40,
        slideTackle: 34, jumping: 89, stamina: 82, strength: 95, aggression: 88
      },
      playstyles: ["Acrobatic+", "Power Shot+", "Aerial+", "Trickster"],
      traits: ["Taekwondo volleys", "Scored for six UCL clubs", "Impossible angles", "Zlatan mentality"],
      price: "8.8M", pull: 0.8, anim: "zlatan",
      back: {
        theme: "I Am Zlatan", c1: "#0b0b0b", c2: "#fecc02",
        pattern: "crown", motto: "Europe is a stage — I only do main roles.",
        serial: "UCL-21/28", sign: "Zlatan 11"
      }
    }),

    /* ============ ROW 4 — THE WALL OF EUROPE ========================== */
    C({
      id: "cl-maldini", name: "MALDINI", full: "Paolo Cesare Maldini",
      pos: "CB", alt: ["LB"], nation: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9",
      club: "AC Milan", era: "UCL 1989–2007", foot: "Right", weak: 4, skills: 3,
      height: 186, weight: 85, age: 34, wr: "Med / High",
      main: { PAC: 84, SHO: 62, PAS: 82, DRI: 82, DEF: 97, PHY: 92 },
      sub: {
        acceleration: 82, sprint: 86, positioning: 58, finishing: 55,
        shotPower: 74, longShots: 62, volleys: 56, penalties: 60,
        vision: 82, crossing: 84, fkAccuracy: 68, shortPass: 86,
        longPass: 84, curve: 72, agility: 82, balance: 90,
        reactions: 94, ballControl: 84, dribbling: 80, composure: 97,
        interceptions: 96, heading: 88, defAwareness: 98, standTackle: 97,
        slideTackle: 94, jumping: 88, stamina: 90, strength: 90, aggression: 84
      },
      playstyles: ["Anticipate+", "Block+", "Jockey+", "Intercept"],
      traits: ["Five European Cups", "Athens 2007 captain", "Never needed to foul", "25 seasons, one badge"],
      price: "11.4M", pull: 0.55, anim: "bandiera",
      back: {
        theme: "Il Capitano", c1: "#fb090b", c2: "#0b0b0b",
        pattern: "stripes", motto: "If I have to make a tackle, I already made a mistake.",
        serial: "UCL-22/28", sign: "Maldini 3"
      }
    }),

    C({
      id: "cl-nesta", name: "NESTA", full: "Alessandro Nesta",
      pos: "CB", alt: [], nation: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9",
      club: "AC Milan", era: "UCL 2003–2007", foot: "Right", weak: 3, skills: 2,
      height: 187, weight: 79, age: 30, wr: "Med / High",
      main: { PAC: 84, SHO: 52, PAS: 76, DRI: 80, DEF: 96, PHY: 88 },
      sub: {
        acceleration: 83, sprint: 85, positioning: 46, finishing: 44,
        shotPower: 66, longShots: 50, volleys: 44, penalties: 48,
        vision: 74, crossing: 68, fkAccuracy: 54, shortPass: 82,
        longPass: 78, curve: 60, agility: 82, balance: 88,
        reactions: 94, ballControl: 82, dribbling: 78, composure: 96,
        interceptions: 97, heading: 86, defAwareness: 97, standTackle: 96,
        slideTackle: 95, jumping: 88, stamina: 88, strength: 86, aggression: 80
      },
      playstyles: ["Anticipate+", "Slide Tackle+", "Jockey+", "Block"],
      traits: ["Elegance in the tackle", "Two European Cups", "Reads the pass before it leaves", "Milan back line legend"],
      price: "8.4M", pull: 0.85, anim: "eleganza",
      back: {
        theme: "Eleganza", c1: "#0b0b0b", c2: "#c0c6cf",
        pattern: "diagonal", motto: "Defending is a form of art.",
        serial: "UCL-23/28", sign: "Nesta 13"
      }
    }),

    C({
      id: "cl-puyol", name: "PUYOL", full: "Carles Puyol Saforcada",
      pos: "CB", alt: ["RB"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "FC Barcelona", era: "UCL 2006–2011", foot: "Right", weak: 3, skills: 2,
      height: 178, weight: 80, age: 32, wr: "High / High",
      main: { PAC: 84, SHO: 56, PAS: 76, DRI: 78, DEF: 95, PHY: 92 },
      sub: {
        acceleration: 84, sprint: 84, positioning: 52, finishing: 50,
        shotPower: 70, longShots: 52, volleys: 46, penalties: 50,
        vision: 74, crossing: 70, fkAccuracy: 50, shortPass: 84,
        longPass: 76, curve: 58, agility: 84, balance: 90,
        reactions: 93, ballControl: 80, dribbling: 76, composure: 92,
        interceptions: 95, heading: 90, defAwareness: 95, standTackle: 95,
        slideTackle: 94, jumping: 90, stamina: 95, strength: 90, aggression: 94
      },
      playstyles: ["Bruiser+", "Aerial+", "Anticipate+", "Relentless"],
      traits: ["Three European Cups", "Captain of the tiki-taka era", "Heads everything", "Runs until the whistle"],
      price: "8.1M", pull: 0.9, anim: "tiburon",
      back: {
        theme: "El Tibur\u00f3n", c1: "#a50044", c2: "#004d98",
        pattern: "shield", motto: "You pass only over my body.",
        serial: "UCL-24/28", sign: "Puyi 5"
      }
    }),

    C({
      id: "cl-ramos", name: "SERGIO RAMOS", full: "Sergio Ramos Garc\u00eda",
      pos: "CB", alt: ["RB"], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Real Madrid", era: "UCL 2014–2018", foot: "Right", weak: 3, skills: 3,
      height: 184, weight: 82, age: 30, wr: "High / High",
      main: { PAC: 84, SHO: 70, PAS: 78, DRI: 80, DEF: 95, PHY: 94 },
      sub: {
        acceleration: 82, sprint: 85, positioning: 74, finishing: 68,
        shotPower: 80, longShots: 62, volleys: 58, penalties: 82,
        vision: 76, crossing: 72, fkAccuracy: 62, shortPass: 82,
        longPass: 80, curve: 64, agility: 80, balance: 86,
        reactions: 93, ballControl: 82, dribbling: 78, composure: 92,
        interceptions: 94, heading: 95, defAwareness: 94, standTackle: 94,
        slideTackle: 93, jumping: 94, stamina: 92, strength: 93, aggression: 96
      },
      playstyles: ["Power Header+", "Aerial+", "Bruiser+", "Anticipate"],
      traits: ["93:20 in Lisbon", "Four European Cups", "Scores when it matters most", "Leader by force"],
      price: "10.9M", pull: 0.6, anim: "noventa",
      back: {
        theme: "93:20", c1: "#f4f7ff", c2: "#febe10",
        pattern: "burst", motto: "The clock never ends while I am in the box.",
        serial: "UCL-25/28", sign: "SR4"
      }
    }),

    C({
      id: "cl-terry", name: "TERRY", full: "John George Terry",
      pos: "CB", alt: [], nation: "England", flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      club: "Chelsea", era: "UCL 2012", foot: "Right", weak: 3, skills: 2,
      height: 187, weight: 90, age: 31, wr: "Med / High",
      main: { PAC: 74, SHO: 62, PAS: 74, DRI: 72, DEF: 95, PHY: 95 },
      sub: {
        acceleration: 70, sprint: 76, positioning: 62, finishing: 58,
        shotPower: 74, longShots: 54, volleys: 50, penalties: 56,
        vision: 72, crossing: 62, fkAccuracy: 52, shortPass: 80,
        longPass: 78, curve: 56, agility: 68, balance: 86,
        reactions: 92, ballControl: 74, dribbling: 68, composure: 93,
        interceptions: 95, heading: 94, defAwareness: 96, standTackle: 95,
        slideTackle: 92, jumping: 92, stamina: 88, strength: 96, aggression: 95
      },
      playstyles: ["Block+", "Aerial+", "Anticipate+", "Bruiser"],
      traits: ["Captain, leader, legend", "Blocks with any body part", "Munich 2012 winner", "Organises the whole line"],
      price: "7.9M", pull: 0.95, anim: "captain",
      back: {
        theme: "Captain · Leader", c1: "#034694", c2: "#f4f7ff",
        pattern: "shield", motto: "Put your body where the ball is going.",
        serial: "UCL-26/28", sign: "JT 26"
      }
    }),

    CG({
      id: "cl-casillas", name: "CASILLAS", full: "Iker Casillas Fern\u00e1ndez",
      pos: "GK", alt: [], nation: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8",
      club: "Real Madrid", era: "UCL 2000–2014", foot: "Right", weak: 3, skills: 1,
      height: 185, weight: 84, age: 32, wr: "Med / Med",
      main: { DIV: 96, HAN: 89, KIC: 78, REF: 98, SPD: 72, POS: 94 },
      sub: {
        diving: 96, handling: 89, kicking: 78, reflexes: 98,
        gkSpeed: 72, gkPositioning: 94, oneOnOne: 97, penaltySave: 92,
        crossClaim: 86, sweeperKeeper: 85, longThrow: 76, punching: 88,
        composure: 95, reactions: 98, aggression: 54, jumping: 91,
        strength: 82, stamina: 84, vision: 80, shortPass: 80, longPass: 76
      },
      playstyles: ["Quick Reflexes+", "1v1 Close Down+", "Footwork+", "Rush Out"],
      traits: ["Three European Cups with Madrid", "Youngest keeper to win the final", "Saved the 2002 final with his hands", "La D\u00e9cima captain"],
      price: "10.6M", pull: 0.6, anim: "guardian",
      back: {
        theme: "El Santo", c1: "#f4f7ff", c2: "#00a3e0",
        pattern: "web", motto: "Came off the bench, saved a European Cup.",
        serial: "UCL-27/28", sign: "Iker 1"
      }
    }),

    CG({
      id: "cl-buffon", name: "BUFFON", full: "Gianluigi Buffon",
      pos: "GK", alt: [], nation: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9",
      club: "Juventus", era: "UCL 2003–2017", foot: "Right", weak: 3, skills: 1,
      height: 192, weight: 92, age: 34, wr: "Med / Med",
      main: { DIV: 94, HAN: 93, KIC: 80, REF: 96, SPD: 62, POS: 97 },
      sub: {
        diving: 94, handling: 93, kicking: 80, reflexes: 96,
        gkSpeed: 62, gkPositioning: 97, oneOnOne: 94, penaltySave: 90,
        crossClaim: 92, sweeperKeeper: 76, longThrow: 82, punching: 92,
        composure: 98, reactions: 96, aggression: 50, jumping: 88,
        strength: 90, stamina: 84, vision: 82, shortPass: 82, longPass: 80
      },
      playstyles: ["Far Reach+", "Cross Claimer+", "Quick Reflexes+", "Deflector"],
      traits: ["Three finals, endless nights", "Superman of Turin", "Never beaten twice the same way", "Positioning above everything"],
      price: "11.2M", pull: 0.55, anim: "superman",
      back: {
        theme: "Superman", c1: "#0b0b0b", c2: "#f4f7ff",
        pattern: "stripes", motto: "The goal is mine — ask permission first.",
        serial: "UCL-28/28", sign: "Gigi 1"
      }
    })
  ];

  /* -------- merge into the shared database (same array reference) -------- */
  CL.forEach(function (c) {
    if (DB.byId[c.id]) { return; }
    DB.all.push(c);
    DB.byId[c.id] = c;
  });
  DB.count = DB.all.length;

  /* refresh the position index now that the UCL set joined the pool */
  DB.positions = (function () {
    var s = [];
    DB.all.forEach(function (c) {
      if (s.indexOf(c.pos) === -1) { s.push(c.pos); }
    });
    return s;
  })();

  /* set-aware helpers used by the collection / pack screens */
  DB.cl = CL;
  DB.icons = DB.all.filter(function (c) { return c.type === "icon"; });
  DB.bySet = function (type) {
    return DB.all.filter(function (c) { return c.type === type; });
  };

  window.MVM_CL = CL;
})();
