import { VehicleFindInputDto } from '@app/database/vehicleData/dto/vehicleFindInput.dto';
import { VehiclePaginateInputDto } from '@app/database/vehicleData/dto/vehiclePaginateInput.dto';
import { VehicleWhereInputDto } from '@app/database/vehicleData/dto/vehicleWhereInput.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class VehicleFindInputArgs extends VehicleFindInputDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => VehiclePaginateInputDto)
  @Field(() => VehiclePaginateInputDto)
  paginate?: VehiclePaginateInputDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleWhereInputDto)
  @Field(() => VehicleWhereInputDto)
  filter?: VehicleWhereInputDto;
}
