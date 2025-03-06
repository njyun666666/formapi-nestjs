import { AppModule } from './app.module';
import { ValidationFilter } from './common/filters/validation.filter';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
