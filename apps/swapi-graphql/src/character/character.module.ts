import { CharacterDataModule } from '@app/database/characterData/characterData.module';
import { FilmDataModule } from '@app/database/filmData/filmData.module';
import { Module } from '@nestjs/common';

import { CharacterResolvers } from './character.resolvers';

@Module({
  imports: [CharacterDataModule, FilmDataModule],
  providers: [CharacterResolvers],
})
export class CharacterModule { }
