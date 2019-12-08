import { ConfigService } from '@app/config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || app.get(ConfigService).graphqlPort;
  const logger = new Logger('Swapi GraphQL');
  app.useLogger(logger);

  await app.listen(port);
  logger.log(`Swapi GraphQL listening on port ${port}`);
}
bootstrap();
