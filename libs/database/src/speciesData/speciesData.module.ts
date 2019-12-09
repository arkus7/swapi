import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { speciesDataProviders } from './speciesData.providers';
import { SpeciesDataService } from './speciesData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...speciesDataProviders,
    SpeciesDataService,
  ],
  exports: [
    SpeciesDataService,
  ],
})
export class SpeciesDataModule { }
