import { Inject } from '@nestjs/common';

import { PaginatedModel, PaginateOptions } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { SpeciesFindInputDto } from './dto/speciesFindInput.dto';
import { Species } from './species.interface';
import { SPECIES_MODEL_TOKEN } from './speciesData.providers';

export class SpeciesDataService {
  constructor(@Inject(SPECIES_MODEL_TOKEN) private readonly speciesModel: PaginatedModel<Species>) { }

  async findAll(params: SpeciesFindInputDto = SpeciesFindInputDto.default()): Promise<PaginateResult<Species>> {
    const { paginate, filter } = params;

    const query: any = {};
    const { name } = filter;

    if (name) {
      query.name = {
        $regex: name,
        $options: 'i',
      };
    }

    const options: PaginateOptions = {
      query,
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      sortAscending: paginate.ascending,
      paginatedField: paginate.sortBy,
    };
    console.log('TCL: SpeciesDataService -> constructor -> options', options);

    const response = await this.speciesModel.paginate(options);

    return response;
  }

  async findById(id: string): Promise<Species> {
    return await this.speciesModel.findById(id).exec();
  }
}
