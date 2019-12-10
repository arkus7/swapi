import { LocationPaginateInputDto } from '@app/database/locationData/dto/locationPaginateInput.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LocationFindInputArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationPaginateInputDto)
  @Field(() => LocationPaginateInputDto)
  paginate?: LocationPaginateInputDto;
}
