import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow frontend requests
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only your frontend
    credentials: true, // Allow cookies if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
