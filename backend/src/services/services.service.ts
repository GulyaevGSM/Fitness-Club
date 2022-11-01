import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Services} from "./models/services.model";
import {CreateServiceDto} from "./dtos/create-service.dto";
import {EditServiceDto} from "./dtos/edit-service.dto";

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel('Services') private readonly servicesModel: Model<Services>
    ) {}

    async getServices() {
        const services = await this.servicesModel.find()

        if(!services) throw new BadRequestException('Ошибка вывода услуг')

        return services
    }

    async getService(serviceID: string) {
        const service = await this.servicesModel.findById(serviceID)

        if(!serviceID) throw new BadRequestException('Ошибка получения услуги')

        return service
    }

    async editService(editServiceDTO: EditServiceDto, serviceID: string) {
        const editService = await this.servicesModel.findByIdAndUpdate(serviceID, {
            $set: {
                ...editServiceDTO
            }
        })

        if(!editService) throw new BadRequestException('Ошибка при изменении услуги')

        return editService
    }

    async createService(createServiceDTO: CreateServiceDto) {
        const newService = await this.servicesModel.create({...createServiceDTO})

        if(!newService) throw new BadRequestException('Ошибка создания услуги')

        return newService
    }
}
