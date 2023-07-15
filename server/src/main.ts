/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Enable Cors
  // const corsOptions: CorsOptions = {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  //   credentials: true,
  // }

  app.enableCors({
    origin: 'http://localhost:3000'
  });

  await app.listen(3001);
}
bootstrap();
