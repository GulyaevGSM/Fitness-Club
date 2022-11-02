import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {RegisterUserDto} from "./dtos/register-user.dto";
import {LoginUserDto} from "./dtos/login-user.dto";
import {VerifyCodeDto} from "./dtos/verify-code.dto";
import {Request, Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {GetCurrentUserId} from "./common/decorators/get-current-user-id.decorator";
import {ConfirmDataDto} from "./dtos/confirm-data.dto";
import {ChangePasswordDto} from "./dtos/change-password.dto";
import {AdminCodeDto} from "./dtos/admin-code.dto";
import {GetUserDto} from "./dtos/get-user.dto";
import {EditUserDto} from "./dtos/edit-user.dto";

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  @Get('getuser')
  @UseGuards(AuthGuard('jwt-access'))
  async getUser(@GetCurrentUserId() userID: string) {
    return await this.userService.getUser(userID)
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({passthrough: true}) response: Response, @Body() registerUserDTO: RegisterUserDto) {
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

  @Get('checkdata')
  @UseGuards(AuthGuard('jwt-access'))
  async checkUserData(@GetCurrentUserId() userID: string) {
    return await this.userService.checkUserData(userID)
  }

  @Post('confirmdata')
  @UseGuards(AuthGuard('jwt-access'))
  async confirmUserData(@Body() confirmDataDTO: ConfirmDataDto, @GetCurrentUserId() userID: string) {
    return await this.userService.confirmUserData(confirmDataDTO, userID)
  }

  @Post('changepassword')
  @UseGuards(AuthGuard('jwt-access'))
  async changePassword(@Body() changePasswordDTO: ChangePasswordDto, @GetCurrentUserId() userID: string) {
    return await this.userService.changePassword(changePasswordDTO, userID)
  }

  @Get('logout')
  async logout(@Res({passthrough: true}) response: Response, @Req() request: Request) {
    return this.userService.logout(response, request)
  }

  @Get('admin')
  async admin(@Res({passthrough: true}) response: Response) {
    return await this.userService.admin(response)
  }

  @Post('logadmin')
  async logAdmin(@Res({passthrough: true}) response, @Body() adminCodeDTO: AdminCodeDto) {
    return await this.userService.logAdmin(response, adminCodeDTO)
  }

  @Get('getusers')
  async getUsers() {
    return await this.userService.getUsers()
  }

  @Post('getadminuser')
  async getAdminUser(@Body() getUserDTO: GetUserDto) {
    return await this.userService.getAdminUser(getUserDTO)
  }

  @Post('edituser/:userID')
  async editUser(@Body() editUserDTO: EditUserDto, @Param('userID') userID: string) {
    return await this.userService.editUser(editUserDTO, userID)
  }

  @Get('test')
  async test() {
    return await this.userService.test()
  }
}
