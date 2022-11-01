import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";
import {axiosInstance} from "../../src/services/requests/instance/axios.instance";
import {useAppDispatch, useAppSelector} from "../../src/services/redux/hooks";
import {Triangle} from "react-loader-spinner"
import {PreloaderOverflow} from "../register/styles/register.style";
import {ICheckData, IDataUser} from "../../src/services/types/user.type";
import {ProfileForm, ProfileTemplate } from './styles/profile.style';
import {Avatar, Button, Input, Stat, StatNumber} from "@chakra-ui/react";
import {Balance, BalanceBlock, BalanceTemplate, BalanceTitle } from './styles/balance.style';
import {useRouter} from "next/router";
import Head from "next/head";

const Profile = ({data, success}: IDataUser) => {
    const router = useRouter()
    const [form, setForm] = useState({
        surName: '',
        name: '',
        patronymic: '',
        dateOfBirth: ''
    })

    const {loading, user} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()

    if(loading) {
        return (
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

    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const confirmDataHandler = async () => {
        try {
            await axiosInstance.post('/api/user/confirmdata', {...form}, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            await router.push('/profile/details')
            //TODO добавлять данные в redux
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ProfileTemplate>
            <Head>
                <title>Профиль</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {
                !success ? (
                    <ProfileForm>
                        <Input
                            onChange={changeHandler}
                            name='surName'
                            placeholder='Фамилия'
                        />
                        <Input
                            onChange={changeHandler}
                            name='name'
                            placeholder='Имя'
                        />
                        <Input
                            onChange={changeHandler}
                            name='patronymic'
                            placeholder='Отчество "При наличии"'
                        />
                        <Input
                            onChange={changeHandler}
                            name='dateOfBirth'
                            type='date'
                        />
                        <Button
                            onClick={confirmDataHandler}
                        >
                            Продолжить
                        </Button>
                    </ProfileForm>
                ) : (
                    <BalanceTemplate>
                        <BalanceBlock>
                            <BalanceTitle>
                                Лицевой счет: {data.surName + ' ' + data.name}
                            </BalanceTitle>
                            <Balance>
                                <>
                                    <>{data.balance} RUB</>
                                </>
                            </Balance>
                            <Button>Пополнить</Button>
                        </BalanceBlock>
                    </BalanceTemplate>
                )
            }
        </ProfileTemplate>
    );
};

export default Profile

Profile.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    try {
        const accessToken = ctx.req.headers.cookie.split('=')[1].split(';')[0]
        console.log(accessToken)

            const checkUserData = await axiosInstance.get<ICheckData>('/api/user/checkdata', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const res = await axiosInstance.get<IDataUser>('/api/user/getuser', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return {
                props: {
                    data: res.data,
                    success: checkUserData.data.success
                }
            }
    } catch (e) {
        console.log(e)
    }
}