import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {

    },
})

export const UserReducer = UserSlice.reducer
export const {} = UserSlice.actions