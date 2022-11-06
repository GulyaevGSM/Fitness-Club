import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Center, Divider, Input} from "@chakra-ui/react";

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

const AddCoach = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        mode: 'all'
    })

    const [form, setForm] = useState({
        fullName: '',
        age: 0,
        specialization: '',
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post('/api/coach/add', {
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
        <CreateTemplate>
            <Input
                style={{
                    background: errors.fullName ? '#fdd3ce' : '#fff'
                }}
                {...register('fullName', {
                    required: true
                })}
                onChange={changeHandler}
                placeholder='Имя тренера'
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
                placeholder='Возраст'
                name='age'
            />
            <Input
                // style={{
                //     background: errors.specialization ? '#fdd3ce' : '#fff'
                // }}
                // {...register('specialization', {
                //     required: true
                // })}
                onChange={changeHandler}
                placeholder='Специализация(Необязательно)'
                name='specialization'
            />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <Button onClick={handleSubmit(clickHandler)}>Добавить</Button>
        </CreateTemplate>
    );
};

export default AddCoach;

AddCoach.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
