import { FilmDataModule } from '@app/database/filmData/filmData.module';
import { Module } from '@nestjs/common';

import { FilmResolvers } from './film.resolvers';

@Module({
  imports: [FilmDataModule],
  providers: [FilmResolvers],
})
export class FilmModule { }
