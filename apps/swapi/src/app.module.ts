import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [FilmModule, CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
