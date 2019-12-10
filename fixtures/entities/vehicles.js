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
  },
  {
    _id: vehicles.tieFighter,
    name: 'Darth Vader\'s TIE Fighter',
    description: 'Darth Vader piloted this distinctive experimental TIE fighter above the first Death Star, using its blaster cannons and his uncanny abilities with the Force to blast Rebel starfighters into glittering fragments.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/vaders-tie-fighter_8bcb92e1.jpeg?region=0%2C147%2C1560%2C878&width=1536',
    locations: [],
    appearances: [
      films.newHope
    ],
    dimensions: [
      'Length: 9.2m'
    ]
  },
  {
    _id: vehicles.snowspeeder,
    name: 'Snowspeeder',
    description: 'When stationed on Hoth, the Rebel Alliance modified T-47 airspeeders to become snowspeeders, fast flying conveyances for patrol and defense of their hidden base. It took some doing to keep the crippling cold from permanently grounding their airforce, but Rebel ingenuity overcame the relentless Hoth elements. The T-47 airspeeder is a small, wedge-shaped craft with two forward-facing laser cannons. In its rear arc is a harpoon gun fitted with a heavy-duty tow cable. The snowspeeder is a two-man vessel, with a pilot and rear-facing tailgunner.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/snowspeeder_ef2f9334.jpeg?region=0%2C211%2C2048%2C1154&width=1536',
    locations: [],
    appearances: [
      films.empireStrikesBack
    ],
    dimensions: [
      'Length: 5.3m'
    ]
  },
  {
    _id: vehicles.x34LandSpeeder,
    name: 'X-34 LandSpeeder',
    description: 'Luke Skywalker owned one of these nondescript but speedy landspeeders, racing the sand-pocked and sun-faded craft across the desert between the Lars homestead and outposts such as Tosche Station and Anchorhead. The X-34’s powerful repulsorlift engine that allows it to float about a meter above the ground, augmented by a trio of air-cooled thrust turbines. Luke’s speeder was old and battered, and missing the port turbine’s cowling, but tinkering and careful maintenance – essential in the harsh environment of Tatooine -- kept it in good working order. After the death of his aunt and uncle, Luke sold his speeder in Mos Eisley to help pay for passage to Alderaan.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/E4D_IA_1136_6b8704fa.jpeg?region=237%2C0%2C1456%2C819',
    appearances: [
      films.newHope
    ],
    locations: [],
    dimensions: [
      'Length: 3.4m'
    ]
  },
  {
    _id: vehicles.millenniumFalcon,
    name: 'Millennium Falcon',
    description: 'Despite her humble origins and shabby exterior, the Millennium Falcon has played a role in some of the greatest victories of the Rebel Alliance and the New Republic. The Falcon looks like a worn-out junker, but beneath her hull she’s full of surprises. A succession of owners, including Lando Calrissian and Han Solo, have made special modifications that boosted the freighter’s speed, shielding and firepower to impressive – and downright illegal – levels. The price of such tinkering? The Falcon can be unpredictable, with her hyperdrive particularly balky. Despite her flaws, she’s beloved by her owners – Han Solo and Chewbacca spent years searching the galaxy for the ship they once called home, rejoicing when they finally reclaimed her.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/millennium-falcon-main-tlj-a_7cf89d3a.jpeg?region=0%2C0%2C1280%2C720',
    appearances: [
      films.newHope,
      films.returnOfTheJedi,
      films.revengeOfTheSith,
      films.empireStrikesBack,
      films.forceAwakens,
      films.lastJedi
    ],
    locations: [
      locations.corellia
    ],
    dimensions: [
      'Length: 34.75m'
    ]
  },
  {
    _id: vehicles.theEravana,
    name: 'The Eravana',
    description: 'A poor replacement for the lost Millennium Falcon, the Eravana was a Baleen-class bulk freighter used by Han Solo and Chewbacca to move cargoes – some legal, some decidedly not – across the galaxy. The massive ship’s bow section was dominated by a forward hold that doubled as a docking bay, while a transport grid created a labyrinth of cargo containers bound for various starports. After Han and Chewie retrieved the Falcon, they left the Eravana in the hands of the Guavian Death Gang.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/the-eravana_6d2aa8cb.jpeg?region=257%2C0%2C1132%2C636',
    appearances: [
      films.forceAwakens
    ],
    locations: [],
    dimensions: [
      'Length: 426.0m'
    ]
  },
  {
    _id: vehicles.tantive4,
    name: 'Tantive IV',
    description: 'Both Bail Organa and his adopted daughter Leia used this Alderaan cruiser on public missions for the Galactic Senate and secret ones for the Rebel Alliance. Leia became famous for mercy missions undertaken aboard the Tantive IV, but the Empire suspected her altruistic acts were cover for treasonous activities. After the Tantive IV intercepted rebel transmissions of the Death Star plans, Darth Vader pursued the ship, capturing the cruiser above Tatooine after a brief space battle.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_tantiveiv_01_169_1c9b8f5d.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    appearances: [
      films.newHope,
    ],
    locations: [
      locations.alderaan
    ],
    dimensions: [
      'Length: 126.68m'
    ]
  },
  {
    _id: vehicles.theRaddus,
    name: 'The Raddus',
    description: 'Named for a legendary Mon Calamari commander from the early days of the Rebel Alliance, the Raddus served as Leia Organa’s mobile headquarters and flagship of the ragtag Resistance task force fleeing D’Qar. The MC85 Star Cruiser’s experimental deflector shields could withstand massive damage before failing. That innovation proved critical when Vice Admiral Holdo jumped the cruiser to hyperspace through a First Order task force. The Raddus was destroyed, but its sacrifice bought the Resistance time to escape to Crait.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/last-jedi-databank-raddus-main-image_73540454.jpeg?region=0%2C1%2C1280%2C720',
    appearances: [
      films.lastJedi
    ],
    locations: [
      locations.dQar,
    ],
    dimensions: [
      'Length: 3438.41m'
    ]
  },
  {
    _id: vehicles.nabooN1Starfighter,
    name: 'Naboo N-1 Starfighter',
    description: 'Protecting the skies and space around Naboo is the N-1 starfighter. Its sleek design exemplifies the philosophy of art and function witnessed throughout Naboo technology. Its twin radial J-type engines are capped in gleaming chrome and trail long delicate-looking finials behind the ship\'s single-pilot compartment. Behind the pilot sits a standard astromech droid, plugged into an abbreviated, ventrally-fed socket which requires the droid to compress slightly in order to fit within the vessel\'s curves. The fighter features twin blaster cannons, twin fire-linked torpedo launchers, and a capable automatic pilot feature.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_naboon1starfighter_01_169_26691adf.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    appearances: [
      films.attackOfTheClones,
      films.returnOfTheJedi,
      films.thePhantomMenace,
    ],
    locations: [
      locations.naboo,
    ],
    dimensions: [
      'Length: 11.0m'
    ]
  },
  {
    _id: vehicles.nabooRoyalStarship,
    name: 'Naboo Royal Starship',
    description: 'The Naboo Royal Starship boasts a strikingly beautiful design that embodies the craftsmanship that prevailed in the peaceful years of the Republic. The polished, streamlined J-type 327 Nubian vessel lacks any offensive weaponry, but does feature strong shields and a competent hyperdrive. During the Trade Federation invasion of Naboo, Queen Amidala and her retinue escaped aboard the Royal Starship. Piloted by Ric Olie, the vessel narrowly avoided the Trade Federation blockade, though its hyperdrive was damaged. The ship limped to Tatooine, where a replacement T-14 hyperdrive generator was procured.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/databank_nabooroyalstarship_01_169_e61f677e.jpeg?region=0%2C0%2C1560%2C878&width=1536',
    appearances: [
      films.thePhantomMenace
    ],
    locations: [
      locations.naboo,
    ],
    dimensions: [
      'Length: 76.0m'
    ]
  },
  {
    _id: vehicles.nabooRoyalCruiser,
    name: 'Naboo Royal Cruiser',
    description: 'A custom-built J-type diplomatic barge, this chromed Naboo royal cruiser carried no armament, relying on a fighter escort for protection during space travel. Shortly before the Clone Wars, Senator Padmé Amidala’s party traveled to Coruscant aboard her royal cruiser to vote on the creation of a Republic military. The cruiser exploded on the landing pad, seemingly killing Amidala – but she had switched places with her handmaiden Cordé and so survived the assassination attempt.',
    pictureUrl: 'https://lumiere-a.akamaihd.net/v1/images/naboo-royal-cruiser_70fa0ac3.jpeg?region=191%2C0%2C1179%2C663',
    appearances: [
      films.attackOfTheClones,
    ],
    locations: [
      locations.naboo,
    ],
    dimensions: [
      'Length: 39.0m'
    ]
  },
];
