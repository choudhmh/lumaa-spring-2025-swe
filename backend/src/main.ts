import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow frontend requests
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cors({ origin: 'http://localhost:5173' }));

  await app.listen(3000);
}
void bootstrap();
