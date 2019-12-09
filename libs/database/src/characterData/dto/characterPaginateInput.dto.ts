import { PaginateInputDto } from 'apps/swapi-graphql/src/common/paginate/paginateInput.dto';
import { IsIn } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class CharacterPaginateInputDto extends PaginateInputDto {
  @IsIn(['id', 'name'])
  sortBy?: string;
}
