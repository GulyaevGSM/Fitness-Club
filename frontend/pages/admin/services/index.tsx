import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Head from "next/head";
import {Button, Heading} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import styled from "styled-components";
import {EditIcon} from "@chakra-ui/icons";
import Link from "next/link";

const ServiceBlock = styled.div`
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
    }
  }
`

const Edit = styled.span`
  cursor: pointer;
  display: inline-block;

  &:hover {
    color: #00c4ff;
  }
`

type TService = {
    _id: string;
    serviceName: string,
    price: number,
    coach: string,
    date: string,
    category: string,
    amount: number,
    description: string,
}

interface IServices {
    services: []
}

const Services = ({services}: IServices) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Heading style={{marginBottom: 30}} as='h2' size='xl'>
                Услуги
            </Heading>

            <Button
                style={{
                    marginBottom: 30
                }}
                onClick={() => router.push('/admin/services/create')}
            >
                Создать
            </Button>

            {
                services.map((service: TService) => (
                    <ServiceBlock key={service._id}>
                        <div>
                            <div>Название услуги</div>
                            <div>{service.serviceName}</div>
                        </div>
                        <div>
                            <div>Цена</div>
                            <div>{service.price}</div>
                        </div>
                        <div>
                            <div>Тренер</div>
                            <div>{service.coach}</div>
                        </div>
                        <div>
                            <div>Дата занятия</div>
                            <div>{service.date}</div>
                        </div>
                        <div>
                            <div>Категория</div>
                            <div>{service.category}</div>
                        </div>
                        <div>
                            <div>Количество мест</div>
                            <div>{service.amount}</div>
                        </div>
                        <div>
                            <div>Описание</div>
                            <div style={{width: 200}}>{service.description}</div>
                        </div>
                        <Link href={`/admin/services/${service._id}`}>
                            <Edit>
                                <EditIcon />
                            </Edit>
                        </Link>
                    </ServiceBlock>
                ))
            }
        </div>
    );
};

export default Services;

Services.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps = async () => {
    try {
        const res = await axiosInstance.get('/api/services')

        return {
            props: {
                services: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }
}
