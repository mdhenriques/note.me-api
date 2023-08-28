import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './database/database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database', err);
  }

  await app.listen(3000);
}
bootstrap();
