import { LocationDataModule } from '@app/database/locationData/locationData.module';
import { Module } from '@nestjs/common';

import { LocationController } from './location.controller';

@Module({
  imports: [LocationDataModule],
  controllers: [LocationController],
})
export class LocationModule { }
