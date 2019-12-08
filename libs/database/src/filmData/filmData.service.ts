import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateFilmDto } from './dto/createFilm.dto';
import { Film } from './film.interface';
import { FILM_MODEL_TOKEN } from './filmData.providers';

export class FilmDataService {
  constructor(@Inject(FILM_MODEL_TOKEN) private readonly filmModel: Model<Film>) { }

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return await createdFilm.save();
  }

  async findAll(): Promise<Film[]> {
    return await this.filmModel.find().exec();
  }
}
