import { Document } from 'mongoose';

export interface Film extends Document {
  readonly id: string;
  readonly title: string;
  readonly episodeNumber: number;
  readonly openingCrawl: string;
  readonly directors: string[];
  readonly producers: string[];
  readonly releaseDate: Date;
  readonly runTime: number;
  readonly budget: number;
  readonly posterUrl: string;
  readonly precededBy: string;
  readonly followedBy: string;
}
