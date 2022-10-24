import {IsString} from "class-validator";

export class VerifyLinkDto {
    @IsString()
    readonly verifyLink: string;
}