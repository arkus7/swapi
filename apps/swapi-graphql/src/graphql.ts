
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateFilmInput {
    title: string;
    episodeNumber?: number;
    openingCrawl: string;
    directors: string[];
    producers: string[];
    releaseDate: Date;
    runTime: number;
    budget?: number;
    posterUrl: string;
}

export class Film {
    id: string;
    title: string;
    episodeNumber?: number;
    openingCrawl: string;
    directors: string[];
    producers: string[];
    releaseDate: Date;
    runTime: number;
    budget?: number;
    posterUrl: string;
}

export abstract class IMutation {
    abstract createFilm(filmData?: CreateFilmInput): Film | Promise<Film>;
}

export abstract class IQuery {
    abstract films(): Film[] | Promise<Film[]>;

    abstract film(id: string): Film | Promise<Film>;

    abstract filmByEpisode(episodeNumber: number): Film | Promise<Film>;
}
