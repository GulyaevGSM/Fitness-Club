import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {UserReducer} from "./slices/user.slice";
import {AuthReducer} from "./slices/auth.slice";
import {AdminReducer} from "./slices/admin.slice";

const rootReducer = combineReducers({
    UserReducer,
    AuthReducer,
    AdminReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']