import { FilmPaginateInputDto } from '@app/database/filmData/dto/filmPaginateInput.dto';
import { FilmWhereInputDto } from '@app/database/filmData/dto/filmWhereInput.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class FilmFindInputArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilmPaginateInputDto)
  @Field(() => FilmPaginateInputDto)
  paginate?: FilmPaginateInputDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilmWhereInputDto)
  @Field(() => FilmWhereInputDto)
  filter?: FilmWhereInputDto;
}
