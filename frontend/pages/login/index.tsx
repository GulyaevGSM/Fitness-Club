import React, {ChangeEvent, ReactNode, useState} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {LoginForm, LoginTemplate, LoginTitle, ResetPassword, ToRegisterPage } from './styles/login.style';
import {
    Button,
    FormControl,
    FormLabel,
    Input, Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {verifyUserRequest} from '../../src/services/requests/auth.request';
import { Toaster } from 'react-hot-toast';
import {authNotify} from "../../src/components/toasts/auth.notify";
import {completeIcon, errorIcon, processIcon} from "../../src/utils/icons";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../../src/services/redux/hooks";
import {PreloaderOverflow} from "../register/styles/register.style";
import {Triangle} from "react-loader-spinner";
import {addUser, userLogin} from "../../src/services/redux/slices/user.slice";
import Head from "next/head";

const Login = () => {
    const [form, setForm] = useState<any>({
        email: '',
        password: ''
    })
    const [isVerifyCode, setIsVerifyCode] = useState<string>('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useAppDispatch()
    const {loading, error} = useAppSelector(state => state.AuthReducer)

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
           const resAction = await dispatch(userLogin({email: form.email, password: form.password}))
           unwrapResult(resAction)
           authNotify(completeIcon, 'Вы успешно вошли с систему')
           await router.push('/profile')
       } catch (e: any) {
           if(e.response.data.isVerify === false) {
               await onOpen()
               authNotify(processIcon, e.response.data.message)
               return
           }
           authNotify(errorIcon, e.response.data.message)
       }
    }

    const keyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            try {
                const resAction = await dispatch(userLogin({email: form.email, password: form.password}))
                unwrapResult(resAction)
                authNotify(completeIcon, 'Вы успешно вошли с систему')
                await router.push('/profile')
            } catch (e: any) {
                if(e?.response?.data?.isVerify === false) {
                    await onOpen()
                    authNotify(processIcon, e.response.data.message)
                    return
                }
                authNotify(errorIcon, e.response.data.message)
            }
        }
    }

    const changeHandlerVerifyCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsVerifyCode(e.target.value)
    }

    const sendVerifyCodeHandler = async () => {
        try {
            if(!isVerifyCode) return

            if(isVerifyCode.trim()) {
                await verifyUserRequest({verifyCode: isVerifyCode.trim()})
                authNotify(completeIcon, 'Вы успешно подтвердили аккаунт')
                await router.push('/profile')
            } else {
                authNotify(processIcon, 'Введите код подтверждения')
            }
        } catch (e: any) {
            authNotify(errorIcon, e?.response?.data?.message)
        }
    }

    const keySendCode = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            try {
                if(!isVerifyCode) return

                if(isVerifyCode.trim()) {
                    await verifyUserRequest({verifyCode: isVerifyCode.trim()})
                    authNotify(completeIcon, 'Вы успешно подтвердили аккаунт')
                    await router.push('/profile')
                } else {
                    authNotify(processIcon, 'Введите код подтверждения')
                }
            } catch (e: any) {
                authNotify(errorIcon, e?.response?.data?.message)
            }
        }
    }

    return (
        <LoginTemplate>
            <Head>
                <title>Вход в систему</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {
                loading && (
                    <PreloaderOverflow>
                        <Triangle
                            height="100"
                            width="100"
                            color="#968057"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            visible={true}
                        />
                    </PreloaderOverflow>
                )
            }

            <Modal
                closeOnOverlayClick={false}
                closeOnEsc={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Подтверждение входа в личный кабинет</ModalHeader>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Введите код подтверждения, который был выслан на вашу почту при регистрации</FormLabel>
                            <Input
                                onChange={changeHandlerVerifyCodeInput}
                                value={isVerifyCode}
                                placeholder='Введите код'
                                onKeyPress={keySendCode}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            onClick={sendVerifyCodeHandler}
                            style={{
                                background: '#000',
                                color: '#fff'
                            }}
                            mr={3}
                        >
                            Продолжить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                    onKeyPress={keyHandler}
                    type='password'
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
