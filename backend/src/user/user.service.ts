import {BadRequestException, Injectable, Req, Res, Session} from '@nestjs/common';
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
import {ConfirmDataDto} from "./dtos/confirm-data.dto";
import {ChangePasswordDto} from "./dtos/change-password.dto";
import {TwilioService} from "nestjs-twilio";
import {Admin} from "./models/admin.model";
import {AdminCodeDto} from "./dtos/admin-code.dto";
import {find} from "rxjs";
import {GetUserDto} from "./dtos/get-user.dto";
import {EditUserDto} from "./dtos/edit-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Admin') private readonly adminModel: Model<Admin>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private readonly twilioService: TwilioService,
        private jwtService: JwtService,
) {}

    async getUser(userID: string) {
        const user = await this.userModel.findById(userID)

        if(!user) {
            throw new BadRequestException('Недействительный пользователь')
        }

        return user
    }

    async register(registerUserDTO: RegisterUserDto) {
        const {email, password} = registerUserDTO

        const user = await this.userModel.findOne({ email })

        if(user && user.isVerify) {
            throw new BadRequestException('Пользователь с такой почтой уже существует.')
        }

        if(user && !user.isVerify) {
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

            await response.cookie('accessToken', tokens.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
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

        await response.cookie('accessToken', tokens.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            message: 'Успешная активация!',
            user: isVerifyUser,
            ...tokens
        }
    }

    async checkToken(request: Request, response: Response) {
        const {accessToken} = request.cookies
        if(accessToken) {
            const decode = await this.jwtService.verify(accessToken, {
                secret: this.configService.get('ACCESS_SECRET')
            })

            return {
                user: decode,
                accessToken
            }
        }

        return
    }

    async checkUserData(userID: string) {
        //TODO дописать логику
        const user = await this.userModel.findById(userID)

        if(!user.name || !user.surName || !user.patronymic) {
            return {
                success: false
            }
        }

        return {
            success: true
        }
    }

    async confirmUserData(confirmDataDTO: ConfirmDataDto, userID: string) {
        const {name, surName, patronymic, dateOfBirth} = confirmDataDTO

        const user = await this.userModel.findByIdAndUpdate(userID, {
            surName,
            name,
            patronymic,
            dateOfBirth
        })

        if(!user) {
            throw new BadRequestException('Ошибка подтверждения данных')
        }

        return user
    }

    async changePassword(changePasswordDTO: ChangePasswordDto, userID: string) {
        const {password, oldPassword} = changePasswordDTO

        const oldPasswordUser = await this.userModel.findById(userID)

        if(!oldPasswordUser) {
            throw new BadRequestException('Ошибка изменения пароля')
        }

        const unhashedOldPassword = await bcrypt.compare(oldPassword, oldPasswordUser.password)

        if(!unhashedOldPassword) {
            throw new BadRequestException('Неверный пароль')
        }

        const hashedNewPassword = await bcrypt.hash(password, Number(this.configService.get<any>('HASH_SALT')))

        oldPasswordUser.password = hashedNewPassword
        await oldPasswordUser.save()

        return {
            message: 'Пароль изменен',
            user: oldPasswordUser
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
                expiresIn: '1d'
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

    async logout(response: Response, request: Request) {
        // Нужно будет дописать логику
        const {accessToken} = request.cookies

        if(accessToken) {
            response.clearCookie('accessToken')
        }
    }

    async admin() {
        const adminCode = await randomstring.generate(5)
        const sendSMS = await this.twilioService.client.messages.create({
            body: `Код для входа в админку: ${adminCode}`,
            from: '+18583305780',
            to: '+79788768325',
        })

        await this.adminModel.deleteMany()

        if(!sendSMS) throw new BadRequestException('Ошибка админ запроса')

        const adminModel = await this.adminModel.create({adminCode})

        return {
            admin: adminModel,
            sms: sendSMS
        }
    }

    async logAdmin(response: Response, adminCodeDTO: AdminCodeDto) {
        const {adminCode} = adminCodeDTO
        const findAdminCode = await this.adminModel.findOne({ adminCode })

        if(!findAdminCode) {
            throw new BadRequestException('Неверный код для входа в админ панель')
        }

        await response.cookie('adminCookie', 'true', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })

        return {admin: findAdminCode}
    }

    async getUsers() {
        return this.userModel.find()
    }

    async getAdminUser(getUserDTO: GetUserDto) {
        const {userID} = getUserDTO
        const user = await this.userModel.findById(userID)

        if(!user) {
            throw new BadRequestException('Недействительный пользователь')
        }

        return user
    }

    async editUser(editUserDTO: EditUserDto, userID: string) {
        const user = await this.userModel.findByIdAndUpdate(userID, {
            $set: {
                ...editUserDTO
            }
        })
        await user.save()

        if(!user) new BadRequestException('Ошибка изменения пользователя')

        return user
    }

    async test() {
        return 'test'
    }
}
