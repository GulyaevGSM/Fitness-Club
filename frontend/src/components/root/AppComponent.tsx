import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppLayoutProps} from "next/app";
import {ReactNode} from "react";
import AppLayout from "../layouts/AppLayout";

const AppComponent: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({Component, pageProps}: AppLayoutProps) => {
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
            <Component {...pageProps}/>
        </AppLayout>
    )
}

export default AppComponent