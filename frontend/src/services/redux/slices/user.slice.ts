import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: any = {
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export const UserReducer = UserSlice.reducer
export const {} = UserSlice.actions