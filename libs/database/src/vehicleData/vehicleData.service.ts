import { Inject } from '@nestjs/common';

import { PaginatedModel, PaginateOptions } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { VehicleFindInputDto } from './dto/vehicleFindInput.dto';
import { Vehicle } from './vehicle.interface';
import { VEHICLE_MODEL_TOKEN } from './vehicleData.providers';

export class VehicleDataService {
  constructor(@Inject(VEHICLE_MODEL_TOKEN) private readonly vehicleModel: PaginatedModel<Vehicle>) { }

  async findAll(params: VehicleFindInputDto = VehicleFindInputDto.default()): Promise<PaginateResult<Vehicle>> {
    const { paginate, filter } = params;

    const query: any = {};
    const { name, film, location } = filter;

    if (name) {
      query.name = {
        $regex: name,
        $options: 'i',
      };
    }

    if (film) {
      query.appearances = film;
    }

    if (location) {
      query.locations = location;
    }

    const options: PaginateOptions = {
      query,
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      sortAscending: paginate.ascending,
      paginatedField: paginate.sortBy,
    };
    console.log('TCL: VehicleDataService -> constructor -> options', options);

    const response = await this.vehicleModel.paginate(options);

    return response;
  }

  async findById(id: string): Promise<Vehicle> {
    return await this.vehicleModel.findById(id).exec();
  }
}
