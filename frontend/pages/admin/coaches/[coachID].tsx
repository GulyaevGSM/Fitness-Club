import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

type TCoachArray = {
    _id: string;
    fullName: string;
    age: number;
    specialization: string;
}

interface ICoach {
    coach: TCoachArray
}

const Coach = ({coach}: ICoach) => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        fullName: coach.fullName,
        age: coach.age,
        specialization: coach.specialization,
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post(`/api/coach/edit/${coach._id}`, {
                fullName: form.fullName.trim(),
                age: form.age,
                specialization: form.specialization.trim(),
            })
            console.log(res)

            await router.push('/admin/coaches')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Input
                style={{
                    background: errors.fullName ? '#fdd3ce' : '#fff'
                }}
                {...register('fullName', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={coach.fullName}
                value={form.fullName}
                name='fullName'
            />
            <Input
                style={{
                    background: errors.age ? '#fdd3ce' : '#fff'
                }}
                {...register('age', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={String(coach.age)}
                value={form.age}
                name='age'
                type='number'
            />
            <Input
                onChange={changeHandler}
                placeholder={coach.specialization}
                value={form.specialization}
                name='specialization'
            />
            <Button
                onClick={handleSubmit(clickHandler)}
            >
                Подтвердить
            </Button>
        </div>
    );
};

export default Coach;

Coach.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps  = async (ctx: any) => {
    try {
        const {coachID} = ctx.query
        const res = await axiosInstance.get(`/api/coach/getcoach/${coachID}`)
        console.log(res.data)

        return {
            props: {
                coach: res.data
            }
        }
    } catch (e) {
        console.log()
    }
}
