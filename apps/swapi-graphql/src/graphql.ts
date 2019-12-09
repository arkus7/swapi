
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateFilmInput {
    title: string;
    episodeNumber?: number;
    openingCrawl?: string;
    directors: string[];
    producers: string[];
    releaseDate?: Date;
    runTime?: number;
    budget?: number;
    posterUrl?: string;
    precededBy?: string;
    followedBy?: string;
}

export class FilmFindInput {
    paginate?: PaginateOptions;
    conditions?: FilmWhereInput;
}

export class FilmWhereInput {
    episodeNumber?: number;
    title?: string;
}

export class PaginateOptions {
    take?: number;
    after?: string;
    before?: string;
    sortBy?: string;
    ascending?: boolean;
}

export class Film {
    id: string;
    title: string;
    episodeNumber?: number;
    openingCrawl?: string;
    directors: string[];
    producers: string[];
    releaseDate?: Date;
    runTime?: number;
    budget?: number;
    posterUrl?: string;
    precededBy?: Film;
    followedBy?: Film;
}

export abstract class IMutation {
    abstract createFilm(filmData?: CreateFilmInput): Film | Promise<Film>;
}

export class PaginatedFilms {
    results: Film[];
    previous?: string;
    hasPrevious: boolean;
    next?: string;
    hasNext: boolean;
}

export abstract class IQuery {
    abstract films(params?: FilmFindInput): PaginatedFilms | Promise<PaginatedFilms>;

    abstract film(id: string): Film | Promise<Film>;

    abstract filmByEpisode(episodeNumber: number): Film | Promise<Film>;
}
