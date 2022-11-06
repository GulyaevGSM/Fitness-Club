import {BadRequestException, Get, Injectable} from '@nestjs/common';
import {Coach} from "./models/coach.model";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateBlogDto} from "../blog/dtos/create-blog.dto";
import {EditBlogDto} from "../blog/dtos/edit-blog.dto";
import {AddCoachDto} from "./dtos/add-coach.dto";
import {EditCoachDto} from "./dtos/edit-coach.dto";

@Injectable()
export class CoachService {
    constructor(
        @InjectModel('Coach') private readonly coachModel: Model<Coach>
    ) {}

    async getCoachs() {
        const blogs = await this.coachModel.find()

        if(!blogs) throw new BadRequestException('Ошибка получения новостей')

        return blogs
    }

    async addCoach(addCoachDTO: AddCoachDto) {
        const newCoach = await this.coachModel.create({
            ...addCoachDTO
        })

        if(!newCoach) throw new BadRequestException('Ошибка добавления тренера')

        return newCoach
    }

    async getCoach(coachID: string) {
        const coach = await this.coachModel.findById(coachID)

        if(!coach) throw new BadRequestException('Ошибка поиска тренера')

        return coach
    }

    async editCoach(editCoachDTO: EditCoachDto, coachID: string) {
        const editCoach = await this.coachModel.findByIdAndUpdate(coachID, {
            $set: {
                ...editCoachDTO
            }
        })

        if(!editCoach) throw new BadRequestException('Ошибка при изменении данных тренера')

        return editCoach
    }
}
