import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {User} from "./models/user.model";
import {ConfigService} from "@nestjs/config";
import {RegisterUserDto} from "./dtos/register-user.dto";
import {MailerService} from "@nestjs-modules/mailer";
import {LoginUserDto} from "./dtos/login-user.dto";
import * as bcrypt from 'bcrypt';
import * as randomstring from "randomstring";
import {ITokens} from "./types/jwt.type";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadDataDto} from "./dtos/jwt-payload-data.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
) {}

    async register(registerUserDTO: RegisterUserDto) {
        const {email, password} = registerUserDTO

        const user = await this.userModel.findOne({ email })
        const jwtDataUser = new JwtPayloadDataDto(user)

        if(user) {
            throw new BadRequestException('Пользователь с такой почтой уже существует.')
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

        const tokens = await this.getTokens({...jwtDataUser})

        return {
            message: 'Сообщение для активации вашего личного кабинета было отправлено на вашу почту',
            user: newUser,
            ...tokens
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
        const {email, password} = loginUserDTO

        const user = await this.userModel.findOne({email})

        const jwtDataUser = new JwtPayloadDataDto(user)

        if(!user) {
            throw new BadRequestException('Неверный логин')
        }

        const comparedPassword = await bcrypt.compare(password, user.password)

        if(!comparedPassword) {
            throw new BadRequestException('Неверный пароль')
        }

        if(!user.isVerify) {
            return {
                message: 'Пожалуйста, подтвердите вашу почту.'
            }
        } else {
            const tokens = await this.getTokens({...jwtDataUser})

            return {user, ...tokens}
        }

    }

    async getTokens(jwtData): Promise<ITokens> {
        const jwtPayload = {
            jwtData
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('ACCESS_SECRET'),
                expiresIn: '20s'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('REFRESH_SECRET'),
                expiresIn: '7d'
            })
        ])

        return {
            accessToken,
            refreshToken
        }
    }

    async test() {

    }
}
