import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance} from "../../requests/instance/axios.instance";
import {IAuthState, IRegisterAuthData, TAuthLogin, TAuthRegister, TAuthVerifyCode} from "../../types/auth.type";

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

export const authVerify = createAsyncThunk(
    'auth/authVerify',
    async function(data: TAuthVerifyCode, {rejectWithValue}) {
        try {
            const res = await axiosInstance.post<TAuthVerifyCode>('/api/user/verify', data)

            console.log('Verify Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const authCheck = createAsyncThunk(
    'auth/authVerify',
    async function(_, {rejectWithValue}) {
        try {
            const res = await axiosInstance.get('/api/user/check')

            console.log('CheckUser Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

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
        [authVerify.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [authVerify.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [authVerify.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [authCheck.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [authCheck.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [authCheck.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
})

export const AuthReducer = AuthSlice.reducer
export const {} = AuthSlice.actions