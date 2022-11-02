import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {Button, Center, Divider, Input} from "@chakra-ui/react";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

const CreateTemplate = styled.div`
  margin: 0 auto;
  width: 50%;
  text-align: center;
  
  input {
    margin: 10px;
    width: 400px;
    padding: 20px;
  }
`

const CreateService = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        serviceName: '',
        price: 0,
        coach: '',
        date: '',
        category: '',
        amount: '',
        description: '',
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post('/api/services/create', {
                serviceName: form.serviceName.trim(),
                price: form.price,
                coach: form.coach.trim(),
                date: form.date.trim(),
                category: form.category.trim(),
                amount: form.amount,
                description: form.description.trim(),
            })
            console.log(res)
            await router.push('/admin/services')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <CreateTemplate>
            <Input
                style={{
                    background: errors.serviceName ? '#fdd3ce' : '#fff'
                }}
                {...register('serviceName', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Название услуги'
                name='serviceName'
            />
            <Input
                style={{
                    background: errors.price ? '#fdd3ce' : '#fff'
                }}
                {...register('price', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Цена'
                name='price'
                type='number'
            />
            <Input
                style={{
                    background: errors.coach ? '#fdd3ce' : '#fff'
                }}
                {...register('coach', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Тренер'
                name='coach'
            />
            <Input
                style={{
                    background: errors.date ? '#fdd3ce' : '#fff'
                }}
                {...register('date', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Дата занятия'
                name='date'
                type='datetime-local'
            />
            <Input
                style={{
                    background: errors.category ? '#fdd3ce' : '#fff'
                }}
                {...register('category', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Категория'
                name='category'
            />
            <Input
                style={{
                    background: errors.amount ? '#fdd3ce' : '#fff'
                }}
                {...register('amount', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Количество мест'
                name='amount'
                type='number'
            />
            <Input
                style={{
                    background: errors.description ? '#fdd3ce' : '#fff'
                }}
                {...register('description', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Описание'
                name='description'
            />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <Button onClick={handleSubmit(clickHandler)}>Создать</Button>
        </CreateTemplate>
    );
};

export default CreateService;

CreateService.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
