import { SpeciesWhereInput } from 'apps/swapi-graphql/src/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class SpeciesWhereInputDto extends SpeciesWhereInput {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
