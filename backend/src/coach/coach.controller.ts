import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CoachService } from './coach.service';
import {CreateBlogDto} from "../blog/dtos/create-blog.dto";
import {EditBlogDto} from "../blog/dtos/edit-blog.dto";
import {AddCoachDto} from "./dtos/add-coach.dto";
import {EditCoachDto} from "./dtos/edit-coach.dto";

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Get()
  async getCoachs() {
    return await this.coachService.getCoachs()
  }

  @Post('add')
  async addCoach(@Body() addCoachDTO: AddCoachDto) {
    return await this.coachService.addCoach(addCoachDTO)
  }

  @Get('getcoach/:coachID')
  async getCoach(@Param('coachID') coachID: string) {
    return await this.coachService.getCoach(coachID)
  }

  @Post('edit/:coachID')
  async editCoach(@Body() editCoachDTO: EditCoachDto, @Param('coachID') coachID: string) {
    return await this.coachService.editCoach(editCoachDTO, coachID)
  }
}
