import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { BlogService } from './blog.service';
import {CreateBlogDto} from "./dtos/create-blog.dto";
import {EditBlogDto} from "./dtos/edit-blog.dto";

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs() {
    return await this.blogService.getBlogs()
  }

  @Post('create')
  async createBlog(@Body() createBlogDTO: CreateBlogDto) {
    return await this.blogService.createBlog(createBlogDTO)
  }

  @Get('getblog/:blogID')
  async getBlog(@Param('blogID') blogID: string) {
    return await this.blogService.getBlog(blogID)
  }

  @Post('edit/:blogID')
  async editBlog(@Body() editBlogDTO: EditBlogDto, @Param('blogID') blogID: string) {
    return await this.blogService.editBlog(editBlogDTO, blogID)
  }
}
