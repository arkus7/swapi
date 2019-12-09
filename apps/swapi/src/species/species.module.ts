import { SpeciesDataModule } from '@app/database/speciesData/speciesData.module';
import { Module } from '@nestjs/common';

import { SpeciesController } from './species.controller';

@Module({
  imports: [SpeciesDataModule],
  controllers: [SpeciesController],
})
export class SpeciesModule { }
