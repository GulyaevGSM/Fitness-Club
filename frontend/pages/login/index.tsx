import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {LoginForm, LoginTemplate, LoginTitle, ResetPassword, ToRegisterPage } from './styles/login.style';
import {Button, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter()

    const redirectHandler = () => router.push('/register')

    return (
        <LoginTemplate>
            <LoginTitle>
                Войти в личный кабинет
            </LoginTitle>
            <LoginForm>
                <Input
                    placeholder='Почта'
                />
                <Input
                    placeholder='Пароль'
                />
                <Button>Войти</Button>
                <ResetPassword>Забыли пароль?</ResetPassword>
                <ToRegisterPage>Если у вас еще нет пароля для входа, вам нужно <span onClick={redirectHandler}>зарегистрироваться</span></ToRegisterPage>
            </LoginForm>
        </LoginTemplate>
    );
};

export default Login;

Login.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
