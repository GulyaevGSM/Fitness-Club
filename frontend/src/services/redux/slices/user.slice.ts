import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChangePassword, IUser} from "../../types/user.type";
import {axiosInstance} from "../../requests/instance/axios.instance";
import {IRegisterAuthData, TAuthLogin, TAuthVerifyCode} from "../../types/auth.type";

const initialState: IUser  = {
    user: null,
    loading: false,
    error: null
}

export const checkToken = createAsyncThunk(
    'user/checkToken',
    async function(_, {dispatch, rejectWithValue}) {
        try {
            const res = await axiosInstance.get('/api/user/check')
            dispatch(addUser(res.data))

            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const checkData = createAsyncThunk(
    'user/checkData',
    async function(aToken: string, {dispatch, rejectWithValue}) {
        try {
            const res = await axiosInstance.get('/api/user/checkdata', {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            console.log(res)

            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const userVerify = createAsyncThunk(
    'user/userVerify',
    async function(data: TAuthVerifyCode, {rejectWithValue, dispatch}) {
        try {
            const res = await axiosInstance.post<TAuthVerifyCode>('/api/user/verify', data)

            console.log('Verify Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async function({oldPassword, password, aToken}: IChangePassword , {dispatch, rejectWithValue}) {
        try {
            const res = await axiosInstance.post('/api/user/changepassword', {
                oldPassword,
                password
            },{
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            console.log(res)

            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async function(data: TAuthLogin, {rejectWithValue, dispatch}) {
        try {
            const res = await axiosInstance.post<IRegisterAuthData>('/api/user/login', data)
            dispatch(addUser(res.data))

            console.log('Login Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async function(_, {dispatch, rejectWithValue}) {
        try {
            const res = await axiosInstance.get('/api/user/logout')
            dispatch(clearUser(null))

            console.log('CheckUser Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<any>) {
            state.user = action.payload
        },
        clearUser(state, action: PayloadAction<any>) {
            state.user = action.payload
        }
    },
    extraReducers: {
        [checkToken.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [checkToken.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [checkToken.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [userVerify.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userVerify.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [userVerify.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [changePassword.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [changePassword.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [changePassword.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [checkData.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [checkData.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [checkData.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [logoutUser.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [logoutUser.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [logoutUser.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [userLogin.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.fulfilled.type]: (state) => {
            state.loading = false
            state.error = null
        },
        [userLogin.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const UserReducer = UserSlice.reducer
export const {addUser, clearUser} = UserSlice.actions