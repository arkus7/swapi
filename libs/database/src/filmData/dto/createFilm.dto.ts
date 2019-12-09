import { Optional } from '@nestjs/common';
import { CreateFilmInput } from 'apps/swapi-graphql/src/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFilmDto extends CreateFilmInput {
  @IsString()
  @IsNotEmpty()
  title: string;
  @Min(0)
  @Optional()
  episodeNumber?: number;
  openingCrawl: string;
  directors: string[];
  producers: string[];
  releaseDate: Date;
  runTime: number;
  budget?: number;
  posterUrl: string;
}
