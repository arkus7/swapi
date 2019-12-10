import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { locationDataProviders } from './locationData.providers';
import { LocationDataService } from './locationData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...locationDataProviders,
    LocationDataService,
  ],
  exports: [
    LocationDataService,
  ],
})
export class LocationDataModule { }
