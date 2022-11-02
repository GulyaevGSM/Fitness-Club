import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Center, Divider, Input} from "@chakra-ui/react";
import styled from "styled-components";

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

const CreateNews = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        title: '',
        subContent: '',
        mainContent: '',
        image: ''
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post('/api/blog/create', {
                title: form.title.trim(),
                subContent: form.subContent,
                mainContent: form.mainContent.trim(),
                image: form.image
            })
            console.log(res)
            await router.push('/admin/news')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <CreateTemplate>
            <Input
                style={{
                    background: errors.title ? '#fdd3ce' : '#fff'
                }}
                {...register('title', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Название блога'
                name='title'
            />
            <Input
                style={{
                    background: errors.subContent ? '#fdd3ce' : '#fff'
                }}
                {...register('subContent', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Подсодержание'
                name='subContent'
            />
            <Input
                style={{
                    background: errors.mainContent ? '#fdd3ce' : '#fff'
                }}
                {...register('mainContent', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Основное содержание'
                name='mainContent'
            />
            <Input
                onChange={changeHandler}
                placeholder='Картинка(Необязательна)'
                name='image'
            />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <Button onClick={handleSubmit(clickHandler)}>Создать</Button>
        </CreateTemplate>
    );
};

export default CreateNews;

CreateNews.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}