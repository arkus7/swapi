import { LocationWhereInput } from 'apps/swapi-graphql/src/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class LocationWhereInputDto extends LocationWhereInput {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsMongoId()
  film?: string;

  @IsOptional()
  @IsNotEmpty()
  climate?: string;

  @IsOptional()
  @IsNotEmpty()
  terrain?: string;
}
