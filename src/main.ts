import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Trading API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('crypto')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (ValidationError: ValidationError[] = []) => {
        return new BadRequestException(ValidationError);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );
  await app.listen(+process.env.APP_PORT);
}
bootstrap();
