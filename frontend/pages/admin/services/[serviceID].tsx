import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";

type TServiceType = {
    _id: string;
    serviceName: string,
    price: number,
    coach: string,
    date: string,
    category: string,
    amount: number,
    description: string
}

interface IService {
    service: TServiceType
}

const ServiceDetail = ({service}: IService) => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        serviceName: service.serviceName,
        price: service.price,
        coach: service.coach,
        date: service.date,
        category: service.category,
        amount: service.amount,
        description: service.description
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post(`/api/services/edit/${service._id}`, {
                serviceName: form.serviceName.trim(),
                price: form.price,
                coach: form.coach.trim(),
                date: form.date.trim(),
                category: form.category.trim(),
                amount: form.amount,
                description: form.description.trim()
            })
            await router.push('/admin/services')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Input
                style={{
                    background: errors.serviceName ? '#fdd3ce' : '#fff'
                }}
                {...register('serviceName', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={service.serviceName}
                value={form.serviceName}
                name='serviceName'
            />
            <Input
                style={{
                    background: errors.price ? '#fdd3ce' : '#fff'
                }}
                {...register('price', {
                    required: true
                })}
                type='number'
                onChange={changeHandler}
                placeholder={String(service.price)}
                value={form.price}
                name='price'
            />
            <Input
                style={{
                    background: errors.coach ? '#fdd3ce' : '#fff'
                }}
                {...register('coach', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder={service.coach}
                value={form.coach}
                name='coach'
            />
            <Input
                style={{
                    background: errors.date ? '#fdd3ce' : '#fff'
                }}
                {...register('date', {
                    required: true
                })}
                type='datetime-local'
                onChange={changeHandler}
                value={form.date}
                placeholder={service.date}
                name='date'
            />
            <Input
                style={{
                    background: errors.category ? '#fdd3ce' : '#fff'
                }}
                {...register('category', {
                    required: true
                })}
                onChange={changeHandler}
                value={form.category}
                placeholder={service.category}
                name='category'
            />
            <Input
                style={{
                    background: errors.amount ? '#fdd3ce' : '#fff'
                }}
                {...register('amount', {
                    required: true
                })}
                type='number'
                onChange={changeHandler}
                value={form.amount}
                placeholder={String(service.amount)}
                name='amount'
            />
            <Input
                style={{
                    background: errors.description ? '#fdd3ce' : '#fff'
                }}
                {...register('description', {
                    required: true
                })}
                onChange={changeHandler}
                value={form.description}
                placeholder={service.description}
                name='description'
            />
            <Button
                onClick={handleSubmit(clickHandler)}
            >Подтвердить</Button>
        </div>
    );
};

export default ServiceDetail;

ServiceDetail.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps  = async (ctx: any) => {
    try {
        const {serviceID} = ctx.query
        const res = await axiosInstance.get(`/api/services/service/${serviceID}`)
        console.log(res.data)

        return {
            props: {
                service: res.data
            }
        }
    } catch (e) {
        console.log()
    }
}