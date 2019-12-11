const Fixtures = require('node-mongodb-fixtures');
const path = require('path');

const fixtures = new Fixtures({
  dir: path.resolve(__dirname, 'entities'),
  mute: false,
});

fixtures
  .connect('mongodb://localhost:27018/swapi-dev')
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .then(() => fixtures.disconnect());
