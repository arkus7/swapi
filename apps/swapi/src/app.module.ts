import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { FilmModule } from './film/film.module';
import { LocationModule } from './location/location.module';
import { SpeciesModule } from './species/species.module';

@Module({
  imports: [FilmModule, CharacterModule, LocationModule, SpeciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
