import {IsString} from "class-validator";

export class VerifyCodeDto {
    @IsString()
    readonly verifyCode: string;
}