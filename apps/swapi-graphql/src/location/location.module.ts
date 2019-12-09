import { FilmDataModule } from '@app/database/filmData/filmData.module';
import { LocationDataModule } from '@app/database/locationData/locationData.module';
import { Module } from '@nestjs/common';

import { LocationResolvers } from './location.resolvers';

@Module({
  imports: [LocationDataModule, FilmDataModule],
  providers: [LocationResolvers],
})
export class LocationModule { }
