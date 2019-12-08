import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Controller, Get } from '@nestjs/common';

@Controller('films')
export class FilmController {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Get()
  getAllFilms(): Promise<Film[]> {
    return this.filmDataService.findAll();
  }
}
