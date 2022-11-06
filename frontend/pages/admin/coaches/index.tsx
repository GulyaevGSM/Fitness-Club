import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Head from "next/head";
import styled from "styled-components";
import {Button, Heading} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import Link from "next/link";
import {Edit} from "../services";
import {EditIcon} from "@chakra-ui/icons";

const CoachCard = styled.div`
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

type TCoachesArray = {
    _id: string;
    fullName: string;
    age: number;
    specialization?: string;
}

interface ICoaces {
    coaches: TCoachesArray[]
}

const Coaches = ({coaches}: ICoaces) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Heading as='h2' size='xl'>
                Тренеры
            </Heading>

            <Button
                style={{
                    marginTop: 30
                }}
                onClick={() => router.push('/admin/coaches/add')}
            >
                Добавить тренера
            </Button>

            {
                coaches.map((coach) => (
                    <CoachCard key={coach._id}>
                        <div>
                            <div>Имя тренера</div>
                            <div>{coach.fullName}</div>
                        </div>
                        <div>
                            <div>Возраст</div>
                            <div>
                                {coach.age}
                            </div>
                        </div>
                        {
                            coach.specialization !== '' && (
                                <div>
                                    <div>Специализация</div>
                                    <div>{coach.specialization}</div>
                                </div>
                            )
                        }
                        <Link href={`/admin/coaches/${coach._id}`}>
                            <Edit>
                                <EditIcon />
                            </Edit>
                        </Link>
                    </CoachCard>
                ))
            }
        </div>
    );
};

export default Coaches;

Coaches.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps = async () => {
    try {
        const res = await axiosInstance.get('/api/coach')

        return {
            props: {
                coaches: res.data
            }
        }
    } catch (e) {
        console.log(e)
    }
}