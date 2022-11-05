import React, {ReactNode, useEffect} from 'react';
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { AdminTempalate } from './styles/admin.style';
import Head from "next/head";

const Admin = () => {
    return (
        <AdminTempalate>
            <Head>
                <title>Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        </AdminTempalate>
    );
};

export default Admin;

Admin.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

// export const getServerSideProps = async () => {
//
//     return {
//         redirect: {
//             permanent: false,
//             destination: "/logadmin",
//         },
//         props:{},
//     };
// }