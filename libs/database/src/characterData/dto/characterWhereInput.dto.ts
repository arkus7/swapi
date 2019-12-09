import { CharacterWhereInput } from 'apps/swapi-graphql/src/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class CharacterWhereInputDto extends CharacterWhereInput {
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsMongoId()
  film?: string;

  @IsOptional()
  @IsMongoId()
  homeWorld?: string;
}
