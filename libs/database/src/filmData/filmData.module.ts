import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { filmDataProviders } from './filmData.providers';
import { FilmDataService } from './filmData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...filmDataProviders,
    FilmDataService,
  ],
  exports: [
    FilmDataService,
  ],
})
export class FilmDataModule { }
