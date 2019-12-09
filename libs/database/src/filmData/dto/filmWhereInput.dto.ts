import { FilmWhereInput } from 'apps/swapi-graphql/src/graphql';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class FilmWhereInputDto extends FilmWhereInput {
  @IsOptional()
  @Min(1)
  episodeNumber?: number;

  @IsNotEmpty()
  title?: string;
}
