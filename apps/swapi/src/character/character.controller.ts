import { Character } from '@app/database/characterData/character.interface';
import { CharacterDataService } from '@app/database/characterData/characterData.service';
import { CharacterFindInputDto } from '@app/database/characterData/dto/characterFindInput.dto';
import { PaginateResult } from '@app/database/common/paginateResult.interface';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterDataService: CharacterDataService) { }

  @Get()
  getAllFilms(@Query() params: CharacterFindInputDto): Promise<PaginateResult<Character>> {
    const findOptions = Object.assign(CharacterFindInputDto.default(), params);
    return this.characterDataService.findAll(findOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Character> {
    return this.characterDataService.findById(id);
  }
}
