import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';
import { characterDataProviders } from './characterData.providers';
import { CharacterDataService } from './characterData.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...characterDataProviders,
    CharacterDataService,
  ],
  exports: [
    CharacterDataService,
  ],
})
export class CharacterDataModule { }
