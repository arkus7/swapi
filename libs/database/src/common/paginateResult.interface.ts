
export interface PaginateResult<T> {
  results: T[];
  previous?: string;
  hasPrevious: boolean;
  next?: string;
  hasNext: boolean;
}
