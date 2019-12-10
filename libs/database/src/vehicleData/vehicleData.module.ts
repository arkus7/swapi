import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { vehicleDataProviders } from './vehicleData.providers';
import { VehicleDataService } from './vehicleData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...vehicleDataProviders,
    VehicleDataService,
  ],
  exports: [
    VehicleDataService,
  ],
})
export class VehicleDataModule { }
