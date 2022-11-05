import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppLayoutProps} from "next/app";
import React, {ReactNode, useEffect, useState} from "react";
import AppLayout from "../layouts/AppLayout";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {checkToken} from "../../services/redux/slices/user.slice";
import {Triangle} from "react-loader-spinner";
import {PreloaderOverflow} from "../../../pages/register/styles/register.style";
import {useRouter} from "next/router";

const AppComponent: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({Component, pageProps}: AppLayoutProps) => {
    const {loading, error} = useAppSelector(state => state.UserReducer)
    const {admin} = useAppSelector(state => state.AdminReducer)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if(!admin && router.pathname.includes('/admin')) {
            router.push('/logadmin')
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(checkToken())
        }

        fetchUser()
    }, [])

    const getLayout = Component.getLayout || ((page: ReactNode) => page)

    if(Component.getLayout) {
        return (
            <>
                {Component.getLayout(<Component {...pageProps} />)}
            </>
        )
    }

    if(loading) {
        return (
            <PreloaderOverflow>
                <Triangle
                    height="100"
                    width="100"
                    color="#968057"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </PreloaderOverflow>
        )
    }

    return (
        <AppLayout>
            <Component {...pageProps}/>
        </AppLayout>
    )
}

export default AppComponent