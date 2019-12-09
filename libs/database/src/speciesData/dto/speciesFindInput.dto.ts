import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { SpeciesFindInput, SpeciesWhereInput } from '../../../../../apps/swapi-graphql/src/graphql';
import { SpeciesPaginateInputDto } from './speciesPaginateInput.dto';

export class SpeciesFindInputDto extends SpeciesFindInput {
  @ValidateNested()
  @Type(() => SpeciesPaginateInputDto)
  paginate?: SpeciesPaginateInputDto;

  @ValidateNested()
  @Type(() => SpeciesWhereInput)
  filter?: SpeciesWhereInput;

  static default(): SpeciesFindInputDto {
    return {
      paginate: {},
      filter: {},
    };
  }
}
