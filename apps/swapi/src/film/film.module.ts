import { FilmDataModule } from '@app/database/filmData/filmData.module';
import { Module } from '@nestjs/common';

import { FilmController } from './film.controller';

@Module({
  imports: [FilmDataModule],
  controllers: [FilmController],
})
export class FilmModule { }
