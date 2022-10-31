import React, {ReactNode, useEffect} from 'react';
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { AdminTempalate } from './styles/admin.style';
import {Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {axiosInstance} from "../../src/services/requests/instance/axios.instance";

const Admin = ({adminCookie}: any) => {
    return (
        <AdminTempalate>

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

export const getServerSideProps = async (ctx: any) => {
    try {
        const cookies = ctx.req.headers.cookie
        const adminCookie = cookies.includes('admin')

        if(!adminCookie) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/logadmin",
                },
                props:{},
            };
        }

        return {
            props: {}
        }
    } catch (e) {
        console.log(e)
    }
}