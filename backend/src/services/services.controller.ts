import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ServicesService } from './services.service';
import {CreateServiceDto} from "./dtos/create-service.dto";
import {EditServiceDto} from "./dtos/edit-service.dto";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getServices() {
    return await this.servicesService.getServices()
  }

  @Get('service/:serviceID')
  async getService(@Param('serviceID') serviceID: string) {
    return await this.servicesService.getService(serviceID)
  }

  @Post('edit/:serviceID')
  async editService(@Body() editServiceDTO: EditServiceDto, @Param('serviceID') serviceID: string) {
    return await this.servicesService.editService(editServiceDTO, serviceID)
  }

  @Post('create')
  async createService(@Body() createServiceDTO: CreateServiceDto) {
    return await this.servicesService.createService(createServiceDTO)
  }
}
