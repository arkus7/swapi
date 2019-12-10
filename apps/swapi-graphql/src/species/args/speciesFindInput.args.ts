import { SpeciesPaginateInputDto } from '@app/database/speciesData/dto/speciesPaginateInput.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SpeciesFindInputArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => SpeciesPaginateInputDto)
  @Field(() => SpeciesPaginateInputDto)
  paginate?: SpeciesPaginateInputDto;
}
