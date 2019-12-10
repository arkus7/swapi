import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { VehicleFindInput, VehicleWhereInput } from '../../../../../apps/swapi-graphql/src/graphql';
import { VehiclePaginateInputDto } from './vehiclePaginateInput.dto';

export class VehicleFindInputDto extends VehicleFindInput {
  @ValidateNested()
  @Type(() => VehiclePaginateInputDto)
  paginate?: VehiclePaginateInputDto;

  @ValidateNested()
  @Type(() => VehicleWhereInput)
  filter?: VehicleWhereInput;

  static default(): VehicleFindInputDto {
    return {
      paginate: {},
      filter: {},
    };
  }
}
