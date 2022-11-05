import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAdmin {
    admin: boolean;
}

const initialState: IAdmin = {
    admin: false
}

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin(state) {
            state.admin = true
        }
    }
})

export const AdminReducer = AdminSlice.reducer
export const {addAdmin} = AdminSlice.actions