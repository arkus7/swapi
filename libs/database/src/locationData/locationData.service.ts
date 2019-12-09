import { Inject } from '@nestjs/common';

import { PaginatedModel } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { LocationFindInputDto } from './dto/locationFindInput.dto';
import { Location } from './location.interface';
import { LOCATION_MODEL_TOKEN } from './locationData.providers';

export class LocationDataService {
  constructor(@Inject(LOCATION_MODEL_TOKEN) private readonly locationModel: PaginatedModel<Location>) { }

  async findAll(params: LocationFindInputDto = LocationFindInputDto.default()): Promise<PaginateResult<Location>> {
    const { paginate } = params;
    const options = {
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      paginatedField: paginate.sortBy,
    };

    const response = await this.locationModel.paginate(options);

    return response;
  }

  async findById(id: string): Promise<Location> {
    return await this.locationModel.findById(id).exec();
  }

  async findLocationsFromFilm(filmId: string): Promise<Location[]> {
    return await this.locationModel.find({
      appearances: filmId,
    });
  }
}
