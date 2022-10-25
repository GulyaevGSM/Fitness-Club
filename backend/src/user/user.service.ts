import {BadRequestException, Injectable} from '@nestjs/common';
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
import {VerifyCodeDto} from "./dtos/verify-code.dto";
import {Request, Response} from "express";
import {Token} from "./models/token.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
) {}

    async register(registerUserDTO: RegisterUserDto) {
        const {email, password} = registerUserDTO

        const user = await this.userModel.findOne({ email })

        if(user && user.isVerify) {
            throw new BadRequestException('Пользователь с такой почтой уже существует.')
        } else {
            throw new BadRequestException({
                message: 'Введите код подтверждения, который был выслан на вашу почту при регистрации',
                needToVerify: true
            })
        }

        const hashedPassword = await bcrypt.hash(password, Number(this.configService.get<any>('HASH_SALT')))
        const verifyCode = randomstring.generate(7);

        const newUser = await this.userModel.create({
            email,
            password: hashedPassword,
            verifyCode
        })

        await this.mailerService.sendMail({
            from: this.configService.get<string>('SMTP_USER'),
            to: email,
            subject: '[GulyaevGYM] Подтверждение аккаунта',
            text: '',
            html:
                `
                    <div>
                        <h1>Код подтверждения для регистрации в личном кабинете</h1>
                        <h3>${verifyCode}</h3>
                    </div>
                `
        })

        return {
            message: 'Сообщение для активации вашего личного кабинета было отправлено на вашу почту',
            user: newUser
        }
    }

    async login(response: Response, request: Request, loginUserDTO: LoginUserDto) {
        const {email, password} = loginUserDTO

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new BadRequestException('Неверный логин')
        }

        const comparedPassword = await bcrypt.compare(password, user.password)

        if(!comparedPassword) {
            throw new BadRequestException('Неверный пароль')
        }

        if(!user.isVerify) {
            throw new BadRequestException({message: 'Пожалуйста, подтвердите вашу почту.', isVerify: false  })
        } else {
            const tokens = await this.getTokens(user._id, user.email, user.isVerify)

            await response.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            //expiresIn = 1 month

            return {
                message: 'Вы вошли в личный кабинет',
                user,
                ...tokens
            }
        }
    }

    async verify(response: Response, request: Request, verifyCodeDTO: VerifyCodeDto) {
        const {verifyCode} = verifyCodeDTO
        const isVerifyUser = await this.userModel.findOne({ verifyCode })

        if(!isVerifyUser) throw new BadRequestException('Неверный код активации')

        isVerifyUser.isVerify = true
        await isVerifyUser.save()

        const tokens = await this.getTokens(isVerifyUser._id, isVerifyUser.email, isVerifyUser.isVerify)

        await response.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            message: 'Успешная активация!',
            user: isVerifyUser,
            ...tokens
        }
    }

    async getTokens(userID, email, isVerify): Promise<ITokens> {
        const jwtPayload = {
            userID,
            email,
            isVerify
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('ACCESS_SECRET'),
                expiresIn: '2h'
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

    async logout(response: Response) {

    }

    async test() {
        return 'test'
    }
}
