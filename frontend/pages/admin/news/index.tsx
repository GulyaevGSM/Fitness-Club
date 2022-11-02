import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Head from "next/head";
import {Button, Heading, Stat, StatNumber} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import styled from "styled-components";
import {EditIcon} from "@chakra-ui/icons";
import Link from "next/link";
import { Edit } from '../services';

type TNewsArray = {
    _id: string;
    title: string;
    subContent: string;
    mainContent: string;
    image: string;
}

interface INews {
    news: TNewsArray[]
}

const NewsCard = styled.div`
  margin: 30px 0;
  font-size: 19px;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  align-items: center;
  
  div {
    
    div:first-child {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
`

const News = ({news}: INews) => {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Heading as='h2' size='xl'>
                Блог
            </Heading>


            <Button
                style={{
                    marginTop: 30
                }}
                onClick={() => router.push('/admin/news/create')}
            >
                Добавить блог
            </Button>

            {
                news.map((news) => (
                    <NewsCard key={news._id}>
                        <div>
                            <div>Название блога</div>
                            <div>{news.title}</div>
                        </div>
                        <div>
                            <div>Подсодержание</div>
                            <div>
                                {news.subContent}
                            </div>
                        </div>
                        <div>
                            <div>Основное содержание</div>
                            <div>{news.mainContent}</div>
                        </div>
                        <div>
                            <div>Изображение</div>
                            <div>{news.image}</div>
                        </div>
                        <Link href={`/admin/news/${news._id}`}>
                            <Edit>
                                <EditIcon />
                            </Edit>
                        </Link>
                    </NewsCard>
                ))
            }
        </div>
    );
};

export default News;

News.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps = async () => {
    try {
        const res = await axiosInstance.get('/api/blog')
        console.log(res.data)

        return {
            props: {
                news: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }
}