import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {User} from "./models/user.model";
import {ConfigService} from "@nestjs/config";
import {RegisterUserDto} from "./dtos/register-user.dto";
import {MailerService} from "@nestjs-modules/mailer";
import {LoginUserDto} from "./dtos/login-user.dto";
import * as bcrypt from 'bcrypt';
import * as randomstring from "randomstring";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
) {}

    async register(registerUserDTO: RegisterUserDto) {
        const {email, password} = registerUserDTO

        const user = await this.userModel.findOne({ email })
        if(user) {
            throw new ForbiddenException('Пользователь с такой почтой уже существует.')
        }

        const hashedPassword = await bcrypt.hash(password, Number(this.configService.get<any>('HASH_SALT')))
        const verifyLink = randomstring.generate(7);

        const newUser = await this.userModel.create({
            email,
            password: hashedPassword,
            verifyLink
        })

        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Активация аккаунта на GulyaevGYM',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации личного кабинета перейдите по ссылке ниже</h1>
                        <a href="${this.configService.get<string>('API_URL')}/api/user/verify/${verifyLink}">${this.configService.get<string>('API_URL')}/api/user/verify/${verifyLink}</a>
                    </div>
                `
        })

        return {
            message: 'Сообщение для активации вашего личного кабинета было отправлено на вашу почту',
            user: newUser
        }
    }

    async verify(verifyLink: string) {
        const isUserVerify = await this.userModel.findOne({ verifyLink })

        if(!isUserVerify) {
            throw new ForbiddenException('Некорректная ссылка для активации')
        }

        isUserVerify.isVerify = true
        await isUserVerify.save()
    }

    async login(loginUserDTO: LoginUserDto) {

    }

    async test() {

    }
}
