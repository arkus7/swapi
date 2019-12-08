import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Film')
export class FilmResolvers {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Query('films')
  async getAllFilms(): Promise<Film[]> {
    return this.filmDataService.findAll();
  }
}
