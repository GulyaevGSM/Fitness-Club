import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance} from "../../requests/instance/axios.instance";
import {IAuthState, IRegisterAuthData, TAuthLogin, TAuthRegister} from "../../types/auth.type";

const initialState: IAuthState = {
    loading: false,
    error: null
}

export const authRegister = createAsyncThunk(
    'auth/authRegister',
    async function(data: TAuthRegister, {rejectWithValue}) {
        try {
            const res = await axiosInstance.post<IRegisterAuthData>('/api/user/register', data)

            console.log('Register Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const authLogin = createAsyncThunk(
    'auth/authLogin',
    async function(data: TAuthLogin, {rejectWithValue}) {
        try {
            const res = await axiosInstance.post<IRegisterAuthData>('/api/user/login', data)

            console.log('Login Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

//const verifyUserRequest = async (data: TAuthVerifyCode) => {
//     const res = await axiosInstance.post('/api/user/verify', data)
//
//     console.log('Verify Request Data => ', res)
//     return res.data
// }

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: {
        [authRegister.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [authRegister.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [authRegister.rejected.type]: (state, action) => {
            state.loading = false
            state.error = true
        },
        [authLogin.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [authLogin.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [authLogin.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
})

export const AuthReducer = AuthSlice.reducer
export const {} = AuthSlice.actions