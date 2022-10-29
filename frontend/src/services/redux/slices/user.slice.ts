import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/user.type";
import {axiosInstance} from "../../requests/instance/axios.instance";
import {IRegisterAuthData, TAuthLogin} from "../../types/auth.type";
import {dispatch} from "react-hot-toast/src/core/store";

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

const initialState: IUser  = {
    user: null,
    loading: false,
    error: null
}

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