const { films } = require('../consts');

module.exports = [
  {
    _id: films.thePhantomMenace,
    "title": "Star Wars: Episode I The Phantom Menace",
    episodeNumber: 1,
    "openingCrawl": "Turmoil has engulfed the\nGalactic Republic. The taxation\nof trade routes to outlying star\nsystems is in dispute.\n\nHoping to resolve the matter\nwith a blockade of deadly\nbattleships, the greedy Trade\nFederation has stopped all\nshipping to the small planet\nof Naboo.\n\nWhile the Congress of the\nRepublic endlessly debates\nthis alarming chain of events,\nthe Supreme Chancellor has\nsecretly dispatched two Jedi\nKnights, the guardians of\npeace and justice in the\ngalaxy, to settle the conflict....",
    "directors": [
      "George Lucas"
    ],
    "producers": [
      "Rick McCallum"
    ],
    "releaseDate": new Date('May 19, 1999'),
    runTime: 133,
    budget: 115000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/7/75/EPI_TPM_poster.png/revision/latest/scale-to-width-down/500?cb=20130822171446",
    "precededBy": null,
    "followedBy": films.attackOfTheClones
  },
  {
    _id: films.attackOfTheClones,
    "title": "Star Wars: Episode II Attack of the Clones",
    episodeNumber: 2,
    "openingCrawl": "There is unrest in the Galactic\nSenate. Several thousand solar\nsystems have declared their\nintentions to leave the Republic.\n\nThis separatist movement,\nunder the leadership of the\nmysterious Count Dooku, has\nmade it difficult for the limited\nnumber of Jedi Knights to maintain\npeace and order in the galaxy.\n\nSenator Amidala, the former\nQueen of Naboo, is returning\nto the Galactic Senate to vote\non the critical issue of creating\nan ARMY OF THE REPUBLIC\nto assist the overwhelmed\nJedi....",
    "directors": [
      "George Lucas"
    ],
    "producers": [
      "Rick McCallum"
    ],
    "releaseDate": new Date('May 16, 2002'),
    runTime: 142,
    budget: 120000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/d/dd/Attack-Clones-Poster.jpg/revision/latest/scale-to-width-down/500?cb=20180318125654",
    "precededBy": films.thePhantomMenace,
    "followedBy": films.revengeOfTheSith
  },
  {
    _id: films.revengeOfTheSith,
    episodeNumber: 3,
    "title": "Star Wars: Episode III Revenge of the Sith",
    "openingCrawl": "War! The Republic is crumbling\nunder attacks by the ruthless\nSith Lord, Count Dooku.\nThere are heroes on both sides.\nEvil is everywhere.\n\nIn a stunning move, the\nfiendish droid leader, General\nGrievous, has swept into the\nRepublic capital and kidnapped\nChancellor Palpatine, leader of\nthe Galactic Senate.\n\nAs the Separatist Droid Army\nattempts to flee the besieged\ncapital with their valuable\nhostage, two Jedi Knights lead a\ndesperate mission to rescue the\ncaptive Chancellor....",
    "directors": [
      "George Lucas"
    ],
    "producers": [
      "Rick McCallum"
    ],
    "releaseDate": new Date('May 19, 2005'),
    runTime: 140,
    budget: 113000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/e/e7/EPIII_RotS_poster.png/revision/latest/scale-to-width-down/500?cb=20130822174232",
    "precededBy": films.attackOfTheClones,
    "followedBy": films.newHope
  },
  {
    _id: films.newHope,
    "title": "Star Wars: Episode IV A New Hope",
    episodeNumber: 4,
    "openingCrawl": "It is a period of civil war.\nRebel spaceships, striking\nfrom a hidden base, have won\ntheir first victory against\nthe evil Galactic Empire.\n\nDuring the battle, Rebel\nspies managed to steal secret\nplans to the Empire's\nultimate weapon, the DEATH\nSTAR, an armored space\nstation with enough power\nto destroy an entire planet.\n\nPursued by the Empire's\nsinister agents, Princess\nLeia races home aboard her\nstarship, custodian of the\nstolen plans that can save her\npeople and restore\nfreedom to the galaxy....",
    "directors": [
      "George Lucas"
    ],
    "producers": [
      "Gary Kurtz",
      "Rick McCallum",
    ],
    "releaseDate": new Date('May 25, 1977'),
    runTime: 121,
    budget: 11000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/0/06/Star_Wars_Style_A_poster_1977.jpg/revision/latest/scale-to-width-down/500?cb=20100708051712",
    "precededBy": films.revengeOfTheSith,
    "followedBy": films.empireStrikesBack
  },
  {
    _id: films.empireStrikesBack,
    "title": "Star Wars: Episode V The Empire Strikes Back",
    episodeNumber: 5,
    "openingCrawl": "It is a dark time for the\nRebellion. Although the Death\nStar has been destroyed,\nImperial troops have driven the\nRebel forces from their hidden\nbase and pursued them across\nthe galaxy.\n\nEvading the dreaded Imperial\nStarfleet, a group of freedom\nfighters led by Luke Skywalker\nhas established a new secret\nbase on the remote ice world\nof Hoth.\n\nThe evil lord Darth Vader,\nobsessed with finding young\nSkywalker, has dispatched\nthousands of remote probes into\nthe far reaches of space....",
    "directors": [
      "Irvin Kershner"
    ],
    "producers": [
      "Gary Kurtz",
      "Rick McCallum",
    ],
    "releaseDate": new Date('May 21, 1980'),
    runTime: 124,
    budget: 18000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/e/e4/Empire_strikes_back_old.jpg/revision/latest/scale-to-width-down/499?cb=20161114072554",
    "precededBy": films.newHope,
    "followedBy": films.returnOfTheJedi
  },
  {
    _id: films.returnOfTheJedi,
    "title": "Star Wars: Episode VI Return of the Jedi",
    episodeNumber: 6,
    "openingCrawl": "Luke Skywalker has returned to\nhis home planet of Tatooine in\nan attempt to rescue his\nfriend Han Solo from the\nclutches of the vile gangster\nJabba the Hutt.\n\nLittle does Luke know that the\nGALACTIC EMPIRE has secretly\nbegun construction on a new\narmored space station even\nmore powerful than the first\ndreaded Death Star.\n\nWhen completed, this ultimate\nweapon will spell certain doom\nfor the small band of rebels\nstruggling to restore freedom\nto the galaxy...",
    "directors": [
      "Richard Marquand"
    ],
    "producers": [
      "Howard G. Kazanjian",
      "George Lucas",
      "Rick McCallum",
    ],
    "releaseDate": new Date('May 25, 1983'),
    runTime: 132,
    budget: 32500000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/b/b2/ReturnOfTheJediPoster1983.jpg/revision/latest/scale-to-width-down/500?cb=20170926193831",
    "precededBy": films.empireStrikesBack,
    "followedBy": films.forceAwakens,
  },
  {
    _id: films.forceAwakens,
    "title": "Star Wars: Episode VII The Force Awakens",
    episodeNumber: 7,
    "openingCrawl": "Luke Skywalker has vanished.\nIn his absence, the sinister\nFIRST ORDER has risen from\nthe ashes of the Empire\nand will not rest until\nSkywalker, the last Jedi,\nhas been destroyed.\n\nWith the support of the\nREPUBLIC, General Leia Organa\nleads a brave RESISTANCE.\nShe is desperate to find her\nbrother Luke and gain his\nhelp in restoring peace\nand justice to the galaxy.\n\nLeia has sent her most daring\npilot on a secret mission\nto Jakku, where an old ally\nhas discovered a clue to\nLuke's whereabouts....",
    "directors": [
      "J.J. Abrams"
    ],
    "producers": [
      "Kathleen Kennedy",
      "Bryan Burk",
      "John Swartz",
      "Lawrence Kasdan",
      "Simon Kinberg"
    ],
    "releaseDate": new Date('December 18, 2015'),
    runTime: 135,
    budget: 200000000,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/f/fd/Star_Wars_Episode_VII_The_Force_Awakens.jpg/revision/latest/scale-to-width-down/499?cb=20151018162823",
    "precededBy": films.returnOfTheJedi,
    "followedBy": films.lastJedi
  },
  {
    _id: films.lastJedi,
    "title": "Star Wars: Episode VIII The Last Jedi",
    episodeNumber: 8,
    "openingCrawl": "The FIRST ORDER reigns.\nHaving decimated the peaceful\nRepublic, Supreme Leader Snoke\nnow deploys his merciless\nlegions to seize military\ncontrol of the galaxy.\n\nOnly General Leia Organa's\nband of RESISTANCE fighters\nstand against the rising\ntyranny, certain that Jedi\nMaster Luke Skywalker will\nreturn and restore a spark of\nhope to the fight.\n\nBut the Resistance has been\nexposed. As the First Order\nspeeds toward the Rebel base,\nthe brave heroes mount a\ndesperate escape....",
    "directors": [
      "Rian Johnson"
    ],
    "producers": [
      "Kathleen Kennedy",
      "Ram Bergman",
      "J.J. Abrams",
      "Jason McGatlin",
      "Tom Karnowski"
    ],
    "releaseDate": new Date('December 15, 2017'),
    runTime: 152,
    budget: null,
    "posterUrl": "https://vignette.wikia.nocookie.net/starwars/images/f/fe/TheLastJediTheatricalPoster.jpeg/revision/latest/scale-to-width-down/499?cb=20171010002420",
    "precededBy": films.forceAwakens,
    "followedBy": null
  }
]
