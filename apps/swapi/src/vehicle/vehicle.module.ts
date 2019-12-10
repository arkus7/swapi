import { VehicleDataModule } from '@app/database/vehicleData/vehicleData.module';
import { Module } from '@nestjs/common';

import { VehicleController } from './vehicle.controller';

@Module({
  imports: [VehicleDataModule],
  controllers: [VehicleController],
})
export class VehicleModule { }
