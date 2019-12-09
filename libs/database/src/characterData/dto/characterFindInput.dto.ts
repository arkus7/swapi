import { FilmPaginateInputDto } from '@app/database/filmData/dto/filmPaginateInput.dto';
import { CharacterFindInput } from 'apps/swapi-graphql/src/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CharacterFindInputDto extends CharacterFindInput {
  @ValidateNested()
  @Type(() => FilmPaginateInputDto)
  paginate?: FilmPaginateInputDto;

  static default(): CharacterFindInputDto {
    return {
      paginate: {},
    };
  }
}
