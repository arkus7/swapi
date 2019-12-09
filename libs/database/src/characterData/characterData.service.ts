import { Inject } from '@nestjs/common';

import { PaginatedModel } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { Character } from './character.interface';
import { CHARACTER_MODEL_TOKEN } from './characterData.providers';
import { CharacterFindInputDto } from './dto/characterFindInput.dto';

export class CharacterDataService {
  constructor(@Inject(CHARACTER_MODEL_TOKEN) private readonly characterModel: PaginatedModel<Character>) { }

  async findAll(params: CharacterFindInputDto = CharacterFindInputDto.default()): Promise<PaginateResult<Character>> {
    const { paginate } = params;
    const options = {
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      paginatedField: paginate.sortBy,
    };

    const response = await this.characterModel.paginate(options);

    return response;
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
