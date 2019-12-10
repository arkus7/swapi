import { FilmDataModule } from '@app/database/filmData/filmData.module';
import { LocationDataModule } from '@app/database/locationData/locationData.module';
import { VehicleDataModule } from '@app/database/vehicleData/vehicleData.module';
import { Module } from '@nestjs/common';

import { VehicleResolvers } from './vehicle.resolvers';

@Module({
  imports: [VehicleDataModule, LocationDataModule, FilmDataModule],
  providers: [VehicleResolvers],
})
export class VehicleModule { }
