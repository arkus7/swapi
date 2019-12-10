import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { PaginateOptionsInput } from '../../graphql';

export class PaginateInputDto implements PaginateOptionsInput {
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take?: number;

  @IsString()
  @IsOptional()
  after?: string;

  @IsString()
  @IsOptional()
  before?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  ascending?: boolean;
}
