import { Inject } from '@nestjs/common';

import { PaginatedModel, PaginateOptions } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { Character } from './character.interface';
import { CHARACTER_MODEL_TOKEN } from './characterData.providers';
import { CharacterFindInputDto } from './dto/characterFindInput.dto';

export class CharacterDataService {
  constructor(@Inject(CHARACTER_MODEL_TOKEN) private readonly characterModel: PaginatedModel<Character>) { }

  async findAll(params: CharacterFindInputDto = CharacterFindInputDto.default()): Promise<PaginateResult<Character>> {
    const { paginate, filter } = params;

    const query: any = {};
    const { name, film, homeWorld } = filter;

    if (name) {
      query.name = {
        $regex: name,
        $options: 'i',
      };
    }
    if (film) {
      query.appearances = film;
    }
    if (homeWorld) {
      query.homeWorld = homeWorld;
    }

    const options: PaginateOptions = {
      query,
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      sortAscending: paginate.ascending,
      paginatedField: paginate.sortBy,
    };
    console.log('TCL: CharacterDataService -> constructor -> options', options);

    return await this.characterModel.paginate(options);
  }

  async findById(id: string): Promise<Character> {
    return await this.characterModel.findById(id).exec();
  }

  async findCharactersFromFilm(filmId: string): Promise<Character[]> {
    return await this.characterModel.find({
      appearances: filmId,
    });
  }
}
