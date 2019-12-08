import { Connection } from 'mongoose';

import { DATABASE_CONNECTION_TOKEN } from '../database.providers';
import { FilmSchema } from './film.schema';

export const FILM_MODEL_TOKEN = 'FILM_MODEL';

export const filmDataProviders = [
  {
    provide: FILM_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Film', FilmSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
