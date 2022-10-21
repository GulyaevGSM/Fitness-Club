import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog} from "./models/blog.model";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<Blog>
    ) {}


}
