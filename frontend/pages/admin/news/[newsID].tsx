import React, {ChangeEvent, ReactNode, useState} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import CreateNews from "./create";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import {Button, Input} from "@chakra-ui/react";

type TNewsArray = {
    _id: string;
    title: string;
    subContent: string;
    mainContent: string;
    image: string;
}

interface INews {
    news: TNewsArray
}

const EditNews = ({news}: INews) => {
    const router = useRouter()

    const [form, setForm] = useState({
        title: news.title,
        subContent: news.subContent,
        mainContent: news.mainContent,
        image: news.image
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickHandler = async () => {
        try {
            const res = await axiosInstance.post(`/api/blog/edit/${news._id}`, {
                title: form.title.trim(),
                subContent: form.subContent.trim(),
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
        <div>
            <Input
                onChange={changeHandler}
                placeholder={news.title}
                value={form.title}
                name='title'
            />
            <Input
                onChange={changeHandler}
                placeholder={news.subContent}
                value={form.subContent}
                name='subContent'
            />
            <Input
                onChange={changeHandler}
                placeholder={news.mainContent}
                value={form.mainContent}
                name='mainContent'
            />
            <Input
                onChange={changeHandler}
                value={form.image}
                placeholder={news.image}
                name='image'
            />
            <Button
                onClick={clickHandler}
            >
                Подтвердить
            </Button>
        </div>
    );
};

export default EditNews;

EditNews.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps  = async (ctx: any) => {
    try {
        const {newsID} = ctx.query
        const res = await axiosInstance.get(`/api/blog/getblog/${newsID}`)
        console.log(res.data)

        return {
            props: {
                news: res.data
            }
        }
    } catch (e) {
        console.log()
    }
}