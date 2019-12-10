
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

export class LocationWhereInput {
    name?: string;
    film?: string;
    climate?: string;
    terrain?: string;
}

export class PaginateOptionsInput {
    take?: number;
    after?: string;
    before?: string;
    sortBy?: string;
    ascending?: boolean;
}

export class SpeciesFindInput {
    paginate?: PaginateOptionsInput;
    filter?: SpeciesWhereInput;
}

export class SpeciesWhereInput {
    name?: string;
}

export class VehicleFindInput {
    paginate?: PaginateOptionsInput;
    filter?: VehicleWhereInput;
}

export class VehicleWhereInput {
    name?: string;
    location?: string;
    film?: string;
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

export class PaginatedSpecies {
    results: Species[];
    previous?: string;
    hasPrevious: boolean;
    next?: string;
    hasNext: boolean;
}

export class PaginatedVehicles {
    results: Vehicle[];
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

    abstract allSpecies(params?: SpeciesFindInput): PaginatedSpecies | Promise<PaginatedSpecies>;

    abstract species(id: string): Species | Promise<Species>;

    abstract vehicles(params?: VehicleFindInput): PaginatedVehicles | Promise<PaginatedVehicles>;

    abstract vehicle(id: string): Vehicle | Promise<Vehicle>;
}

export class Species {
    id: string;
    name: string;
}

export class Vehicle {
    id: string;
    name: string;
    description?: string;
    pictureUrl?: string;
    locations: Location[];
    appearances: Film[];
    dimensions: string[];
}
