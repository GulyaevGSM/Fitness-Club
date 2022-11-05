import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
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
import {addAdmin} from "../src/services/redux/slices/admin.slice";

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

const LogAdmin = ({cookies}: any) => {
    const [admin_login, setAdminLogin] = useState('')
    const [admin_password, setAdminPassword] = useState('')
    const dispatch = useAppDispatch()
    const {loading, error} = useAppSelector(state => state.AuthReducer)
    const router = useRouter()

    const adminUserAuth = async () => {
        if(admin_login && admin_password !== '') {
            if(
            admin_login === process.env.NEXT_PUBLIC_LOGIN_ADMIN
            &&
            admin_password === process.env.NEXT_PUBLIC_PASSWORD_ADMIN
            ) {
                await router.push('/admin/users')
            } else {
                authNotify(errorIcon, 'Неверные данные')
            }
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
                    type='password'
                    placeholder='Введите логин'
                    style={{
                        margin: '10px 0'
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminLogin(e.target.value)}
                    value={admin_login}
                />
            <Input
                type='password'
                placeholder='Введите пароль'
                    style={{
                        margin: '50px 0'
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminPassword(e.target.value)}
                    value={admin_password}
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

