import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { filmProviders } from './film.providers';
import { FilmsService } from './films.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...filmProviders,
    FilmsService,
  ],
  exports: [
    FilmsService,
  ]
})
export class FilmModule { }
