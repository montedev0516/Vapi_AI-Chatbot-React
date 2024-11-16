import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://www.brightervpn.com',
      'https://brightervpn.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  console.log('SUCCESS! SERVER LISTENING TO THE PORT:', process.env.PORT);

  // const connection = mongoose.connection;

  // connection.on('connected', () => {
  //   console.log('DB connected...');
  // });

  // connection.on('error', (err) => {
  //   console.error('DB connection error:', err);
  // });

  // connection.on('disconnected', () => {
  //   console.log('DB disconnected...');
  // });

  await app.listen(process.env.PORT);
}
bootstrap();
