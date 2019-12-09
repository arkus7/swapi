import { Inject } from '@nestjs/common';

import { PaginatedModel, PaginateOptions } from '../common/paginated.model';
import { PaginateResult } from '../common/paginateResult.interface';
import { CreateFilmDto } from './dto/createFilm.dto';
import { FilmFindInputDto } from './dto/filmFindInput.dto';
import { Film } from './film.interface';
import { FILM_MODEL_TOKEN } from './filmData.providers';

export class FilmDataService {
  constructor(@Inject(FILM_MODEL_TOKEN) private readonly filmModel: PaginatedModel<Film>) { }

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return await createdFilm.save();
  }

  async findAll(params: FilmFindInputDto = { paginate: {}, filter: {} }): Promise<PaginateResult<Film>> {
    const { paginate, filter } = params;
    console.log('TCL: FilmDataService -> constructor -> paginate', paginate);

    const query: any = {};
    const { title, episodeNumber } = filter;

    if (title) {
      query.title = {
        $regex: title,
        $options: 'i',
      };
    }
    if (episodeNumber) {
      query.episodeNumber = episodeNumber;
    }

    const options: PaginateOptions = {
      query,
      limit: paginate.take,
      next: paginate.after,
      previous: paginate.before,
      sortAscending: paginate.ascending,
      paginatedField: paginate.sortBy,
    };
    console.log('TCL: FilmDataService -> constructor -> options', options);

    const response = await this.filmModel.paginate(options);

    return response;
    // return await this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film> {
    return await this.filmModel.findById(id).exec();
  }

  async findByEpisodeNumber(episodeNumber: number): Promise<Film> {
    return await this.filmModel.findOne({ episodeNumber }).exec();
  }
}
