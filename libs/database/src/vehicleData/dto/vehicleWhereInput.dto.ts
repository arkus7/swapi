import { VehicleWhereInput } from 'apps/swapi-graphql/src/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ArgsType } from 'type-graphql';

@ArgsType()
export class VehicleWhereInputDto extends VehicleWhereInput {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsMongoId()
  location?: string;

  @IsOptional()
  @IsMongoId()
  film?: string;
}
