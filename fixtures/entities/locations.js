const { locations, films } = require('../consts');

module.exports = [
  {
    _id: locations.tatooine,
    name: 'Tatooine',
    description: 'A harsh desert world orbiting twin suns in the galaxy’s Outer Rim, Tatooine is a lawless place ruled by Hutt gangsters. Many settlers scratch out a living on moisture farms, while spaceport cities such as Mos Eisley and Mos Espa serve as home base for smugglers, criminals, and other rogues. Tatooine’s many dangers include sandstorms, bands of savage Tusken Raiders, and carnivorous krayt dragons. The planet is also known for its dangerous Podraces, rampant gambling, and legalized slavery. Anakin Skywalker and Luke Skywalker both grew up on Tatooine, and Obi-Wan Kenobi spent years in hiding on this desolate world.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Tatooine_36689d1b.jpeg?region=0%2C0%2C1536%2C864&width=768',
    appearances: [
      films.newHope,
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.thePhantomMenace,
    ],
    climate: [
      'Hot'
    ],
    terrain: [
      'Canyons',
      'Desserts',
      'Mesas'
    ],
  },
  {
    _id: locations.naboo,
    name: 'Naboo',
    description: 'An idyllic world close to the border of the Outer Rim Territories, Naboo is inhabited by peaceful humans known as the Naboo, and an indigenous species of intelligent amphibians called the Gungans. Naboo\'s surface consists of swampy lakes, rolling plains and green hills. Its population centers are beautiful -- Naboo\'s river cities are filled with classical architecture and greenery, while the underwater Gungan settlements are a beautiful display of exotic hydrostatic bubble technology.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C0%2C1560%2C878&width=768',
    climate: [
      'Temperate'
    ],
    terrain: [
      'Hills',
      'Plains',
      'Swamps',
      'Urban'
    ],
    appearances: [
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.thePhantomMenace,
    ]
  }
]
