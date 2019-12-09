
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CharacterFindInput {
    paginate?: PaginateOptionsInput;
    filter?: CharacterWhereInput;
}

export class CharacterWhereInput {
    name?: string;
    film?: string;
    homeWorld?: string;
}

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
    paginate?: PaginateOptionsInput;
    filter?: FilmWhereInput;
}

export class FilmWhereInput {
    episodeNumber?: number;
    title?: string;
}

export class LocationFindInput {
    paginate?: PaginateOptionsInput;
    filter?: LocationWhereInput;
}

export class PaginateOptionsInput {
    take?: number;
    after?: string;
    before?: string;
    sortBy?: string;
    ascending?: boolean;
}

export class Character {
    id: string;
    name: string;
    pictureUrl?: string;
    height?: number;
    mass?: number;
    hairColor: string[];
    skinColor: string[];
    eyeColor: string[];
    birthYear?: string;
    gender?: string;
    homeWorld?: Location;
    appearances: Film[];
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

export class Location {
    id: string;
    name: string;
    pictureUrl?: string;
    appearances: Film[];
    climate: string[];
    terrain: string[];
}

export class LocationWhereInput {
    name?: string;
    film?: string;
    climate?: string;
    terrain?: string;
}

export abstract class IMutation {
    abstract createFilm(filmData?: CreateFilmInput): Film | Promise<Film>;
}

export class PaginatedCharacters {
    results: Character[];
    previous?: string;
    hasPrevious: boolean;
    next?: string;
    hasNext: boolean;
}

export class PaginatedFilms {
    results: Film[];
    previous?: string;
    hasPrevious: boolean;
    next?: string;
    hasNext: boolean;
}

export class PaginatedLocations {
    results: Location[];
    previous?: string;
    hasPrevious: boolean;
    next?: string;
    hasNext: boolean;
}

export abstract class IQuery {
    abstract characters(params?: CharacterFindInput): PaginatedCharacters | Promise<PaginatedCharacters>;

    abstract character(id: string): Character | Promise<Character>;

    abstract charactersFromFilm(filmId: string): Character[] | Promise<Character[]>;

    abstract films(params?: FilmFindInput): PaginatedFilms | Promise<PaginatedFilms>;

    abstract film(id: string): Film | Promise<Film>;

    abstract filmByEpisode(episodeNumber: number): Film | Promise<Film>;

    abstract locations(params?: LocationFindInput): PaginatedLocations | Promise<PaginatedLocations>;

    abstract location(id: string): Location | Promise<Location>;

    abstract locationsFromFilm(filmId: string): Location[] | Promise<Location[]>;
}
