const { species, locations, films } = require('../consts');

module.exports = [
  {
    _id: species.human,
    name: 'Human',
  },
  {
    _id: species.droid,
    name: 'Droid'
  },
  {
    _id: species.wookiee,
    name: 'Wookie',
    description: 'Shaggy giants from an arboreal world, the tall and commanding Wookiee species is an impressive sight to even the most jaded spacer. Despite their fearsome and savage countenance, Wookiees are intelligent, sophisticated, loyal and trusting. Loyalty and bravery are near-sacred tenets in Wookiee society. When peaceful, Wookiees are tender and gentle. Their tempers, however, are short; when angered, Wookiees can fly into a berserker rage and will not stop until the object of their distemper is sufficiently destroyed.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/wookiees-main-b_fc850c5b.jpeg?region=8%2C0%2C1543%2C868&width=1536',
    locations: [
      locations.kashyyyk,
    ],
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi,
      films.thePhantomMenace
    ],
    dimensions: [
      'Height: 2.0m'
    ]
  }
]
