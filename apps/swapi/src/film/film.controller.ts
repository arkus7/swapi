import { Film } from '@app/database/filmData/film.interface';
import { FilmDataService } from '@app/database/filmData/filmData.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

import { PaginateResult } from '../../../../libs/database/src/common/paginateResult.interface';
import { FilmFindInputDto } from '../../../../libs/database/src/filmData/dto/filmFindInput.dto';

@Controller('films')
export class FilmController {
  constructor(private readonly filmDataService: FilmDataService) { }

  @Get()
  getAllFilms(@Query() params: FilmFindInputDto): Promise<PaginateResult<Film>> {
    const findOptions = Object.assign({ paginate: {}, conditions: {} }, params);
    return this.filmDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Film> {
    return this.filmDataService.findById(id);
  }
}
