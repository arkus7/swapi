import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { LocationFindInput } from '../../../../../apps/swapi-graphql/src/graphql';
import { LocationPaginateInputDto } from './locationPaginateInput.dto';

export class LocationFindInputDto extends LocationFindInput {
  @ValidateNested()
  @Type(() => LocationPaginateInputDto)
  paginate?: LocationPaginateInputDto;

  static default(): LocationFindInputDto {
    return {
      paginate: {},
    };
  }
}
