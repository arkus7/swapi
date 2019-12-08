import { PaginateInputDto } from 'apps/swapi-graphql/src/common/paginate/paginateInput.dto';
import { IsIn } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class FilmPaginateInputDto extends PaginateInputDto {
  @IsIn(['id', 'episodeNumber', 'title', 'releaseDate'])
  sortBy?: string;
}
