import React, {ChangeEvent, ReactNode, useState} from 'react';
import {ProfileLayout} from "../../../src/components/layouts/ProfileLayout";
import {DetailBlockLower, DetailBlockUpper, DetailsTemplate, DetailsTitle, DetailsUserData, DetailsUserNames} from './styles/details.style';
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {IDataUser} from "../../../src/services/types/user.type";
import {useAppDispatch, useAppSelector} from "../../../src/services/redux/hooks";
import {
    Button,
    FormControl,
    Input, Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {PreloaderOverflow} from "../../register/styles/register.style";
import {Triangle} from "react-loader-spinner";
import {authNotify} from "../../../src/components/toasts/auth.notify";
import {completeIcon, errorIcon} from "../../../src/utils/icons";
import {unwrapResult} from "@reduxjs/toolkit";
import { changePassword } from '../../../src/services/redux/slices/user.slice';
import {Toaster} from "react-hot-toast";
import {useForm} from "react-hook-form";

const Details = ({data}: IDataUser) => {
    const {loading, error, user} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [form, setForm] = useState({
        oldPassword: '',
        firstPassword: '',
        secondPassword: '',
    })

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const changeUserPassword = async () => {
        try {
            if(form.firstPassword !== form.secondPassword) {
                authNotify(errorIcon, 'Пароли не совпадают')
                return
            }
            const resAction = await dispatch(changePassword({
                oldPassword: form.oldPassword,
                password: form.firstPassword,
                aToken: user.accessToken
            }))
            unwrapResult(resAction)
            await onClose()
            authNotify(completeIcon, 'Вы успешно изменили пароль')
        } catch (e: any) {
            console.log(e)
            authNotify(errorIcon, e?.response?.data?.message)
        }
    }

    return (
        <DetailsTemplate>

            <Toaster
                position="top-left"
                reverseOrder={false}
            />

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
                closeOnOverlayClick={true}
                closeOnEsc={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Подтверждение пароля</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                onChange={changeHandler}
                                style={{marginBottom: 20}}
                                name='oldPassword'
                                placeholder='Старый пароль'
                                type='password'
                            />
                            <Input
                                style={{
                                    marginBottom: '20px',
                                    background: errors.firstPassword ? '#fdd3ce' : '#fff'
                                }}
                                {...register('firstPassword', {
                                    required: true,
                                    minLength: {
                                        value: 5,
                                        message: 'Минимум 5 символов'
                                    }
                                })}
                                onChange={changeHandler}
                                name='firstPassword'
                                placeholder='Новый пароль'
                                type='password'
                            />
                            <Input
                                style={{
                                    marginBottom: '20px',
                                    background: errors.secondPassword ? '#fdd3ce' : '#fff'
                                }}
                                {...register('secondPassword', {
                                    required: true,
                                    minLength: {
                                        value: 5,
                                        message: 'Минимум 5 символов'
                                    }
                                })}
                                onChange={changeHandler}
                                name='secondPassword'
                                placeholder='Подтвердите пароль'
                                type='password'
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
                            onClick={handleSubmit(changeUserPassword)}
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

            <DetailsTitle>
                Профиль
            </DetailsTitle>
            <DetailBlockUpper>
                <div>Клуб</div>
                <div>GulyaevGYM</div>
            </DetailBlockUpper>
            <DetailBlockLower>
                <div>
                    <div>Персональные данные</div>
                    <div
                        onClick={onOpen}
                    >
                        Изменить пароль
                    </div>
                </div>
                <DetailsUserNames>
                    <div>
                        <div>Фамилия</div>
                        <div>Имя</div>
                        <div>Отчество</div>
                        <div>Дата рождения</div>
                        <div>Эл. почта</div>
                    </div>
                    <div>
                        <div>{data.surName}</div>
                        <div>{data.name}</div>
                        <div>{data.patronymic}</div>
                        <div>{data.dateOfBirth}</div>
                        <div>{data.email}</div>
                    </div>
                </DetailsUserNames>
            </DetailBlockLower>
        </DetailsTemplate>
    );
};

export default Details;

Details.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    try {
        const accessToken = ctx.req.headers.cookie.split('=')[1]

        const res = await axiosInstance.get('/api/user/getuser', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res.data)

        return {
            props: {
                data: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }
}