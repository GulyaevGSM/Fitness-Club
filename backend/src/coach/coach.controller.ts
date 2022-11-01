import {Controller, Get, Post} from '@nestjs/common';
import { CoachService } from './coach.service';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post('create')
  async createCoach() {
    return await this.coachService.createCoach()
  }

  @Get()
  async getCoaches() {
    return await this.coachService.getCoaches()
  }
}
