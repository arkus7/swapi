import { CharacterPaginateInputDto } from '@app/database/characterData/dto/characterPaginateInput.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CharacterFindInputArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => CharacterPaginateInputDto)
  @Field(() => CharacterPaginateInputDto)
  paginate?: CharacterPaginateInputDto;
}
