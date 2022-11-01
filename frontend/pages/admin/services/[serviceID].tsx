import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";

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
            router.push('/admin/services')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Input
                onChange={changeHandler}
                placeholder={service.serviceName}
                value={form.serviceName}
                name='serviceName'
            />
            <Input
                type='number'
                onChange={changeHandler}
                placeholder={String(service.price)}
                value={form.price}
                name='price'
            />
            <Input
                onChange={changeHandler}
                placeholder={service.coach}
                value={form.coach}
                name='coach'
            />
            <Input
                type='date'
                onChange={changeHandler}
                value={form.date}
                placeholder={service.date}
                name='date'
            />
            <Input
                onChange={changeHandler}
                value={form.category}
                placeholder={service.category}
                name='category'
            />
            <Input
                type='number'
                onChange={changeHandler}
                value={form.amount}
                placeholder={String(service.amount)}
                name='amount'
            />
            <Input
                onChange={changeHandler}
                value={form.description}
                placeholder={service.description}
                name='description'
            />
            <Button
                onClick={clickHandler}
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