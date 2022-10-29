import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppLayoutProps} from "next/app";
import React, {ReactNode, useEffect} from "react";
import AppLayout from "../layouts/AppLayout";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {checkToken} from "../../services/redux/slices/user.slice";
import {Triangle} from "react-loader-spinner";
import {PreloaderOverflow} from "../../../pages/register/styles/register.style";

const AppComponent: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({Component, pageProps}: AppLayoutProps) => {
    const {loading, error} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(checkToken())
        }

        fetchUser()
    }, [dispatch])

    const getLayout = Component.getLayout || ((page: ReactNode) => page)

    if(Component.getLayout) {
        return (
            <>
                {Component.getLayout(<Component {...pageProps} />)}
            </>
        )
    }

    return (
        <AppLayout>
            {
                loading && (
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
            <Component {...pageProps}/>
        </AppLayout>
    )
}

export default AppComponent