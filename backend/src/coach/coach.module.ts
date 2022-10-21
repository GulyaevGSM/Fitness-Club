import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {CoachModel} from "./models/coach.model";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Coach', schema: CoachModel}])
  ],
  controllers: [CoachController],
  providers: [CoachService]
})
export class CoachModule {}
