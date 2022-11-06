import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";
import {useAppDispatch} from "../../../src/services/redux/hooks";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";

type TUser = {
    _id: string;
    email: string;
    password: string;
    avatar: string;
    balance: number;
    verifyCode: string;
    isVerify: boolean;
    name: string;
    surName: string;
    patronymic: string;
    dateOfBirth: string;
}

interface ICurrentUser {
    user: TUser
}

const UserID = ({user}: ICurrentUser) => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        surName: user.surName,
        name: user.name,
        patronymic: user.patronymic,
        balance: user.balance,
        dateOfBirth: user.dateOfBirth
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post(`/api/user/edituser/${user._id}`, {
                surName: form.surName.trim(),
                name: form.name.trim(),
                patronymic: form.patronymic.trim(),
                balance: form.balance,
                dateOfBirth: form.dateOfBirth.trim()
            })
            console.log(res.data)
            await router.push('/admin/users')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Input
                style={{
                    background: errors.surName ? '#fdd3ce' : '#fff'
                }}
                {...register('surName', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={user.surName}
                value={form.surName}
                name='surName'
            />
            <Input
                style={{
                    background: errors.name ? '#fdd3ce' : '#fff'
                }}
                {...register('name', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={user.name}
                value={form.name}
                name='name'
            />
            <Input
                style={{
                    background: errors.patronymic ? '#fdd3ce' : '#fff'
                }}
                {...register('patronymic', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={user.patronymic}
                value={form.patronymic}
                name='patronymic'
            />
            <Input
                style={{
                    background: errors.balance ? '#fdd3ce' : '#fff'
                }}
                {...register('balance', {
                    required: true
                })}
                onChange={changeHandler}
                value={form.balance}
                placeholder={String(user.balance)}
                name='balance'
            />
            <Input
                style={{
                    background: errors.dateOfBirth ? '#fdd3ce' : '#fff'
                }}
                {...register('dateOfBirth', {
                    required: true
                })}
                type='date'
                onChange={changeHandler}
                value={form.dateOfBirth}
                placeholder={user.dateOfBirth}
                name='dateOfBirth'
            />
            <Button
                onClick={handleSubmit(clickHandler)}
            >Подтвердить</Button>
        </div>
    );
};

export default UserID;

UserID.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps  = async (ctx: any) => {
    try {
        const {userID} = ctx.query
        const res = await axiosInstance.post('/api/user/getadminuser', {
            userID
        })
        return {
            props: {
                user: res.data
            }
        }
    } catch (e) {
        console.log()
    }
}
