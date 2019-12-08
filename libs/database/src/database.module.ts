import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/src/config.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
