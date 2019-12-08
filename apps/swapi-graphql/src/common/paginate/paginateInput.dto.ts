import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { PaginateOptions } from '../../graphql';

export class PaginateInputDto implements PaginateOptions {
  @Min(1)
  @Max(100)
  @IsOptional()
  @Transform((value) => Number(value))
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
}
