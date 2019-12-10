import { Connection } from 'mongoose';

import { DATABASE_CONNECTION_TOKEN } from '../database.providers';
import { SpeciesSchema } from './species.schema';

export const SPECIES_MODEL_TOKEN = 'SPECIES_MODEL';

export const speciesDataProviders = [
  {
    provide: SPECIES_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Species', SpeciesSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
