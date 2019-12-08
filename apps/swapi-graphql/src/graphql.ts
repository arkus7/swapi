
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Film {
    id: string;
    title?: string;
    episodeNumber?: number;
    openingCrawl?: string;
    directors?: string[];
    producers?: string[];
    releaseDate?: Date;
    runTime?: number;
    budget?: number;
    posterUrl?: string;
}

export abstract class IQuery {
    abstract films(): Film[] | Promise<Film[]>;
}
