import * as mongoose from 'mongoose';

import { ConfigService } from '../../config/src/config.service';

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_TOKEN,
    useFactory: (config: ConfigService): Promise<typeof mongoose> => {
      const { user, password, database } = config.mongoCredentials;
      return mongoose.connect(`mongodb://${user}:${password}@ds233198.mlab.com:33198/${database}`, { useNewUrlParser: true });
    },
    inject: [ConfigService],
  },
];
