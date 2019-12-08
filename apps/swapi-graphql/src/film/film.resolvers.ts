import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateFilmDto } from '../../../../libs/database/src/filmData/dto/createFilm.dto';
import { EpisodeNumberArgs } from './args/episodeNumber.args';

@Resolver('Film')
export class FilmResolvers {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Query('films')
  async getAllFilms(): Promise<Film[]> {
    return this.filmDataService.findAll();
  }

  @Query('film')
  async getById(@Args('id') id: string): Promise<Film> {
    return this.filmDataService.findById(id);
  }

  @Query('filmByEpisode')
  async getByEpisode(@Args() args: EpisodeNumberArgs): Promise<Film> {
    return this.filmDataService.findByEpisodeNumber(args.episodeNumber);
  }

  @Mutation()
  async createFilm(@Args('filmData') filmData: CreateFilmDto): Promise<Film> {
    return this.filmDataService.create(filmData);
  }
}
