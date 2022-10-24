export type TAuthRegister = {
    email: string;
    password: string;
}

export type TAuthLogin = {
    email: string;
    password: string;
}

export type TAuthVerifyCode = {
    verifyCode: string;
}

type TUserData = {
    avatar: string;
    balance: number;
    email: string;
    isVerify: boolean;
    password: string;
    _id: string;
}

interface IDataLogin {
    accessToken: string;
    message: string;
    user: TUserData;
}

export interface ILoginAuthData {
    data: IDataLogin
}

export interface IRegisterAuthData {
    message: string;
    user: TUserData;
}