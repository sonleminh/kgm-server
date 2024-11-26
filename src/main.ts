import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = 8080; // Define the port
  await app.listen(port); // Pass the port number directly

  console.log(`The server is running on http://localhost:${port}`);
}
bootstrap();
