import { CharacterDataModule } from '@app/database/characterData/characterData.module';
import { Module } from '@nestjs/common';

import { CharacterController } from './character.controller';

@Module({
  imports: [CharacterDataModule],
  controllers: [CharacterController],
})
export class CharacterModule { }
