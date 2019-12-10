import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { SpeciesFindInputDto } from '@app/database/speciesData/dto/speciesFindInput.dto';
import { Species } from '@app/database/speciesData/species.interface';
import { SpeciesDataService } from '@app/database/speciesData/speciesData.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SpeciesFindInputArgs } from './args/speciesFindInput.args';

@Resolver('Species')
export class SpeciesResolvers {
  constructor(
    private readonly speciesDataService: SpeciesDataService,
  ) { }

  @Query('allSpecies')
  async getAllSpecies(@Args('params') params: SpeciesFindInputArgs): Promise<PaginateResult<Species>> {
    const options = Object.assign(SpeciesFindInputDto.default(), params);
    return await this.speciesDataService.findAll(options);
  }

  @Query('species')
  async getById(@Args('id') id: string): Promise<Species> {
    return this.speciesDataService.findById(id);
  }
}
