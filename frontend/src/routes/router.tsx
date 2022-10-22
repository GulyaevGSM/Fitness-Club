import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom"
import AppLayout from "../components/layouts/AppLayout";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../pages/Home";
import Blog from "../pages/blog/Blog";
import Admin from "../pages/admin/admin";
import AdminLayout from "../components/layouts/AdminLayout";
import ProfileLayout from "../components/layouts/ProfileLayout";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/404/NotFound";

export const useRouter = (auth: boolean) => {
    if(!auth) {
        return createBrowserRouter(createRoutesFromElements(
                <>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<Login />}/>
                        <Route path='/register' element={<Register />}/>
                    </Route>
                    <Route path='/admin' element={<AdminLayout />}>
                        <Route index element={<Admin />}/>
                    </Route>
                    <Route path='*' element={<NotFound />}/>
                </>
            )
        )
    }

    return createBrowserRouter(createRoutesFromElements(
            <>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Home />}/>
                    <Route path='/blog' element={<Blog />}/>
                    <Route path='/admin' element={<Admin />}/>
                </Route>
                <Route path='/profile' element={<ProfileLayout />}>
                    <Route index element={<Profile />}/>
                </Route>
                <Route path='*' element={<NotFound />}/>
            </>
        )
    )
}
