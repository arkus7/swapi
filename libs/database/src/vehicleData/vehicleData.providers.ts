import { Connection } from 'mongoose';

import { DATABASE_CONNECTION_TOKEN } from '../database.providers';
import { VehicleSchema } from './vehicle.schema';

export const VEHICLE_MODEL_TOKEN = 'VEHICLE_MODEL';

export const vehicleDataProviders = [
  {
    provide: VEHICLE_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Vehicle', VehicleSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
