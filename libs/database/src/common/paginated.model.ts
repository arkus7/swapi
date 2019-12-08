import { Document, Model } from 'mongoose';

import { PaginateResult } from './paginateResult.interface';

export interface PaginateOptions {
  limit?: number;
  query?: any;
  populate?: any[];
  fields?: any;
  paginatedField?: string;
  sortAscending?: boolean;
  next?: string;
  previous?: string;
}

export interface PaginatedModel<T extends Document> extends Model<T> {
  paginate(options: PaginateOptions): Promise<PaginateResult<T>>;
}

process.on('uncaughtException', (e) => console.log(e));
process.on('unhandledRejection', (e) => console.log(e));
