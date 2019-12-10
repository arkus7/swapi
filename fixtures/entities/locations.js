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
  },
  {
    _id: locations.deathStar,
    name: 'Death Star',
    description: 'The Death Star was the Empire’s ultimate weapon: a moon-sized space station with the ability to destroy an entire planet. But the Emperor and Imperial officers like Grand Moff Tarkin underestimated the tenacity of the Rebel Alliance, who refused to bow to this technological terror…',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg?region=0%2C0%2C1600%2C900&width=1536',
    climate: [],
    terrain: [],
    appearances: [
      films.newHope,
      films.revengeOfTheSith
    ]
  },
  {
    _id: locations.deathStar2,
    name: 'Death Star II',
    description: 'Hoping to crush the Rebellion once and for all, the Empire began construction of a second dreaded Death Star near Endor. But the project ran behind schedule; Death Star II was only half-finished, and the Emperor himself visited to oversee its completion.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/Death-Star-II_b5760154.jpeg?region=0%2C0%2C2160%2C1215&width=1536',
    climate: [],
    terrain: [],
    appearances: [
      films.returnOfTheJedi
    ]
  },
  {
    _id: locations.havocOutpost,
    name: 'Havoc Outpost',
    description: 'Havoc Outpost was a rebel rendezvous point. Sabine of the Ghost crew was tasked with delivering a GNK power droid, custodian of secret information, to Havoc Outpost. There, she found R2-D2 waiting, ready to bring the intel to Senator Organa.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/havoc-outpost_f3e16292.jpeg?region=0%2C0%2C1559%2C877&width=1536',
    climate: [],
    terrain: [],
    appearances: []
  },
  {
    _id: locations.obiWanHouse,
    name: 'Obi-Wan\'s House',
    description: 'After the fall of the Republic and the near-extinction of the Jedi Order, Obi-Wan Kenobi spent his exile in a simple adobe house in Tatooine’s Jundland Wastes. There, he learned to commune with the spirit of his former master Qui-Gon Jinn and watched over Anakin Skywalker’s son Luke. When Darth Vader captured Princess Leia over Tatooine, she hid the Death Star plans in R2-D2’s memory banks and gave the little droid the coordinates of Kenobi’s home.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/obi-wans-house-main-image_c9c146ef.jpeg?region=0%2C0%2C1251%2C705',
    climate: [],
    terrain: [],
    appearances: [
      films.newHope
    ]
  },
  {
    _id: locations.corellia,
    name: 'Corellia',
    description: 'An ancient world in the galactic Core, Corellia is known for its people’s wanderlust and its massive shipyards. Corellia played a key role in the expansion of galactic civilization, but that was thousands of years ago. It’s now a faded industrial planet exploited by the Empire to build TIE fighters and Star Destroyers. Corellians not born with money or influence hope to escape their homeworld in search of a better life.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/corellia-main_b70b23a7.jpeg?region=7%2C0%2C1266%2C712',
    climate: [
      'Temperate'
    ],
    terrain: [
      'Plains',
      'Urban',
      'Hills',
      'Forests'
    ],
    appearances: []
  },
  {
    _id: locations.alderaan,
    name: 'Aldeeran',
    description: 'If ever one needed an example of the irredeemable evil that was the Empire, turn to the shattered remains of Alderaan. An influential world, Alderaan was represented in the waning days of the Republic by such venerated politicians as Bail Antilles and Bail Organa. A peaceful world, Alderaan was bereft of weaponry in an era of galactic strife. It was not without spirit, however. Alderaan was one of the earliest supporters of the Alliance to Restore the Republic, though its officials prudently kept all ties to the Rebellion secret. Despite such discretion, the Empire knew it to be a haven of Rebel activity, and Grand Moff Tarkin targeted the beautiful world for reprisal as soon as the Death Star was operational. The massive primary weapon of the battle station obliterated Alderaan, leaving only a lifeless asteroid field behind.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_alderaan_01_169_4a5264e2.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    climate: [
      'Temperate'
    ],
    terrain: [
      'Grasslands',
      'Mountains'
    ],
    appearances: [
      films.newHope,
      films.revengeOfTheSith,
    ]
  },
  {
    _id: locations.dQar,
    name: 'D’Qar',
    description: 'A lush world in the Outer Rim, D’Qar is the principal base of General Leia Organa’s Resistance. First surveyed by rebel pilots before the Battle of Endor, the planet’s obscurity and lack of native intelligent life made it a perfect choice when Leia’s new group needed a hidden base of operations. Resistance starfighters launched their attack on Starkiller Base from D’Qar, and were tracked back to the planet by the First Order. The Resistance hastily evacuated, narrowly escaping before the base was leveled by First Order turbolasers.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/d-qar_ddba97b1.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    climate: [],
    terrain: [],
    appearances: [
      films.forceAwakens,
      films.lastJedi
    ],
  },
  {
    _id: locations.kashyyyk,
    name: 'Kashyyyk',
    description: 'Kashyyyk is the Wookiee homeworld, covered in dense forest. While Wookiees build their homes in the planet\'s trees, they are not a primitive species, and Kashyyyk architecture incorporates sophisticated technology. One of the last battles of the Clone Wars was fought here under the leadership of Yoda, with Wookiees and clones battling the Separatist droid army -- until the Emperor issued Order 66, commanding the clones to slaughter all Jedi. Yoda survived, however, with the help of natives Chewbacca and Tarfful, who used a hidden shuttle to evacuate the Jedi Master from the planet.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_kasyyyk_01_169_aa13a490.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    climate: [
      'Tropical',
      'Temperate'
    ],
    terrain: [
      'Jungle',
      'Forests',
      'Lakes',
      'Rivers'
    ],
    appearances: [
      films.revengeOfTheSith,
    ],
  },
  {
    _id: locations.yodaHut,
    name: 'Yoda\'s Hut',
    description: 'After Darth Sidious defeated the Jedi, Yoda retreated to the remote swamp planet of Dagobah. While in exile, he dwelled in a simple hut he built among the roots of a massive gnarltree. There, among the insects and beasts of the swamp, the great Jedi Master delved into the mysteries of the Force and waited for a new hope of renewal for the Jedi Order.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=1536',
    climate: [
    ],
    terrain: [

    ],
    appearances: [
      films.returnOfTheJedi,
      films.empireStrikesBack
    ],
  },
]
