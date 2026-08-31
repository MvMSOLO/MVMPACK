/* MVMPACK 26 - static game data taken from the reference mockup */
window.MVM_DATA = {
  player: {
    name: "GOAT_UZB",
    level: 42,
    xp: 7824,
    xpMax: 15000,
    coins: "4.2B",
    gems: "18.6K",
    energy: 320,
    energyMax: 320
  },

  screens: {
    profile: {
      title: "GOAT_UZB",
      html: "<h3>Level 42</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>XP</b><span>7824 / 15000</span></li>" +
            "<li class='screen__row'><b>Coins</b><span>4.2B</span></li>" +
            "<li class='screen__row'><b>Gems</b><span>18.6K</span></li>" +
            "<li class='screen__row'><b>Energy</b><span>320 / 320</span></li></ul>"
    },
    pack: {
      title: "PACK OPENING",
      html: "<h3>The best feeling in the game</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Legend Pack</b><span>99 OVR pull</span></li>" +
            "<li class='screen__row'><b>Gold Premium</b><span>12 players</span></li>" +
            "<li class='screen__row'><b>Icon Pack</b><span>limited</span></li></ul>"
    },
    draft: {
      title: "DRAFT",
      html: "<h3>Build your dream team</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Formation</b><span>4-3-3</span></li>" +
            "<li class='screen__row'><b>Picks</b><span>5 per slot</span></li>" +
            "<li class='screen__row'><b>Reward</b><span>up to 4 packs</span></li></ul>"
    },
    ai: {
      title: "AI MATCH",
      html: "<h3>Test your skills</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Difficulty</b><span>Legendary</span></li>" +
            "<li class='screen__row'><b>Match length</b><span>6 min</span></li>" +
            "<li class='screen__row'><b>Entry</b><span>free</span></li></ul>"
    },
    squad: {
      title: "SQUAD BUILDER",
      html: "<h3>Create. Upgrade. Dominate.</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>98 ST</b><span>RONALDO</span></li>" +
            "<li class='screen__row'><b>96 RW</b><span>MESSI</span></li>" +
            "<li class='screen__row'><b>Chemistry</b><span>100</span></li></ul>"
    },
    market: {
      title: "MARKET",
      html: "<h3>Buy &middot; Sell &middot; Trade</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>RONALDO 99</b><span>2.4M</span></li>" +
            "<li class='screen__row'><b>MESSI 96</b><span>1.8M</span></li>" +
            "<li class='screen__row'><b>MBAPPE 94</b><span>950K</span></li></ul>"
    },
    missions: {
      title: "MISSIONS",
      html: "<h3>Daily &amp; seasonal</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Open 3 packs</b><span>2 / 3</span></li>" +
            "<li class='screen__row'><b>Win an AI match</b><span>0 / 1</span></li>" +
            "<li class='screen__row'><b>Complete a draft</b><span>1 / 1</span></li></ul>"
    },
    rewards: {
      title: "REWARDS",
      html: "<h3>Claim your gifts</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Daily login</b><span>ready</span></li>" +
            "<li class='screen__row'><b>Season tier 12</b><span>locked</span></li></ul>"
    },
    tournaments: {
      title: "TOURNAMENTS",
      html: "<h3>Global ranks</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>Your rank</b><span>#1 204</span></li>" +
            "<li class='screen__row'><b>Season</b><span>26</span></li>" +
            "<li class='screen__row'><b>Prize pool</b><span>50M coins</span></li></ul>"
    },
    event: {
      title: "NEW EVENT",
      html: "<h3>Legends never die</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>RONALDO</b><span>LEGEND</span></li>" +
            "<li class='screen__row'><b>Ends in</b><span>3d 14h</span></li></ul>"
    },
    "open-pack": {
      title: "LEGEND PACK",
      html: "<h3>SIUUUI mode on</h3><ul class='screen__list'>" +
            "<li class='screen__row'><b>99 ST RONALDO</b><span>GOAT</span></li>" +
            "<li class='screen__row'><b>Guaranteed</b><span>1 x 95+ OVR</span></li></ul>"
    },
    home:      { title: "HOME",      html: "<h3>You are already here</h3>" },
    club:      { title: "MY CLUB",   html: "<h3>Squad, players and club stats</h3>" },
    transfers: { title: "TRANSFERS", html: "<h3>Transfer list and bids</h3>" },
    store:     { title: "STORE",     html: "<h3>Packs, coins and gem bundles</h3>" },
    play:      { title: "QUICK PLAY", html: "<h3>Instant match, one tap</h3>" }
  },

  toasts: {
    coins: "Coins: 4.2B",
    gems: "Gems: 18.6K",
    energy: "Energy full: 320 / 320",
    mail: "No new messages",
    leaderboard: "You are #1 204 worldwide",
    settings: "Settings coming soon"
  }
};
