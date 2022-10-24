import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {Button, Input} from "@chakra-ui/react";
import {AcceptInfo, InputWithInfo, RegisterForm, RegisterTitle } from './styles/register.styles';
import { RegisterTemplate } from './styles/register.styles';
import { ToRegisterPage } from '../login/styles/login.style';
import {useRouter} from "next/router";

const Register = () => {
    const router = useRouter()

    const redirectHandler = () => router.push('/login')

    return (
        <RegisterTemplate>
            <RegisterTitle>
                Регистрация
            </RegisterTitle>
            <RegisterForm>
                <InputWithInfo>
                    <Input
                        placeholder='Почта'
                    />
                    <div>
                        Код подтверждения личного кабинета будет приходить на вашу почту, поэтому необходимо вашу реальную почту, к которой мы имеете доступ.
                    </div>
                </InputWithInfo>
                <Input
                    placeholder='Пароль'
                />
                <Input
                    placeholder='Подтверждение пароля'
                />
                <AcceptInfo>
                    Я ознакомлен с правилами и согласен на обработку персональных данных
                </AcceptInfo>
                <Button>Зарегистрироваться</Button>
                <ToRegisterPage>Если у вас уже есть аккаунт, вы можете <span onClick={redirectHandler}>войти в личный кабинет</span></ToRegisterPage>
            </RegisterForm>
        </RegisterTemplate>
    );
};

export default Register

Register.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

