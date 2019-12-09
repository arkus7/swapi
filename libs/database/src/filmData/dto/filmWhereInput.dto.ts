import { FilmWhereInput } from 'apps/swapi-graphql/src/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class FilmWhereInputDto extends FilmWhereInput {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  episodeNumber?: number;

  @IsNotEmpty()
  @IsOptional()
  title?: string;
}
