import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { CreateFilmDto } from '@app/database/filmData/dto/createFilm.dto';
import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { EpisodeNumberArgs } from './args/episodeNumber.args';
import { FilmFindInputArgs } from './args/filmFindInput.args';

@Resolver('Film')
export class FilmResolvers {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Query('films')
  async getAllFilms(@Args('params') params: FilmFindInputArgs): Promise<PaginateResult<Film>> {
    const options = Object.assign({ paginate: {}, filter: {} }, params);
    return await this.filmDataService.findAll(options);
  }

  @Query('film')
  async getById(@Args('id') id: string): Promise<Film> {
    return this.filmDataService.findById(id);
  }

  @Query('filmByEpisode')
  async getByEpisode(@Args() args: EpisodeNumberArgs): Promise<Film> {
    return this.filmDataService.findByEpisodeNumber(args.episodeNumber);
  }

  @ResolveProperty('followedBy')
  async getFollowedBy(@Parent() film: Film): Promise<Film> {
    return this.filmDataService.findById(film.followedBy);
  }

  @ResolveProperty('precededBy')
  async getPrecededBy(@Parent() film: Film): Promise<Film> {
    return this.filmDataService.findById(film.precededBy);
  }

  @Mutation()
  async createFilm(@Args('filmData') filmData: CreateFilmDto): Promise<Film> {
    return this.filmDataService.create(filmData);
  }
}
