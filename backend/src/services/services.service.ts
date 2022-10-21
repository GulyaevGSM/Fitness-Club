import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Services} from "./models/services.model";

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel('Services') private readonly servicesModel: Model<Services>
    ) {}


}
