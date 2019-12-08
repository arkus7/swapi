import { Module } from '@nestjs/common';

import { FilmDataModule } from '../../../../libs/database/src/filmData/filmData.module';
import { FilmResolvers } from './film.resolvers';

@Module({
  imports: [FilmDataModule],
  providers: [FilmResolvers],
})
export class FilmModule { }
