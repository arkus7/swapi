import { Inject } from '@nestjs/common';

import { PaginatedModel, PaginateOptions } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { LocationFindInputDto } from './dto/locationFindInput.dto';
import { Location } from './location.interface';
import { LOCATION_MODEL_TOKEN } from './locationData.providers';

export class LocationDataService {
  constructor(@Inject(LOCATION_MODEL_TOKEN) private readonly locationModel: PaginatedModel<Location>) { }

  async findAll(params: LocationFindInputDto = LocationFindInputDto.default()): Promise<PaginateResult<Location>> {
    const { paginate, filter } = params;

    const query: any = {};
    const { name, terrain, climate, film } = filter;

    if (name) {
      query.name = {
        $regex: name,
        $options: 'i',
      };
    }

    if (terrain) {
      query.terrain = {
        $regex: terrain,
        $options: 'i',
      };
    }

    if (climate) {
      query.climate = {
        $regex: climate,
        $options: 'i',
      };
    }

    if (film) {
      query.appearances = film;
    }

    const options: PaginateOptions = {
      query,
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      sortAscending: paginate.ascending,
      paginatedField: paginate.sortBy,
    };
    console.log('TCL: LocationDataService -> constructor -> options', options);

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
