import '../styles/globals.css'
import type {AppContext, AppInitialProps, AppLayoutProps, AppProps} from 'next/app'
import { Provider } from 'react-redux'
import AppComponent from "../src/components/root/AppComponent";
import {NextComponentType} from "next";
import {store} from "../src/services/redux/store";
import {ChakraProvider} from "@chakra-ui/react";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (props: AppLayoutProps) => {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <AppComponent {...props}/>
            </Provider>
        </ChakraProvider>
)
}

export default AppWrapper
