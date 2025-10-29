import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const formatted = validationErrors.map((ve: any) => ({
          field: ve.property,
          constraints: ve.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Validation failed',
          details: formatted,
        });
      },
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
