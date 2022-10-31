import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../../src/components/layouts/ProfileLayout";
import Profile from "../index";
import Head from "next/head";

const Work = () => {
    return (
        <div>
            <Head>
                <title>Услуги</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
           Work
        </div>
    );
};

export default Work;

Work.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
