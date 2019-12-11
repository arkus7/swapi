import { ConfigModule } from '@app/config/config.module';
import { ConfigService } from '@app/config/config.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { CharacterModule } from './character/character.module';
import { DateScalar } from './common/scalars/date.scalar';
import { FilmModule } from './film/film.module';
import { LocationModule } from './location/location.module';
import { SpeciesModule } from './species/species.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    FilmModule,
    CharacterModule,
    LocationModule,
    SpeciesModule,
    VehicleModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          typePaths: ['./**/*.graphql'],
          debug: config.isDebug,
          playground: true,
          introspection: true,
        };
      },
    }),
  ],
  providers: [DateScalar],
})
export class AppModule { }
