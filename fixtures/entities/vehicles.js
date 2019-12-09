const { vehicles, films, locations } = require('../consts');

module.exports = [
  {
    _id: vehicles.t16Skyhopper,
    name: 'T-16 Skyhopper',
    description: 'A high-performance airspeeder capable of reaching a planet’s troposphere, T-16 skyhoppers were fast and maneuverable – a combination that could be dangerous for young pilots. Luke Skywalker owned a two-man skyhopper, but burned out the instrumentation during a reckless trip through Beggar’s Canyon. He was left to play idly with a model of his beloved craft until he could make the T-16 airworthy again. The controls of a T-16 were similar to those of a T-65 X-wing, which allowed Luke to join the rebel attack on the Death Star at Yavin.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_t16skyhopper_01_169_ad69e901.jpeg?region=141%2C304%2C750%2C422',
    locations: [
      locations.tatooine
    ],
    appearances: [
      films.newHope
    ],
    dimensions: [
      'Height: 10.4m'
    ]
  },
  {
    _id: vehicles.xWingStarfighter,
    name: 'X-wing Starfighter',
    description: 'The X-wing is a versatile Rebel Alliance starfighter that balances speed with firepower. Armed with four laser cannons and two proton torpedo launchers, the X-wing can take on anything the Empire throws at it. Nimble engines give the X-wing an edge during dogfights, and it can make long-range jumps with its hyperdrive and its astromech droid co-pilot. Luke Skywalker is famous for destroying the Death Star behind the controls of an X-wing.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/X-Wing-Fighter_47c7c342.jpeg?region=0%2C1%2C1536%2C864&width=768',
    locations: [],
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.empireStrikesBack
    ],
    dimensions: [
      'Length: 13.4m'
    ]
  }
];
