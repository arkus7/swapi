const Fixtures = require('node-mongodb-fixtures');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: 'development.env'
});

const fixtures = new Fixtures({
  dir: path.resolve(__dirname, 'entities'),
  mute: false,
});

fixtures
  .connect(process.env.MONGODB_URI)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .then(() => fixtures.disconnect());
