import { Character } from '@app/database/characterData/character.interface';
import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { Film } from '@app/database/filmData/film.interface';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { CharacterDataService } from '../../../../libs/database/src/characterData/characterData.service';
import { CharacterFindInputDto } from '../../../../libs/database/src/characterData/dto/characterFindInput.dto';
import { FilmDataService } from '../../../../libs/database/src/filmData/filmData.service';
import { CharacterFindInputArgs } from './args/characterFindInput.args';

@Resolver('Character')
export class CharacterResolvers {
  constructor(
    private readonly characterDataService: CharacterDataService,
    private readonly filmDataService: FilmDataService,
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
}
