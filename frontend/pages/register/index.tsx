import React, {ChangeEvent, ReactNode, useState} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {AcceptInfo, InputWithInfo, PreloaderOverflow, RegisterForm, RegisterTitle } from './styles/register.style';
import { RegisterTemplate } from './styles/register.style';
import { ToLoginPage } from '../register/styles/register.style';
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {Toaster} from "react-hot-toast";
import {authNotify} from "../../src/components/toasts/auth.notify";
import {completeIcon, errorIcon, processIcon} from "../../src/utils/icons";
import {useAppDispatch, useAppSelector} from "../../src/services/redux/hooks";
import {authRegister, authVerify} from "../../src/services/redux/slices/auth.slice";
import { Triangle } from  'react-loader-spinner'
import {unwrapResult} from "@reduxjs/toolkit";
import Head from "next/head";

const Register = () => {
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useAppDispatch()

    const {loading, error} = useAppSelector(state => state.AuthReducer)

    const [form, setForm] = useState<any>({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [isVerifyCode, setIsVerifyCode] = useState<string>('')

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        mode: 'all'
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const changeHandlerVerifyCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsVerifyCode(e.target.value)
    }

    const registerHandler = async () => {
        if(form.password !== form.repeatPassword) return authNotify(errorIcon, 'Пароли не совпадают')

        try {
            const resAction = await dispatch(authRegister({email: form.email, password: form.password}))
            unwrapResult(resAction)
            await onOpen()
            authNotify(processIcon, 'Проверьте вашу почту и введите код подтверждения')
        } catch (e: any) {
            if(e?.response?.data?.needToVerify) {
                await onOpen()
            }
            authNotify(errorIcon, e?.response?.data?.message)
        }
    }

    const sendVerifyCodeHandler = async () => {
        try {
            if(!isVerifyCode) return

            if(isVerifyCode.trim()) {
                const resAction = await dispatch(authVerify({verifyCode: isVerifyCode.trim()}))
                unwrapResult(resAction)
                authNotify(completeIcon, 'Вы успешно подтвердили аккаунт')
                await router.push('/profile')
            } else {
                authNotify(processIcon, 'Введите код подтверждения')
            }
        } catch (e: any) {
            authNotify(errorIcon, e?.response?.data?.message)
        }
    }

    const redirectHandler = () => router.push('/login')

    const keyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            if(form.password !== form.repeatPassword) return authNotify(errorIcon, 'Пароли не совпадают')

            try {
                const resAction = await dispatch(authRegister({email: form.email, password: form.password}))
                unwrapResult(resAction)
                await onOpen()
                authNotify(processIcon, 'Проверьте вашу почту и введите код подтверждения')
            } catch (e: any) {
                if(e?.response?.data?.needToVerify) {
                    await onOpen()
                }
                authNotify(errorIcon, e?.response?.data?.message)
            }
        }
    }

    const keySendCode = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            try {
                if(!isVerifyCode) return

                if(isVerifyCode.trim()) {
                    const resAction = await dispatch(authVerify({verifyCode: isVerifyCode.trim()}))
                    unwrapResult(resAction)
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
        <RegisterTemplate>
            <Head>
                <title>Регистрация</title>
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
                            <FormLabel>Код подтверждения</FormLabel>
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

            <RegisterTitle>
                Регистрация
            </RegisterTitle>
            <RegisterForm>
                <InputWithInfo>
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
                    <div>
                        Код подтверждения личного кабинета будет приходить на вашу почту, поэтому необходимо вашу реальную почту, к которой мы имеете доступ.
                    </div>
                </InputWithInfo>
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
                    type='password'
                />
                <Input
                    style={{
                        background: errors.repeatPassword ? '#fdd3ce' : '#fff'
                    }}
                    {...register('repeatPassword', {
                        required: true,
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    onChange={changeHandler}
                    name='repeatPassword'
                    value={form.repeatPassword}
                    placeholder='Подтверждение пароля'
                    onKeyPress={keyHandler}
                    type='password'
                />
                <AcceptInfo>
                    Я ознакомлен с правилами и согласен на обработку персональных данных
                </AcceptInfo>
                <Button
                    onClick={handleSubmit(registerHandler)}
                >
                    Зарегистрироваться
                </Button>
                <ToLoginPage>Если у вас уже есть аккаунт, вы можете <span onClick={redirectHandler}>войти в личный кабинет</span></ToLoginPage>
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

