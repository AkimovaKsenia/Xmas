import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation') // Название API
    .setDescription('Описание вашего API') // Описание
    .setVersion('1.0') // Версия API
    .addBearerAuth() // Добавляет поддержку JWT (если используется)
    .addCookieAuth('optional-session-id') // Добавляет поддержку cookie-аутентификации
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'], // Добавьте это
  });
  // Вот эта строка нужна для того, чтобы Swagger UI был доступен
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(4200);
}
bootstrap();
