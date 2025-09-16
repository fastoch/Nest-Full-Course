// This first import tells our NestJS application to load the .env file before anything else
import 'dotenv/config'; // Make sure this is at the top

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
