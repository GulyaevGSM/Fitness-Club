import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {BlogModel} from "./models/blog.model";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Blog', schema: BlogModel}])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
