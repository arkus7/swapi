import { Connection } from 'mongoose';

import { DATABASE_CONNECTION_TOKEN } from '../database.providers';
import { CharacterSchema } from './character.schema';

export const CHARACTER_MODEL_TOKEN = 'CHARACTER_MODEL';

export const characterDataProviders = [
  {
    provide: CHARACTER_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Character', CharacterSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
