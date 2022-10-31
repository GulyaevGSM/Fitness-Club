export interface IUser {
    user: any;
    loading: boolean;
    error: any
}

export interface ICheckData {
    success: any;
}

type TUserOptions = {
    email: string,
    password: string,
    avatar: string,
    balance: number,
    isVerify: boolean,
    name: string,
    surName: string,
    patronymic: string,
    dateOfBirth: string;
}

export interface IDataUser {
    data: TUserOptions;
    success: boolean;
}

export interface IChangePassword {
    oldPassword: string,
    password: string,
    aToken: string;
}