import {BadRequestException, Get, Injectable, Post} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog} from "./models/blog.model";
import {CreateBlogDto} from "./dtos/create-blog.dto";
import {EditBlogDto} from "./dtos/edit-blog.dto";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<Blog>
    ) {}

    async getBlogs() {
        const blogs = await this.blogModel.find()

        if(!blogs) throw new BadRequestException('Ошибка получения новостей')

        return blogs
    }

    async createBlog(createBlogDTO: CreateBlogDto) {
        const newBlog = await this.blogModel.create({
            ...createBlogDTO
        })

        if(!newBlog) throw new BadRequestException('Ошибка создания блога')

        return newBlog
    }

    async getBlog(blogID: string) {
        const blog = await this.blogModel.findById(blogID)

        if(!blog) throw new BadRequestException('Ошибка поиска блога')

        return blog
    }

    async editBlog(editBlogDTO: EditBlogDto, blogID: string) {
        const editBlog = await this.blogModel.findByIdAndUpdate(blogID, {
            $set: {
                ...editBlogDTO
            }
        })

        if(!editBlog) throw new BadRequestException('Ошибка при изменении блога')

        return editBlog
    }
}
