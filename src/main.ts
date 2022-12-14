import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Env settings
  const appConfig = app.get(ConfigService);

  // Config for Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Cookie parser
  app.use(cookieParser());

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Config for Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('탁. 타닥. 탁탁.')
    .setDescription('The API description for TADAK')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // CORS
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://tadak.dev',
      'https://www.tadak.dev',
      'https://taktadaktaktak.gdscapp-test.kingo.dev',
    ],
  });

  console.log(`==== Running as ${process.env.APP_ENV} ====`);
  await app.listen(appConfig.get('app.port'));
}
bootstrap();
