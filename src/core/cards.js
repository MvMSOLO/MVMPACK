/* ============================================================================
 * MVMPACK 26 — ICON CARD DATABASE (99 OVR)
 * ----------------------------------------------------------------------------
 * 21 icon cards sliced from the uploaded artwork (assets/cards/*.png).
 * Every card is unique: own main stats, own 29 sub-attributes, own playstyles,
 * own traits, own physical profile, own market price and own BACK design
 * (theme colours, pattern, motto, serial, signature).
 * Stats are hand-authored to match each legend's real playing character.
 * ==========================================================================*/
(function () {
  "use strict";

  /* helper: outfield card ------------------------------------------------- */
  function P(o) {
    o.ovr = 99;
    o.type = "icon";
    o.rarity = "ICON";
    o.art = "assets/cards/" + o.id + ".png";
    o.gk = false;
    return o;
  }
  /* helper: goalkeeper card ------------------------------------------------ */
  function G(o) {
    o.ovr = 99;
    o.type = "icon";
    o.rarity = "ICON";
    o.art = "assets/cards/" + o.id + ".png";
    o.gk = true;
    return o;
  }

  var CARDS = [

    /* ===================== ROW 1 — ATTACKING LEGENDS ==================== */
    P({
      id: "pele", name: "PELÉ", full: "Edson Arantes do Nascimento",
      pos: "ST", alt: ["CF", "CAM"], nation: "Brazil", flag: "🇧🇷",
      club: "Santos", era: "1958–1970", foot: "Right", weak: 4, skills: 5,
      height: 173, weight: 70, age: 29, wr: "High / Med",
      main: { PAC: 95, SHO: 96, PAS: 93, DRI: 96, DEF: 60, PHY: 76 },
      sub: {
        acceleration: 96, sprint: 94, positioning: 97, finishing: 96,
        shotPower: 95, longShots: 90, volleys: 96, penalties: 88,
        vision: 93, crossing: 84, fkAccuracy: 86, shortPass: 94,
        longPass: 90, curve: 88, agility: 95, balance: 96,
        reactions: 97, ballControl: 96, dribbling: 95, composure: 96,
        interceptions: 52, heading: 94, defAwareness: 45, standTackle: 48,
        slideTackle: 42, jumping: 95, stamina: 90, strength: 78, aggression: 72
      },
      playstyles: ["Finesse Shot+", "Acrobatic+", "Quick Step", "Trickster"],
      traits: ["O Rei", "1000+ goals", "3× World Cup", "Bicycle kick master"],
      price: "14.8M", pull: 0.4,
      back: {
        theme: "Rei do Futebol", c1: "#00d95f", c2: "#ffd400",
        pattern: "rays", motto: "O Rei never walks — he floats.",
        serial: "ICN-01/21", sign: "Pelé"
      }
    }),

    P({
      id: "maradona", name: "MARADONA", full: "Diego Armando Maradona",
      pos: "CAM", alt: ["CF", "LW"], nation: "Argentina", flag: "🇦🇷",
      club: "Napoli", era: "1984–1991", foot: "Left", weak: 3, skills: 5,
      height: 165, weight: 68, age: 26, wr: "High / Low",
      main: { PAC: 90, SHO: 92, PAS: 94, DRI: 99, DEF: 45, PHY: 74 },
      sub: {
        acceleration: 94, sprint: 86, positioning: 92, finishing: 92,
        shotPower: 91, longShots: 90, volleys: 88, penalties: 92,
        vision: 96, crossing: 88, fkAccuracy: 96, shortPass: 95,
        longPass: 90, curve: 95, agility: 99, balance: 99,
        reactions: 95, ballControl: 99, dribbling: 99, composure: 94,
        interceptions: 44, heading: 76, defAwareness: 38, standTackle: 42,
        slideTackle: 40, jumping: 78, stamina: 88, strength: 74, aggression: 78
      },
      playstyles: ["Technical+", "Trickster+", "Dead Ball+", "Rapid"],
      traits: ["El Diego", "Goal of the Century", "Low centre of gravity", "Carries a nation"],
      price: "13.9M", pull: 0.4,
      back: {
        theme: "Mano de Dios", c1: "#5bc8ff", c2: "#f2f7ff",
        pattern: "stripes", motto: "Barrilete cósmico — from which planet?",
        serial: "ICN-02/21", sign: "D10S"
      }
    }),

    P({
      id: "cruijff", name: "CRUIJFF", full: "Hendrik Johannes Cruijff",
      pos: "CF", alt: ["CAM", "LW"], nation: "Netherlands", flag: "🇳🇱",
      club: "Ajax", era: "1971–1974", foot: "Right", weak: 4, skills: 5,
      height: 178, weight: 68, age: 27, wr: "High / Med",
      main: { PAC: 93, SHO: 90, PAS: 96, DRI: 96, DEF: 55, PHY: 70 },
      sub: {
        acceleration: 94, sprint: 92, positioning: 92, finishing: 90,
        shotPower: 88, longShots: 86, volleys: 88, penalties: 82,
        vision: 98, crossing: 90, fkAccuracy: 84, shortPass: 97,
        longPass: 94, curve: 88, agility: 96, balance: 92,
        reactions: 96, ballControl: 97, dribbling: 96, composure: 95,
        interceptions: 62, heading: 76, defAwareness: 50, standTackle: 54,
        slideTackle: 48, jumping: 80, stamina: 92, strength: 66, aggression: 70
      },
      playstyles: ["Incisive Pass+", "Press Proven", "Flair", "First Touch+"],
      traits: ["Total Football", "The Cruyff Turn", "Coach on the pitch", "Number 14"],
      price: "11.2M", pull: 0.5,
      back: {
        theme: "Totaalvoetbal", c1: "#ff6a13", c2: "#ffffff",
        pattern: "grid", motto: "Playing football is simple — playing simple is hard.",
        serial: "ICN-03/21", sign: "Cruijff 14"
      }
    }),

    P({
      id: "ronaldo-por", name: "RONALDO", full: "Cristiano Ronaldo dos Santos Aveiro",
      pos: "ST", alt: ["LW", "RW"], nation: "Portugal", flag: "🇵🇹",
      club: "Manchester United", era: "2006–2009", foot: "Right", weak: 4, skills: 5,
      height: 187, weight: 80, age: 23, wr: "High / Low",
      main: { PAC: 99, SHO: 92, PAS: 84, DRI: 96, DEF: 42, PHY: 80 },
      sub: {
        acceleration: 98, sprint: 99, positioning: 90, finishing: 92,
        shotPower: 96, longShots: 92, volleys: 88, penalties: 86,
        vision: 84, crossing: 88, fkAccuracy: 94, shortPass: 84,
        longPass: 80, curve: 92, agility: 96, balance: 88,
        reactions: 93, ballControl: 95, dribbling: 97, composure: 88,
        interceptions: 34, heading: 88, defAwareness: 30, standTackle: 36,
        slideTackle: 32, jumping: 94, stamina: 92, strength: 78, aggression: 72
      },
      playstyles: ["Rapid+", "Trickster+", "Flair", "Dead Ball"],
      traits: ["Stepover machine", "Knuckleball free-kick", "Wing terror", "First Ballon d'Or"],
      price: "12.4M", pull: 0.5,
      back: {
        theme: "Young Phenomenon", c1: "#e8112d", c2: "#00a651",
        pattern: "chevron", motto: "Seven stepovers, then the net.",
        serial: "ICN-04/21", sign: "CR7 · 2008"
      }
    }),

    P({
      id: "ronaldinho", name: "RONALDINHO", full: "Ronaldo de Assis Moreira",
      pos: "LW", alt: ["CAM", "CF"], nation: "Brazil", flag: "🇧🇷",
      club: "Barcelona", era: "2004–2006", foot: "Right", weak: 5, skills: 5,
      height: 182, weight: 80, age: 25, wr: "Med / Low",
      main: { PAC: 93, SHO: 90, PAS: 94, DRI: 98, DEF: 40, PHY: 76 },
      sub: {
        acceleration: 93, sprint: 92, positioning: 88, finishing: 90,
        shotPower: 94, longShots: 92, volleys: 90, penalties: 86,
        vision: 96, crossing: 92, fkAccuracy: 96, shortPass: 94,
        longPass: 90, curve: 97, agility: 96, balance: 94,
        reactions: 94, ballControl: 98, dribbling: 99, composure: 92,
        interceptions: 34, heading: 72, defAwareness: 28, standTackle: 34,
        slideTackle: 30, jumping: 82, stamina: 84, strength: 76, aggression: 62
      },
      playstyles: ["Trickster+", "Flair+", "Dead Ball+", "Whipped Pass"],
      traits: ["Elastico", "No-look pass", "Smile of the game", "Bernabéu standing ovation"],
      price: "12.9M", pull: 0.5,
      back: {
        theme: "Joga Bonito", c1: "#ffe100", c2: "#009c3b",
        pattern: "waves", motto: "Football is joy — play it laughing.",
        serial: "ICN-05/21", sign: "R10"
      }
    }),

    P({
      id: "henry", name: "HENRY", full: "Thierry Daniel Henry",
      pos: "ST", alt: ["LW", "CF"], nation: "France", flag: "🇫🇷",
      club: "Arsenal", era: "2003–2006", foot: "Right", weak: 4, skills: 5,
      height: 188, weight: 83, age: 28, wr: "High / Med",
      main: { PAC: 97, SHO: 94, PAS: 88, DRI: 94, DEF: 45, PHY: 82 },
      sub: {
        acceleration: 97, sprint: 97, positioning: 94, finishing: 95,
        shotPower: 90, longShots: 88, volleys: 86, penalties: 84,
        vision: 90, crossing: 88, fkAccuracy: 88, shortPass: 88,
        longPass: 84, curve: 94, agility: 92, balance: 88,
        reactions: 94, ballControl: 94, dribbling: 94, composure: 96,
        interceptions: 40, heading: 78, defAwareness: 34, standTackle: 42,
        slideTackle: 38, jumping: 86, stamina: 92, strength: 82, aggression: 68
      },
      playstyles: ["Finesse Shot+", "Rapid+", "Chip Shot", "Flair"],
      traits: ["Va-va-voom", "Curled far corner", "Invincible", "Left-channel run"],
      price: "9.6M", pull: 0.6,
      back: {
        theme: "Invincible", c1: "#ef0107", c2: "#063672",
        pattern: "diagonal", motto: "Glide, cut inside, side-foot it home.",
        serial: "ICN-06/21", sign: "Titi 14"
      }
    }),

    P({
      id: "puskas", name: "PUSKÁS", full: "Ferenc Puskás",
      pos: "CF", alt: ["ST", "CAM"], nation: "Hungary", flag: "🇭🇺",
      club: "Real Madrid", era: "1958–1962", foot: "Left", weak: 2, skills: 4,
      height: 172, weight: 76, age: 31, wr: "Med / Low",
      main: { PAC: 82, SHO: 99, PAS: 90, DRI: 90, DEF: 40, PHY: 76 },
      sub: {
        acceleration: 82, sprint: 80, positioning: 96, finishing: 99,
        shotPower: 99, longShots: 96, volleys: 94, penalties: 94,
        vision: 92, crossing: 84, fkAccuracy: 92, shortPass: 90,
        longPass: 86, curve: 90, agility: 88, balance: 92,
        reactions: 94, ballControl: 93, dribbling: 90, composure: 96,
        interceptions: 32, heading: 70, defAwareness: 28, standTackle: 32,
        slideTackle: 28, jumping: 70, stamina: 78, strength: 80, aggression: 66
      },
      playstyles: ["Power Shot+", "Finesse Shot+", "Dead Ball", "Long Ball Pass"],
      traits: ["Galloping Major", "Left foot cannon", "Magical Magyars", "Puskás Award namesake"],
      price: "8.4M", pull: 0.7,
      back: {
        theme: "Galloping Major", c1: "#cd2a3e", c2: "#436f4d",
        pattern: "stripes", motto: "One left foot, a thousand goals.",
        serial: "ICN-07/21", sign: "Öcsi"
      }
    }),

    /* ===================== ROW 2 — MAESTROS & MIDFIELD ================== */
    P({
      id: "messi", name: "MESSI", full: "Lionel Andrés Messi",
      pos: "CAM", alt: ["RW", "CF"], nation: "Argentina", flag: "🇦🇷",
      club: "Barcelona", era: "2011–2015", foot: "Left", weak: 4, skills: 5,
      height: 170, weight: 72, age: 27, wr: "Med / Low",
      main: { PAC: 91, SHO: 95, PAS: 96, DRI: 99, DEF: 40, PHY: 70 },
      sub: {
        acceleration: 96, sprint: 88, positioning: 96, finishing: 97,
        shotPower: 90, longShots: 92, volleys: 88, penalties: 86,
        vision: 98, crossing: 88, fkAccuracy: 96, shortPass: 97,
        longPass: 92, curve: 96, agility: 99, balance: 97,
        reactions: 98, ballControl: 99, dribbling: 99, composure: 97,
        interceptions: 40, heading: 72, defAwareness: 30, standTackle: 36,
        slideTackle: 28, jumping: 70, stamina: 82, strength: 70, aggression: 48
      },
      playstyles: ["Finesse Shot+", "Incisive Pass+", "Technical+", "Trickster+"],
      traits: ["La Pulga", "Left-foot finesse", "Slalom dribble", "8× Ballon d'Or"],
      price: "15.6M", pull: 0.3,
      back: {
        theme: "La Pulga", c1: "#6cd4ff", c2: "#ffffff",
        pattern: "halo", motto: "Small steps, impossible angles.",
        serial: "ICN-08/21", sign: "Leo 10"
      }
    }),

    P({
      id: "c-ronaldo", name: "C. RONALDO", full: "Cristiano Ronaldo dos Santos Aveiro",
      pos: "ST", alt: ["LW", "CF"], nation: "Portugal", flag: "🇵🇹",
      club: "Real Madrid", era: "2013–2017", foot: "Right", weak: 4, skills: 5,
      height: 187, weight: 84, age: 31, wr: "High / Low",
      main: { PAC: 93, SHO: 99, PAS: 84, DRI: 90, DEF: 40, PHY: 88 },
      sub: {
        acceleration: 90, sprint: 95, positioning: 99, finishing: 98,
        shotPower: 98, longShots: 94, volleys: 94, penalties: 92,
        vision: 84, crossing: 82, fkAccuracy: 88, shortPass: 84,
        longPass: 78, curve: 88, agility: 88, balance: 84,
        reactions: 97, ballControl: 92, dribbling: 89, composure: 97,
        interceptions: 32, heading: 96, defAwareness: 28, standTackle: 32,
        slideTackle: 26, jumping: 99, stamina: 90, strength: 88, aggression: 76
      },
      playstyles: ["Power Header+", "Power Shot+", "Aerial+", "Acrobatic"],
      traits: ["Siuuu", "Box predator", "Champions League machine", "Aerial monster"],
      price: "15.2M", pull: 0.3,
      back: {
        theme: "Siuuu Mode", c1: "#ffcc00", c2: "#ff2d55",
        pattern: "burst", motto: "Talent without work is nothing.",
        serial: "ICN-09/21", sign: "CR7 · 2017"
      }
    }),

    P({
      id: "ronaldo-r9", name: "RONALDO", full: "Ronaldo Luís Nazário de Lima",
      pos: "CF", alt: ["ST", "RW"], nation: "Brazil", flag: "🇧🇷",
      club: "Inter · Real Madrid", era: "1997–2003", foot: "Right", weak: 4, skills: 5,
      height: 183, weight: 82, age: 24, wr: "High / Low",
      main: { PAC: 98, SHO: 97, PAS: 82, DRI: 96, DEF: 40, PHY: 84 },
      sub: {
        acceleration: 99, sprint: 97, positioning: 96, finishing: 98,
        shotPower: 94, longShots: 86, volleys: 88, penalties: 90,
        vision: 82, crossing: 76, fkAccuracy: 78, shortPass: 82,
        longPass: 74, curve: 84, agility: 96, balance: 94,
        reactions: 96, ballControl: 96, dribbling: 97, composure: 94,
        interceptions: 30, heading: 84, defAwareness: 26, standTackle: 30,
        slideTackle: 26, jumping: 88, stamina: 84, strength: 88, aggression: 70
      },
      playstyles: ["Rapid+", "Quick Step+", "Trickster", "Power Shot"],
      traits: ["O Fenômeno", "Explosive first five metres", "Chop and finish", "2002 top scorer"],
      price: "13.4M", pull: 0.4,
      back: {
        theme: "O Fenômeno", c1: "#00ff41", c2: "#ffe100",
        pattern: "speed", motto: "Zero to gone in one touch.",
        serial: "ICN-10/21", sign: "R9"
      }
    }),

    P({
      id: "zidane", name: "ZIDANE", full: "Zinédine Yazid Zidane",
      pos: "CAM", alt: ["CM", "CF"], nation: "France", flag: "🇫🇷",
      club: "Real Madrid", era: "2001–2006", foot: "Right", weak: 4, skills: 5,
      height: 185, weight: 80, age: 30, wr: "Med / Med",
      main: { PAC: 84, SHO: 89, PAS: 96, DRI: 97, DEF: 66, PHY: 86 },
      sub: {
        acceleration: 82, sprint: 84, positioning: 86, finishing: 88,
        shotPower: 92, longShots: 90, volleys: 96, penalties: 88,
        vision: 97, crossing: 88, fkAccuracy: 86, shortPass: 97,
        longPass: 94, curve: 88, agility: 94, balance: 96,
        reactions: 95, ballControl: 99, dribbling: 96, composure: 96,
        interceptions: 66, heading: 90, defAwareness: 60, standTackle: 66,
        slideTackle: 58, jumping: 88, stamina: 88, strength: 88, aggression: 74
      },
      playstyles: ["Technical+", "Press Proven+", "First Touch+", "Acrobatic"],
      traits: ["Roulette turn", "Glasgow volley", "Ice in the storm", "1998 double header"],
      price: "12.1M", pull: 0.5,
      back: {
        theme: "Zizou Elegance", c1: "#b026ff", c2: "#e6e9ef",
        pattern: "silk", motto: "Turn once — the game turns with you.",
        serial: "ICN-11/21", sign: "Zizou 5"
      }
    }),

    P({
      id: "xavi", name: "XAVI", full: "Xavier Hernández Creus",
      pos: "CM", alt: ["CDM", "CAM"], nation: "Spain", flag: "🇪🇸",
      club: "Barcelona", era: "2008–2012", foot: "Right", weak: 4, skills: 4,
      height: 170, weight: 68, age: 30, wr: "High / Med",
      main: { PAC: 74, SHO: 82, PAS: 99, DRI: 93, DEF: 74, PHY: 68 },
      sub: {
        acceleration: 76, sprint: 72, positioning: 80, finishing: 82,
        shotPower: 84, longShots: 84, volleys: 78, penalties: 80,
        vision: 99, crossing: 88, fkAccuracy: 86, shortPass: 99,
        longPass: 96, curve: 88, agility: 92, balance: 94,
        reactions: 95, ballControl: 96, dribbling: 92, composure: 97,
        interceptions: 80, heading: 62, defAwareness: 76, standTackle: 78,
        slideTackle: 68, jumping: 60, stamina: 92, strength: 66, aggression: 74
      },
      playstyles: ["Tiki Taka+", "Incisive Pass+", "Pinged Pass+", "Press Proven"],
      traits: ["La Pausa", "Never loses the ball", "Metronome", "Tiki-taka brain"],
      price: "7.8M", pull: 0.8,
      back: {
        theme: "Tiki-Taka", c1: "#a50044", c2: "#004d98",
        pattern: "grid", motto: "Think first, touch once.",
        serial: "ICN-12/21", sign: "Xavi 6"
      }
    }),

    P({
      id: "pirlo", name: "PIRLO", full: "Andrea Pirlo",
      pos: "CM", alt: ["CDM"], nation: "Italy", flag: "🇮🇹",
      club: "Juventus", era: "2011–2015", foot: "Right", weak: 4, skills: 4,
      height: 177, weight: 68, age: 33, wr: "Med / Low",
      main: { PAC: 68, SHO: 88, PAS: 99, DRI: 88, DEF: 70, PHY: 72 },
      sub: {
        acceleration: 66, sprint: 68, positioning: 78, finishing: 82,
        shotPower: 90, longShots: 94, volleys: 84, penalties: 92,
        vision: 98, crossing: 92, fkAccuracy: 99, shortPass: 96,
        longPass: 99, curve: 96, agility: 84, balance: 86,
        reactions: 92, ballControl: 94, dribbling: 88, composure: 99,
        interceptions: 76, heading: 60, defAwareness: 72, standTackle: 74,
        slideTackle: 66, jumping: 62, stamina: 84, strength: 70, aggression: 62
      },
      playstyles: ["Dead Ball+", "Long Ball Pass+", "Pinged Pass+", "Chip Shot"],
      traits: ["L'Architetto", "Maradona of the free-kick", "Panenka at Wembley", "Deep-lying regista"],
      price: "7.2M", pull: 0.8,
      back: {
        theme: "L'Architetto", c1: "#111318", c2: "#f5f5f5",
        pattern: "stripes", motto: "I don't run — the ball does.",
        serial: "ICN-13/21", sign: "Pirlo 21"
      }
    }),

    P({
      id: "gerrard", name: "GERRARD", full: "Steven George Gerrard",
      pos: "CM", alt: ["CDM", "CAM"], nation: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      club: "Liverpool", era: "2005–2009", foot: "Right", weak: 4, skills: 4,
      height: 185, weight: 83, age: 27, wr: "High / High",
      main: { PAC: 84, SHO: 93, PAS: 92, DRI: 86, DEF: 82, PHY: 90 },
      sub: {
        acceleration: 82, sprint: 85, positioning: 88, finishing: 90,
        shotPower: 97, longShots: 96, volleys: 92, penalties: 88,
        vision: 92, crossing: 92, fkAccuracy: 88, shortPass: 90,
        longPass: 94, curve: 90, agility: 82, balance: 84,
        reactions: 92, ballControl: 88, dribbling: 85, composure: 92,
        interceptions: 86, heading: 82, defAwareness: 80, standTackle: 84,
        slideTackle: 82, jumping: 82, stamina: 96, strength: 88, aggression: 92
      },
      playstyles: ["Power Shot+", "Long Ball Pass+", "Relentless+", "Bruiser"],
      traits: ["Istanbul captain", "30-yard rockets", "Box-to-box engine", "Never says die"],
      price: "6.9M", pull: 0.9,
      back: {
        theme: "Istanbul Night", c1: "#c8102e", c2: "#00b2a9",
        pattern: "burst", motto: "Never give up — five minutes changed everything.",
        serial: "ICN-14/21", sign: "Stevie G 8"
      }
    }),

    /* ===================== ROW 3 — DEFENDERS & KEEPERS ================== */
    P({
      id: "maldini", name: "MALDINI", full: "Paolo Cesare Maldini",
      pos: "CB", alt: ["LB"], nation: "Italy", flag: "🇮🇹",
      club: "AC Milan", era: "1994–2003", foot: "Right", weak: 4, skills: 3,
      height: 186, weight: 85, age: 30, wr: "Med / High",
      main: { PAC: 88, SHO: 55, PAS: 80, DRI: 78, DEF: 97, PHY: 90 },
      sub: {
        acceleration: 86, sprint: 89, positioning: 52, finishing: 48,
        shotPower: 72, longShots: 58, volleys: 44, penalties: 52,
        vision: 78, crossing: 84, fkAccuracy: 62, shortPass: 84,
        longPass: 80, curve: 68, agility: 82, balance: 88,
        reactions: 92, ballControl: 82, dribbling: 74, composure: 96,
        interceptions: 96, heading: 88, defAwareness: 98, standTackle: 96,
        slideTackle: 94, jumping: 88, stamina: 92, strength: 88, aggression: 84
      },
      playstyles: ["Anticipate+", "Jockey+", "Intercept+", "Slide Tackle"],
      traits: ["Il Capitano", "25 seasons, one badge", "Tackles without fouling", "5× European Cup"],
      price: "6.4M", pull: 1.0,
      back: {
        theme: "Il Capitano", c1: "#fb090b", c2: "#0d0d0d",
        pattern: "stripes", motto: "If I have to tackle, I've already made a mistake.",
        serial: "ICN-15/21", sign: "Maldini 3"
      }
    }),

    P({
      id: "baresi", name: "BARESI", full: "Franco Baresi",
      pos: "CB", alt: ["CDM"], nation: "Italy", flag: "🇮🇹",
      club: "AC Milan", era: "1989–1994", foot: "Right", weak: 3, skills: 3,
      height: 176, weight: 70, age: 31, wr: "Med / High",
      main: { PAC: 84, SHO: 52, PAS: 78, DRI: 74, DEF: 98, PHY: 88 },
      sub: {
        acceleration: 84, sprint: 84, positioning: 48, finishing: 42,
        shotPower: 70, longShots: 54, volleys: 40, penalties: 56,
        vision: 82, crossing: 70, fkAccuracy: 58, shortPass: 84,
        longPass: 82, curve: 62, agility: 82, balance: 88,
        reactions: 96, ballControl: 80, dribbling: 72, composure: 98,
        interceptions: 99, heading: 86, defAwareness: 99, standTackle: 97,
        slideTackle: 92, jumping: 86, stamina: 90, strength: 84, aggression: 88
      },
      playstyles: ["Anticipate+", "Intercept+", "Block+", "Bruiser"],
      traits: ["Offside-trap master", "Sweeper libero", "Reads three passes ahead", "1994 iron will"],
      price: "5.8M", pull: 1.1,
      back: {
        theme: "Il Libero", c1: "#e11d2c", c2: "#1b2432",
        pattern: "shield", motto: "The line moves when I say so.",
        serial: "ICN-16/21", sign: "Baresi 6"
      }
    }),

    P({
      id: "beckenbauer", name: "BECKENBAUER", full: "Franz Anton Beckenbauer",
      pos: "CB", alt: ["CDM", "CM"], nation: "Germany", flag: "🇩🇪",
      club: "Bayern München", era: "1972–1976", foot: "Right", weak: 4, skills: 4,
      height: 181, weight: 76, age: 29, wr: "Med / High",
      main: { PAC: 82, SHO: 72, PAS: 92, DRI: 86, DEF: 96, PHY: 86 },
      sub: {
        acceleration: 80, sprint: 82, positioning: 68, finishing: 70,
        shotPower: 82, longShots: 76, volleys: 62, penalties: 72,
        vision: 94, crossing: 78, fkAccuracy: 78, shortPass: 94,
        longPass: 92, curve: 76, agility: 86, balance: 90,
        reactions: 94, ballControl: 90, dribbling: 86, composure: 97,
        interceptions: 95, heading: 84, defAwareness: 96, standTackle: 94,
        slideTackle: 88, jumping: 84, stamina: 92, strength: 84, aggression: 78
      },
      playstyles: ["Anticipate+", "Incisive Pass+", "Jockey", "Pinged Pass"],
      traits: ["Der Kaiser", "Invented the libero", "Won it as player and coach", "Steps out with the ball"],
      price: "6.6M", pull: 1.0,
      back: {
        theme: "Der Kaiser", c1: "#dc052d", c2: "#ffffff",
        pattern: "crown", motto: "Defend by owning the ball.",
        serial: "ICN-17/21", sign: "Kaiser 5"
      }
    }),

    P({
      id: "carlos-alberto", name: "CARLOS ALBERTO", full: "Carlos Alberto Torres",
      pos: "RB", alt: ["CB", "RWB"], nation: "Brazil", flag: "🇧🇷",
      club: "Santos", era: "1970", foot: "Right", weak: 3, skills: 4,
      height: 180, weight: 78, age: 26, wr: "High / High",
      main: { PAC: 89, SHO: 78, PAS: 86, DRI: 84, DEF: 92, PHY: 88 },
      sub: {
        acceleration: 88, sprint: 90, positioning: 72, finishing: 74,
        shotPower: 92, longShots: 84, volleys: 70, penalties: 74,
        vision: 86, crossing: 90, fkAccuracy: 76, shortPass: 88,
        longPass: 86, curve: 82, agility: 84, balance: 86,
        reactions: 90, ballControl: 86, dribbling: 84, composure: 92,
        interceptions: 90, heading: 80, defAwareness: 90, standTackle: 92,
        slideTackle: 88, jumping: 82, stamina: 94, strength: 86, aggression: 82
      },
      playstyles: ["Whipped Pass+", "Relentless+", "Power Shot", "Jockey"],
      traits: ["O Capitão", "Greatest World Cup goal", "Overlapping full-back", "1970 captain"],
      price: "5.4M", pull: 1.2,
      back: {
        theme: "1970 Captain", c1: "#ffd400", c2: "#0057b7",
        pattern: "rays", motto: "Arrive late, strike first time.",
        serial: "ICN-18/21", sign: "Capitão 4"
      }
    }),

    G({
      id: "cech", name: "ČECH", full: "Petr Čech",
      pos: "GK", alt: [], nation: "Czech Republic", flag: "🇨🇿",
      club: "Chelsea", era: "2005–2012", foot: "Left", weak: 3, skills: 1,
      height: 196, weight: 90, age: 29, wr: "Med / Med",
      main: { DIV: 92, HAN: 94, KIC: 84, REF: 96, SPD: 62, POS: 95 },
      sub: {
        diving: 92, handling: 94, kicking: 84, reflexes: 96,
        gkSpeed: 62, gkPositioning: 95, oneOnOne: 95, penaltySave: 92,
        crossClaim: 94, sweeperKeeper: 74, longThrow: 86, punching: 90,
        composure: 97, reactions: 96, aggression: 46, jumping: 84,
        strength: 88, stamina: 82, vision: 78, shortPass: 78, longPass: 84
      },
      playstyles: ["Cross Claimer+", "Far Reach+", "Footwork+", "1v1 Close Down"],
      traits: ["The Helmet", "1025 minutes unbeaten", "Munich 2012 shootout", "Calm as concrete"],
      price: "4.8M", pull: 1.4,
      back: {
        theme: "The Wall", c1: "#034694", c2: "#d1d5db",
        pattern: "shield", motto: "Nothing gets past a calm mind.",
        serial: "ICN-19/21", sign: "Čech 1"
      }
    }),

    G({
      id: "yashin", name: "YASHIN", full: "Lev Ivanovich Yashin",
      pos: "GK", alt: [], nation: "Russia", flag: "🇷🇺",
      club: "Dynamo Moscow", era: "1956–1966", foot: "Right", weak: 3, skills: 1,
      height: 189, weight: 82, age: 33, wr: "High / Med",
      main: { DIV: 96, HAN: 92, KIC: 82, REF: 97, SPD: 64, POS: 94 },
      sub: {
        diving: 96, handling: 92, kicking: 82, reflexes: 97,
        gkSpeed: 64, gkPositioning: 94, oneOnOne: 96, penaltySave: 97,
        crossClaim: 92, sweeperKeeper: 88, longThrow: 84, punching: 94,
        composure: 95, reactions: 97, aggression: 62, jumping: 92,
        strength: 84, stamina: 86, vision: 82, shortPass: 74, longPass: 80
      },
      playstyles: ["Far Throw+", "Rush Out+", "Deflector+", "Quick Reflexes"],
      traits: ["Black Spider", "Only GK with Ballon d'Or", "150+ penalties saved", "The flat cap"],
      price: "5.1M", pull: 1.3,
      back: {
        theme: "Black Spider", c1: "#0f1115", c2: "#00f2ff",
        pattern: "web", motto: "Eight arms, one goal to protect.",
        serial: "ICN-20/21", sign: "Yashin 1"
      }
    }),

    P({
      id: "ibrahimovic", name: "IBRAHIMOVIĆ", full: "Zlatan Ibrahimović",
      pos: "ST", alt: ["CF"], nation: "Sweden", flag: "🇸🇪",
      club: "Paris Saint-Germain", era: "2012–2016", foot: "Right", weak: 4, skills: 5,
      height: 195, weight: 95, age: 32, wr: "Med / Low",
      main: { PAC: 84, SHO: 96, PAS: 84, DRI: 90, DEF: 45, PHY: 96 },
      sub: {
        acceleration: 80, sprint: 86, positioning: 94, finishing: 96,
        shotPower: 97, longShots: 92, volleys: 97, penalties: 94,
        vision: 86, crossing: 78, fkAccuracy: 90, shortPass: 86,
        longPass: 80, curve: 88, agility: 86, balance: 88,
        reactions: 94, ballControl: 92, dribbling: 89, composure: 96,
        interceptions: 38, heading: 92, defAwareness: 34, standTackle: 42,
        slideTackle: 36, jumping: 90, stamina: 84, strength: 96, aggression: 88
      },
      playstyles: ["Acrobatic+", "Power Shot+", "Aerial+", "Trickster"],
      traits: ["Taekwondo volleys", "Zlatan mentality", "Impossible angles", "Target man with silk"],
      price: "6.2M", pull: 1.0,
      back: {
        theme: "I Am Zlatan", c1: "#004170", c2: "#fecc02",
        pattern: "crown", motto: "Lions don't compare themselves with humans.",
        serial: "ICN-21/21", sign: "Zlatan 10"
      }
    })
  ];

  /* ---------------- derived indices & small query helpers ---------------- */
  var byId = {};
  CARDS.forEach(function (c) { byId[c.id] = c; });

  window.MVM_CARDS = {
    all: CARDS,
    byId: byId,
    count: CARDS.length,
    get: function (id) { return byId[id] || null; },
    byPos: function (pos) {
      return CARDS.filter(function (c) {
        return c.pos === pos || c.alt.indexOf(pos) !== -1;
      });
    },
    byNation: function (n) {
      return CARDS.filter(function (c) { return c.nation === n; });
    },
    positions: (function () {
      var s = [];
      CARDS.forEach(function (c) { if (s.indexOf(c.pos) === -1) { s.push(c.pos); } });
      return s;
    })(),
    /* weighted random pull used by the pack-opening screen */
    random: function () {
      var total = 0, i;
      for (i = 0; i < CARDS.length; i++) { total += CARDS[i].pull; }
      var r = Math.random() * total;
      for (i = 0; i < CARDS.length; i++) {
        r -= CARDS[i].pull;
        if (r <= 0) { return CARDS[i]; }
      }
      return CARDS[0];
    }
  };
})();
