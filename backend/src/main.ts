import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import {HttpExceptionFilter} from "./utils/filters/http-exception.filter";

async function bootstrap() {
  const PORT = process.env.PORT || 3001

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  // root.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
    credentials: true
  })
  app.use(cookieParser())
  app.use(
      session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        name: 'CHAT_APP_SESSION_ID',
        cookie: {
          maxAge: 86400000, // cookie expires 1 day later
        }
      })
  )
  try {
    await app.listen(PORT,
        () => console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}
bootstrap();
