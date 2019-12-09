const { ObjectID } = require('mongodb');


module.exports = {
  locations: {
    tatooine: ObjectID(),
    naboo: ObjectID(),
  },
  films: {
    thePhantomMenace: ObjectID(),
    attackOfTheClones: ObjectID(),
    revengeOfTheSith: ObjectID(),
    newHope: ObjectID(),
    empireStrikesBack: ObjectID(),
    returnOfTheJedi: ObjectID(),
    forceAwakens: ObjectID(),
    lastJedi: ObjectID(),
  },
  characters: {
    lukeSkywalker: ObjectID(),
    c3po: ObjectID(),
    r2d2: ObjectID(),
    darthVader: ObjectID(),
    leiaOrgana: ObjectID(),
    owenLars: ObjectID()
  },
  species: {
    human: ObjectID(),
    droid: ObjectID(),
  },
  vehicles: {
    t16Skyhopper: ObjectID(),
    xWingStarfighter: ObjectID(),
  }
}
