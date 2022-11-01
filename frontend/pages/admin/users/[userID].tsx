import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";
import {useAppDispatch} from "../../../src/services/redux/hooks";

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
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Input
                onChange={changeHandler}
                placeholder={user.surName}
                value={form.surName}
                name='surName'
            />
            <Input
                onChange={changeHandler}
                placeholder={user.name}
                value={form.name}
                name='name'
            />
            <Input
                onChange={changeHandler}
                placeholder={user.patronymic}
                value={form.patronymic}
                name='patronymic'
            />
            <Input
                onChange={changeHandler}
                value={form.balance}
                placeholder={String(user.balance)}
                name='balance'
            />
            <Input
                type='date'
                onChange={changeHandler}
                value={form.dateOfBirth}
                placeholder={user.dateOfBirth}
                name='dateOfBirth'
            />
            <Button
                onClick={clickHandler}
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
