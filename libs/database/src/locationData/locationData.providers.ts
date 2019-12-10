import { Connection } from 'mongoose';

import { DATABASE_CONNECTION_TOKEN } from '../database.providers';
import { LocationSchema } from './location.schema';

export const LOCATION_MODEL_TOKEN = 'LOCATION_MODEL';

export const locationDataProviders = [
  {
    provide: LOCATION_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Location', LocationSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
