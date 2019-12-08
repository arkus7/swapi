import { FilmFindInput } from 'apps/swapi-graphql/src/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { FilmPaginateInputDto } from './filmPaginateInput.dto';
import { FilmWhereInputDto } from './filmWhereInput.dto';

export class FilmFindInputDto extends FilmFindInput {
  @ValidateNested()
  @Type(() => FilmPaginateInputDto)
  paginate?: FilmPaginateInputDto;
  @ValidateNested()
  @Type(() => FilmWhereInputDto)
  conditions?: FilmWhereInputDto;
}
