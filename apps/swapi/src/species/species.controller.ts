import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { SpeciesFindInputDto } from '@app/database/speciesData/dto/speciesFindInput.dto';
import { Species } from '@app/database/speciesData/species.interface';
import { SpeciesDataService } from '@app/database/speciesData/speciesData.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesDataService: SpeciesDataService) { }

  @Get()
  getAll(@Query() params: SpeciesFindInputDto): Promise<PaginateResult<Species>> {
    const findOptions = Object.assign(SpeciesFindInputDto.default(), params);
    return this.speciesDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Species> {
    return this.speciesDataService.findById(id);
  }
}
