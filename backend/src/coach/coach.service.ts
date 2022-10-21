import { Injectable } from '@nestjs/common';
import {Coach} from "./models/coach.model";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class CoachService {
    constructor(
        @InjectModel('Coach') private readonly coachModel: Model<Coach>
    ) {}


}
