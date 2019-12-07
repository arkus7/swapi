import * as mongoose from 'mongoose';

const MONGODB_USER = 'swapi-dev-user';
const MONGODB_PASSWORD = 'swapi-dev1';

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_TOKEN,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds233198.mlab.com:33198/swapi-dev`),
  },
];
