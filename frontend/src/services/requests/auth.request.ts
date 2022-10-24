import {axiosInstance} from "./instance/axios.instance";
import {ILoginAuthData, IRegisterAuthData, TAuthLogin, TAuthRegister, TAuthVerifyCode} from "../types/auth.type";

const registerRequest = async (data: TAuthRegister) => {
    const res = await axiosInstance.post<IRegisterAuthData>('/api/user/register', data)

    console.log('Register Request Data => ', res)
    return res.data
}
const loginRequest = async (data: TAuthLogin) => {
    const res = await axiosInstance.post<ILoginAuthData>('/api/user/login', data)

    console.log('Login Request Data => ', res)
    return res.data
}

const verifyUserRequest = async (data: TAuthVerifyCode) => {
    const res = await axiosInstance.post('/api/user/verify', data)

    console.log('Verify Request Data => ', res)
    return res.data
}

const logoutRequest = async () => {
    // const res = await axiosInstance.post('/api/user/logout')
}

export {
    loginRequest,
    registerRequest,
    verifyUserRequest,
    logoutRequest
}
