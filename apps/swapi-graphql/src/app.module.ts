import { ConfigModule } from '@app/config/config.module';
import { ConfigService } from '@app/config/config.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { FilmModule } from './film/film.module';

@Module({
  imports: [
    FilmModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          typePaths: ['./**/*.graphql'],
          debug: config.isDebug,
          playground: true,
        };
      },
    }),
  ],
})
export class AppModule { }
