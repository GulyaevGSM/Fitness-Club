export class JwtPayloadDataDto {
    readonly userID: any;

    readonly email: string;
    readonly isVerify: boolean;

    constructor(data) {
        this.userID = data._id
        this.email = data.email
        this.isVerify = data.isVerify
    }
}