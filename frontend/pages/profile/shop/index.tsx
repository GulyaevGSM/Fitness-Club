import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../../src/components/layouts/ProfileLayout";
import Details from "../details";
import Head from "next/head";

const Shop = () => {
    return (
        <div>
            <Head>
                <title>Магазин</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            Shop
        </div>
    );
};

export default Shop;

Shop.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
