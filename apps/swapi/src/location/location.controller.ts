import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { LocationFindInputDto } from '@app/database/locationData/dto/locationFindInput.dto';
import { Location } from '@app/database/locationData/location.interface';
import { LocationDataService } from '@app/database/locationData/locationData.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationDataService: LocationDataService) { }

  @Get()
  getAllFilms(@Query() params: LocationFindInputDto): Promise<PaginateResult<Location>> {
    const findOptions = Object.assign(LocationFindInputDto.default(), params);
    return this.locationDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Location> {
    return this.locationDataService.findById(id);
  }
}
