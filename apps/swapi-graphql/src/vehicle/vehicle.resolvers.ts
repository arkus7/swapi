import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Location } from '@app/database/locationData/location.interface';
import { LocationDataService } from '@app/database/locationData/locationData.service';
import { VehicleFindInputDto } from '@app/database/vehicleData/dto/vehicleFindInput.dto';
import { Vehicle } from '@app/database/vehicleData/vehicle.interface';
import { VehicleDataService } from '@app/database/vehicleData/vehicleData.service';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { VehicleFindInputArgs } from './args/vehicleFindInput.args';

@Resolver('Vehicle')
export class VehicleResolvers {
  constructor(
    private readonly vehicleDataService: VehicleDataService,
    private readonly locationDataService: LocationDataService,
    private readonly filmDataService: FilmDataService,
  ) { }

  @Query('vehicles')
  async getAll(@Args('params') params: VehicleFindInputArgs): Promise<PaginateResult<Vehicle>> {
    const options = Object.assign(VehicleFindInputDto.default(), params);
    return await this.vehicleDataService.findAll(options);
  }

  @Query('vehicle')
  async getById(@Args('id') id: string): Promise<Vehicle> {
    return this.vehicleDataService.findById(id);
  }

  @ResolveProperty('locations')
  async getLocations(@Parent() vehicle: Vehicle): Promise<Location[]> {
    const { locations } = vehicle;
    return Promise.all(locations.map(id => this.locationDataService.findById(id)));
  }

  @ResolveProperty('appearances')
  async getFilms(@Parent() vehicle: Vehicle): Promise<Film[]> {
    const { appearances } = vehicle;
    return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
  }
}
