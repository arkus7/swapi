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
    homeWorld: locations.tatooine,
    locations: [
      locations.tatooine,
    ],
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
      vehicles.xWingStarfighter,
      vehicles.x34LandSpeeder,
      vehicles.snowspeeder,
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
    homeWorld: locations.tatooine,
    locations: [
      locations.tatooine,
    ],
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
    homeWorld: locations.naboo,
    locations: [
      locations.naboo,
      locations.havocOutpost,
    ],
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
  },
  {
    _id: characters.darthVader,
    name: 'Darth Vader',
    description: 'Once a heroic Jedi Knight, Darth Vader was seduced by the dark side of the Force, became a Sith Lord, and led the Empire’s eradication of the Jedi Order. He remained in service of the Emperor -- the evil Darth Sidious -- for decades, enforcing his Master’s will and seeking to crush the fledgling Rebel Alliance. But there was still good in him…',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785',
    height: 203,
    mass: 89,
    hairColor: [],
    skinColor: [
      'white',
    ],
    eyeColor: [
      'yellow'
    ],
    birthYear: '42BBY',
    gender: 'male',
    homeWorld: locations.tatooine,
    locations: [
      locations.deathStar,
      locations.deathStar2
    ],
    species: species.human,
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
    ],
    vehicles: [
      vehicles.tieFighter,
    ]
  },
  {
    _id: characters.obiWanKenobi,
    name: 'Obi-Wan Kenobi',
    description: 'A legendary Jedi Master, Obi-Wan Kenobi was a noble man and gifted in the ways of the Force. He trained Anakin Skywalker, served as a general in the Republic Army during the Clone Wars, and guided Luke Skywalker as a mentor.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Obi-Wan-Kenobi_6d775533.jpeg?region=0%2C0%2C1536%2C864',
    height: 182,
    mass: 77,
    hairColor: [
      'auburn',
      'white',
    ],
    skinColor: [
      'fair'
    ],
    eyeColor: [
      'blue-gray'
    ],
    gender: 'male',
    birthYear: '57BBY',
    homeWorld: null,
    locations: [
      locations.obiWanHouse,
    ],
    species: species.human,
    appearances: [
      films.newHope,
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.thePhantomMenace,
    ],
    vehicles: []
  },
  {
    _id: characters.palpatine,
    name: 'Emperor Palpatine / Darth Sidious',
    description: 'Scheming, powerful, and evil to the core, Darth Sidious restored the Sith and destroyed the Jedi Order. Living a double life, Sidious was in fact Palpatine, a Naboo Senator and phantom menace. He slowly manipulated the political system of the Galactic Republic until he was named Supreme Chancellor -- and eventually Emperor -- ruling the galaxy through fear and tyranny.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Emperor-Palpatine_7ac4a10e.jpeg?region=0%2C0%2C1600%2C900&width=1536',
    height: 173,
    mass: 75,
    hairColor: [
      'gray',
    ],
    skinColor: [
      'fair'
    ],
    eyeColor: [
      'yellow'
    ],
    gender: 'male',
    birthYear: '82BBY',
    homeWorld: locations.naboo,
    locations: [
      locations.naboo,
      locations.deathStar2,
    ],
    species: species.human,
    appearances: [
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.thePhantomMenace,
    ],
    vehicles: [],
  },
  {
    _id: characters.hanSolo,
    name: 'Han Solo',
    description: 'Han Solo rose from an impoverished childhood on the mean streets of Corellia to become one of the heroes of the Rebel Alliance. As captain of the Millennium Falcon, Han and his co-pilot Chewbacca came to believe in the cause of galactic freedom, joining Luke Skywalker and Princess Leia Organa in the fight against the Empire. After the Battle of Endor, Han faced difficult times in a chaotic galaxy, leading to a shattering confrontation with his estranged son Ben.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=1536',
    height: 180,
    mass: 80,
    hairColor: [
      'brown',
    ],
    skinColor: [
      'fair'
    ],
    eyeColor: [
      'brown'
    ],
    gender: 'male',
    birthYear: '29BBY',
    homeWorld: locations.corellia,
    locations: [
      locations.corellia,
    ],
    species: species.human,
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.empireStrikesBack,
      films.forceAwakens,
    ],
    vehicles: [
      vehicles.millenniumFalcon,
      vehicles.theEravana
    ],
  },
  {
    _id: characters.leiaOrgana,
    name: 'Leia Organa',
    description: 'Princess Leia Organa was one of the Rebel Alliance’s greatest leaders, fearless on the battlefield and dedicated to ending the tyranny of the Empire. Daughter of Padmé Amidala and Anakin Skywalker, sister of Luke Skywalker, and with a soft spot for scoundrels, Leia ranks among the galaxy’s great heroes. But life under the New Republic has not been easy for Leia. Sidelined by a new generation of political leaders, she struck out on her own to oppose the First Order as founder of the Resistance. These setbacks in her political career have been accompanied by more personal losses.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/leia-organa-feature-image_d0f5e953.jpeg?region=0%2C0%2C1280%2C720',
    height: 150,
    mass: 49,
    hairColor: [
      'brown',
    ],
    skinColor: [
      'light'
    ],
    eyeColor: [
      'brown'
    ],
    gender: 'female',
    birthYear: '19BBY',
    homeWorld: locations.alderaan,
    locations: [
      locations.alderaan,
    ],
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
      vehicles.tantive4,
      vehicles.theRaddus
    ],
  },
  {
    _id: characters.chewbacca,
    name: 'Chewbacca',
    description: 'During his long life Chewbacca has been many things: Wookiee warrior, ace smuggler and rebel hero. Chewie fought with the Republic on Kashyyyk during the Clone Wars, then befriended Han Solo while in Imperial captivity on Mimban. After adventures on Vandor and Kessel, he became Han’s co-pilot aboard the Millennium Falcon, and eventually helped the Alliance restore freedom to the galaxy. Known for his short temper and accuracy with a bowcaster, Chewie also had a big heart – and unflagging loyalty to his friends. He stuck with Han through years of turmoil, and flew the Falcon alongside Rey after the Corellian’s death.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/chewie-main_e1968a8a.jpeg?region=131%2C0%2C951%2C536',
    height: 228,
    mass: 112,
    hairColor: [
      'brown',
    ],
    skinColor: [

    ],
    eyeColor: [
      'blue'
    ],
    gender: 'male',
    birthYear: '220BBY',
    homeWorld: locations.kashyyyk,
    locations: [
      locations.kashyyyk,
    ],
    species: species.wookiee,
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi
    ],
    vehicles: [
      vehicles.millenniumFalcon,
      vehicles.theEravana
    ],
  },
  {
    _id: characters.padme,
    name: 'Padmé Amidala',
    description: 'Padmé Amidala was a courageous, hopeful leader, serving as Queen and then Senator of Naboo -- and was also handy with a blaster. Despite her ideals and all she did for the cause of peace, her secret, forbidden marriage to Jedi Anakin Skywalker would prove to have dire consequences for the galaxy.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Padme-Amidala_05d50c8a.jpeg?region=0%2C0%2C1536%2C864',
    height: 165,
    mass: 45,
    hairColor: [
      'brown',
    ],
    skinColor: [
      'light',
    ],
    eyeColor: [
      'brown'
    ],
    gender: 'male',
    birthYear: '46BBY',
    homeWorld: locations.naboo,
    locations: [
      locations.naboo,
    ],
    species: species.human,
    appearances: [
      films.attackOfTheClones,
      films.revengeOfTheSith,
      films.thePhantomMenace,
    ],
    vehicles: [
      vehicles.nabooN1Starfighter,
      vehicles.nabooRoyalCruiser,
      vehicles.nabooRoyalStarship,
    ],
  },
  {
    _id: characters.yoda,
    name: 'Yoda',
    description: 'Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg?region=0%2C0%2C1536%2C864',
    height: 66,
    mass: 17,
    hairColor: [
      'white',
    ],
    skinColor: [
      'green',
    ],
    eyeColor: [
      'brown'
    ],
    gender: 'male',
    birthYear: '896BBY',
    homeWorld: null,
    locations: [
      locations.yodaHut,
    ],
    species: null,
    appearances: [
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.thePhantomMenace,
    ],
    vehicles: [

    ],
  },
]
