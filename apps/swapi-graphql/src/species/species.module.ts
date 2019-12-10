import { SpeciesDataModule } from '@app/database/speciesData/speciesData.module';
import { Module } from '@nestjs/common';

import { SpeciesResolvers } from './species.resolvers';

@Module({
  imports: [SpeciesDataModule],
  providers: [SpeciesResolvers],
})
export class SpeciesModule { }
