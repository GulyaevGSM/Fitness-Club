import React, {ChangeEvent, ReactNode, useState} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {LoginForm, LoginTemplate, LoginTitle, ResetPassword, ToRegisterPage } from './styles/login.style';
import {Button, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import { loginRequest } from '../../src/services/requests/auth.request';
import { Toaster } from 'react-hot-toast';
import {authNotify} from "../../src/components/toasts/auth.notify";
import {errorIcon} from "../../src/utils/icons";

const Login = () => {
    const [form, setForm] = useState<any>({
        email: '',
        password: ''
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        mode: 'all'
    })

    const router = useRouter()

    const redirectHandler = () => router.push('/register')

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async () => {
       try {
           await loginRequest({...form})
       } catch (e: any) {
           authNotify(errorIcon, e.response.data.message)
       }
    }

    return (
        <LoginTemplate>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <LoginTitle>
                Войти в личный кабинет
            </LoginTitle>
            <LoginForm>
                <Input
                    style={{
                        background: errors.email ? '#fdd3ce' : '#fff'
                    }}
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неверный адрес электронной почты'
                        }
                    })}
                    onChange={changeHandler}
                    name='email'
                    value={form.email}
                    placeholder='Почта'
                />
                <Input
                    style={{
                        background: errors.password ? '#fdd3ce' : '#fff'
                    }}
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    onChange={changeHandler}
                    name='password'
                    value={form.password}
                    placeholder='Пароль'
                />
                <Button
                    onClick={handleSubmit(loginHandler)}
                >Войти</Button>

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
