import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ServicesModel} from "./models/services.model";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Services', schema: ServicesModel}])
  ],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
