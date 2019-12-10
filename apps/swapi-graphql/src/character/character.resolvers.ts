import { Character } from '@app/database/characterData/character.interface';
import { CharacterDataService } from '@app/database/characterData/characterData.service';
import { CharacterFindInputDto } from '@app/database/characterData/dto/characterFindInput.dto';
import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Location } from '@app/database/locationData/location.interface';
import { LocationDataService } from '@app/database/locationData/locationData.service';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { CharacterFindInputArgs } from './args/characterFindInput.args';

@Resolver('Character')
export class CharacterResolvers {
  constructor(
    private readonly characterDataService: CharacterDataService,
    private readonly filmDataService: FilmDataService,
    private readonly locationDataService: LocationDataService,
  ) { }

  @Query('characters')
  async getAllCharacters(@Args('params') params: CharacterFindInputArgs): Promise<PaginateResult<Character>> {
    const options = Object.assign(CharacterFindInputDto.default(), params);
    return await this.characterDataService.findAll(options);
  }

  @Query('character')
  async getById(@Args('id') id: string): Promise<Character> {
    return this.characterDataService.findById(id);
  }

  @Query('charactersFromFilm')
  async getCharactersFromFilm(@Args('filmId') filmId: string): Promise<Character[]> {
    return this.characterDataService.findCharactersFromFilm(filmId);
  }

  @ResolveProperty('appearances')
  async getFilmAppearances(@Parent() character: Character): Promise<Film[]> {
    const { appearances } = character;
    return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
  }

  @ResolveProperty('homeWorld')
  async getHomeWorld(@Parent() character: Character): Promise<Location> {
    const { homeWorld } = character;
    return await this.locationDataService.findById(homeWorld);
  }
}
