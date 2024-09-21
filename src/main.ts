import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const port = AppModule.port || 3005;
  console.log(`App is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
