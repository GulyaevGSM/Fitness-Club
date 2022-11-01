export class EditUserDto {
    readonly email: string;
    readonly password: string;
    readonly avatar: string;
    readonly balance: number;
    readonly verifyCode: string;
    readonly isVerify: boolean;
    readonly name: string;
    readonly surName: string;
    readonly patronymic: string;
    readonly dateOfBirth: string;
}