import {axiosInstance} from "./instance/axios.instance";
import {TAuthVerifyCode} from "../types/auth.type";

const verifyUserRequest = async (data: TAuthVerifyCode) => {
    const res = await axiosInstance.post('/api/user/verify', data)

    console.log('Verify Request Data => ', res)
    return res.data
}

export {
    verifyUserRequest,
}
