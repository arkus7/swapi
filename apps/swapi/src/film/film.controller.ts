import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { FilmFindInputDto } from '@app/database/filmData/dto/filmFindInput.dto';
import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('films')
export class FilmController {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Get()
  getAllFilms(@Query() params: FilmFindInputDto): Promise<PaginateResult<Film>> {
    const findOptions = Object.assign(FilmFindInputDto.default(), params);
    return this.filmDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Film> {
    return this.filmDataService.findById(id);
  }
}
