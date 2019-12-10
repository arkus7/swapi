import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { LocationFindInputDto } from '@app/database/locationData/dto/locationFindInput.dto';
import { Location } from '@app/database/locationData/location.interface';
import { LocationDataService } from '@app/database/locationData/locationData.service';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { LocationFindInputArgs } from './args/locationFindInput.args';

@Resolver('Location')
export class LocationResolvers {
  constructor(
    private readonly locationDataService: LocationDataService,
    private readonly filmDataService: FilmDataService,
  ) { }

  @Query('locations')
  async getAllCharacters(@Args('params') params: LocationFindInputArgs): Promise<PaginateResult<Location>> {
    const options = Object.assign(LocationFindInputDto.default(), params);
    return await this.locationDataService.findAll(options);
  }

  @Query('location')
  async getById(@Args('id') id: string): Promise<Location> {
    return this.locationDataService.findById(id);
  }

  @Query('locationsFromFilm')
  async getLocationsFromFilm(@Args('filmId') filmId: string): Promise<Location[]> {
    return this.locationDataService.findLocationsFromFilm(filmId);
  }

  @ResolveProperty('appearances')
  async getFilmAppearances(@Parent() location: Location): Promise<Film[]> {
    const { appearances } = location;
    return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
  }
}
