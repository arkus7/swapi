import { CharacterFindInput } from 'apps/swapi-graphql/src/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CharacterPaginateInputDto } from './characterPaginateInput.dto';

export class CharacterFindInputDto extends CharacterFindInput {
  @ValidateNested()
  @Type(() => CharacterPaginateInputDto)
  paginate?: CharacterPaginateInputDto;

  static default(): CharacterFindInputDto {
    return {
      paginate: {},
    };
  }
}
