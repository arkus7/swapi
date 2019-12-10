import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { VehicleFindInputDto } from '@app/database/vehicleData/dto/vehicleFindInput.dto';
import { Vehicle } from '@app/database/vehicleData/vehicle.interface';
import { VehicleDataService } from '@app/database/vehicleData/vehicleData.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleDataService: VehicleDataService) { }

  @Get()
  getAll(@Query() params: VehicleFindInputDto): Promise<PaginateResult<Vehicle>> {
    const findOptions = Object.assign(VehicleFindInputDto.default(), params);
    return this.vehicleDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleDataService.findById(id);
  }
}
