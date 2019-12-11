import { ConfigService } from '@app/config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || app.get(ConfigService).restPort;
  const logger = new Logger('Swapi REST');
  app.useLogger(logger);

  await app.listen(port);
  logger.log(`Swapi REST listening on port ${port}`);
}
bootstrap();
