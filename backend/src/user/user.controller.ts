import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {RegisterUserDto} from "./dtos/register-user.dto";
import {LoginUserDto} from "./dtos/login-user.dto";
import {VerifyCodeDto} from "./dtos/verify-code.dto";
import {Request, Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {GetCurrentUserId} from "./common/decorators/get-current-user-id.decorator";

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDTO: RegisterUserDto) {
    return await this.userService.register(registerUserDTO)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({passthrough: true}) response: Response, @Req() request: Request, @Body() loginUserDTO: LoginUserDto) {
    return await this.userService.login(response, request, loginUserDTO)
  }

  @Post('verify')
  async verify(@Res({passthrough: true}) response: Response, @Req() request: Request, @Body() verifyCodeDTO: VerifyCodeDto) {
    return await this.userService.verify(response, request, verifyCodeDTO)
  }

  @Get('check')
  // @UseGuards(AuthGuard('jwt-access'))
  async checkToken(@Req() request: Request, @Res({passthrough: true}) response: Response) {
    return await this.userService.checkToken(request, response)
  }

  @Get('logout')
  async logout(@Res({passthrough: true}) response: Response, @Req() request: Request) {
    return this.userService.logout(response, request)
  }

  // `@UseGuards(AuthGuard('jwt-access'))`
  @Get('test')
  async test() {
    return await this.userService.test()
  }
}
