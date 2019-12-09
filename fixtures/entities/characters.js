const { locations, characters, films, species, vehicles } = require('../consts');

module.exports = [
  {
    _id: characters.lukeSkywalker,
    name: 'Luke Skywalker',
    description: 'Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known. Along with his friends Princess Leia and Han Solo, Luke battled the evil Empire, discovered the truth of his parentage, and ended the tyranny of the Sith. A generation later, the location of the famed Jedi master was one of the galaxy’s greatest mysteries. Haunted by Ben Solo’s fall to evil and convinced the Jedi had to end, Luke sought exile on a distant world, ignoring the galaxy’s pleas for help. But his solitude would be interrupted – and Luke Skywalker had one final, momentous role to play in the struggle between good and evil.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_5a38c454_461eebf5.jpeg?region=0%2C0%2C1536%2C864&width=768',
    height: 172,
    mass: 77,
    hairColor: [
      'blond'
    ],
    skinColor: [
      'fair'
    ],
    eyeColor: [
      'blue'
    ],
    birthYear: '19BBY',
    gender: 'male',
    homeworld: locations.tatooine,
    species: species.human,
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi
    ],
    vehicles: [
      vehicles.t16Skyhopper,
    ]
  },
  {
    _id: characters.c3po,
    name: 'C-3PO (SEE-THREEPIO)',
    description: 'C-3PO is a droid programmed for etiquette and protocol, built by the heroic Jedi Anakin Skywalker, and a constant companion to astromech R2-D2. Over the years, he was involved in some of the galaxy’s most defining moments and thrilling battles -- and is fluent in more than seven million forms of communication. In the years after the Empire’s defeat C-3PO served Leia Organa, becoming the head of a Resistance spy ring aimed at undermining the First Order.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/c-3po-main_417a2902.jpeg?region=176%2C0%2C951%2C536&width=768',
    height: 167,
    mass: 75,
    hairColor: [],
    skinColor: [
      'gold'
    ],
    eyeColor: [
      'yellow'
    ],
    birthYear: '112BBY',
    gender: null,
    homeworld: locations.tatooine,
    species: species.droid,
    appearances: [
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi,
      films.newHope,
    ],
    vehicles: []
  },
  {
    _id: characters.r2d2,
    name: 'R2-D2',
    description: 'A resourceful astromech droid, R2-D2 served Padmé Amidala, Anakin Skywalker and Luke Skywalker in turn, showing great bravery in rescuing his masters and their friends from many perils. A skilled starship mechanic and fighter pilot\s assistant, he formed an unlikely but enduring friendship with the fussy protocol droid C-3PO.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_042e8d4f.jpeg?region=320%2C0%2C960%2C540&width=768',
    height: 96,
    mass: 32,
    hairColor: [],
    skinColor: [
      'white',
      'blue'
    ],
    eyeColor: [
      'red'
    ],
    birthYear: '33BBY',
    gender: null,
    homeworld: locations.naboo,
    species: species.droid,
    appearances: [
      films.newHope,
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi,
      films.thePhantomMenace,
    ],
    vehicles: [
      vehicles.xWingStarfighter,
    ]
  }
]
