import React, {ChangeEvent, ReactNode, useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "@chakra-ui/react";
import {axiosInstance} from "../src/services/requests/instance/axios.instance";
import {useAppDispatch, useAppSelector} from "../src/services/redux/hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {authAdmin} from "../src/services/redux/slices/auth.slice";
import {useRouter} from "next/router";
import {authNotify} from "../src/components/toasts/auth.notify";
import {errorIcon} from "../src/utils/icons";
import {Toaster} from "react-hot-toast";
import Head from "next/head";

export const LogAdminTemplate = styled.div`
  display: flex;
  background-color: #2f2c2c;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  height: 100vh;
  
  button {
    width: 200px;
  }
  
  input {
    width: 300px;
    text-align: center;
    color: #fff;
    
    ::placeholder {
      text-align: center;
    }
  }
`


export const LogAdminTitle = styled.div`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
`

const LogAdmin = () => {
    const [adminCode, setAdminCode] = useState('')
    const dispatch = useAppDispatch()
    const {loading, error} = useAppSelector(state => state.AuthReducer)
    const router = useRouter()

    const adminUserAuth = async () => {
        try {
            const resAction = await dispatch(authAdmin(adminCode))
            unwrapResult(resAction)
            await router.push('/admin')
       } catch (e: any) {
            authNotify(errorIcon, e.response.data.message)
        }
    }

    if(loading) {
        return 'Loading...'
    }

    return (
        <LogAdminTemplate>
            <Head>
                <title>Вход в Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
                <LogAdminTitle>
                    Вход в Админ Панель
                </LogAdminTitle>
                <Input
                    placeholder='Введите код для входа'
                    style={{
                        margin: '50px 0'
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminCode(e.target.value)}
                    value={adminCode}
                />
                <Button
                    onClick={adminUserAuth}
                >
                    Войти
                </Button>
        </LogAdminTemplate>
    );
};

export default LogAdmin;

LogAdmin.getLayout = function getLayout(page: ReactNode) {
    return (
        <>
            {page}
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    try {
        const cookies = ctx.req.headers.cookie
        const adminCookie = cookies.includes('admin')

        if(adminCookie) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin",
                },
                props:{},
            };
        }

        const res = await axiosInstance.get('/api/user/admin')
        console.log(res)

        return {
            props: {}
        }
    } catch (e) {
        console.log(e)
    }
}

