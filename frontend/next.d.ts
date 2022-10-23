import type { AppProps } from "next/app";
import type { NextComponentType, NextPageContext, NextLayoutComponentType } from "next";


import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";

declare module "next"
{
    type NextLayoutComponentType <P = {}> = NextComponentType<AppContext, any, P> &
        {
            getLayout?: (page: ReactNode) => ReactNode;
        };
};

declare module "next/app"
{
    type AppLayoutProps<P = {}> = AppProps &
        {
            Component: NextLayoutComponentType;
        };
};