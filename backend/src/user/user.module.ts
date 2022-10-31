import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel} from "./models/user.model";
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {AccessStrategy} from "./strategies/access.strategy";
import {RefreshStrategy} from "./strategies/refresh.strategy";
import {TokenModel} from "./models/token.model";
import {TwilioModule} from "nestjs-twilio";
import {AdminModel} from "./models/admin.model";

@Module({
  imports: [
      JwtModule.register({}),
      TwilioModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              accountSid: configService.get('TWILIO_ACCOUNT_SID'),
              authToken: configService.get('TWILIO_AUTH_TOKEN'),
          }),
          inject: [ConfigService],
      }),
      MongooseModule.forFeature([{name: 'User', schema: UserModel}]),
      MongooseModule.forFeature([{name: 'Token', schema: TokenModel}]),
      MongooseModule.forFeature([{name: 'Admin', schema: AdminModel}]),
      MailerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              transport: {
                  host: configService.get('SMTP_HOST'),
                  port: configService.get('SMTP_PORT'),
                  secure: false,
                  auth: {
                      user: configService.get('SMTP_USER'),
                      pass: configService.get('SMTP_PASSWORD')
                  }
              }
          })
      })
  ],
  controllers: [UserController],
  providers: [
      UserService,
      AccessStrategy,
      RefreshStrategy
  ]
})
export class UserModule {}
