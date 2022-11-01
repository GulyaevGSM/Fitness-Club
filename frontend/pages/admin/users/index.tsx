import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Admin from "../index";
import Head from "next/head";
import {axiosInstance} from "../../../src/services/requests/instance/axios.instance";
import styled from "styled-components";
import {EditIcon} from "@chakra-ui/icons";
import Link from "next/link";
import { Heading } from '@chakra-ui/react';

interface IUsers {
    users: []
}

type TUser = {
    _id: string;
    email: string;
    password: string;
    avatar: string;
    balance: number;
    verifyCode: string;
    isVerify: boolean;
    name: string;
    surName: string;
    patronymic: string;
    dateOfBirth: string;
}


const CardUser = styled.div`
  margin: 0 auto;
  width: 65%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px 0px;
  display: flex;
  justify-content: space-around;
  padding: 30px 15px;
  
  div {
    
    div:first-child {
      font-weight: bold;
      margin: 0 0 20px 0;
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

const Users = ({users}: IUsers) => {
    console.log('users', users)
    return (
        <div>
            <Head>
                <title>Админ Панель</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Heading as='h2' size='xl'>
                Клиенты
            </Heading>

            {
                users.map((user: TUser, index) => {
                    return (
                        <CardUser key={user._id}>
                            <div>
                                <div>Почта</div>
                                <div>{user.email}</div>
                            </div>
                            <div>
                                <div>ФИО</div>
                                <div>{user.surName + ' ' + user.name + ' ' + user.patronymic}</div>
                            </div>
                            <div>
                                <div>Дата рождения</div>
                                <div>{user.dateOfBirth}</div>
                            </div>
                            <div>
                                <div>Баланс</div>
                                <div>{user.balance}</div>
                            </div>
                            <div>
                                <div>Активация аккаунта</div>
                                <div>{user.isVerify ? 'activated' : 'not activated'}</div>
                            </div>
                            <Link href={`/admin/users/${user._id}`}>
                                <Edit>
                                    <EditIcon />
                                </Edit>
                            </Link>
                        </CardUser>
                    )
                })
            }
        </div>
    );
};

export default Users;

Users.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export const getServerSideProps  = async () => {
    try {
        const res = await axiosInstance.get('/api/user/getusers')
        console.log('USER =<<', res.data)

        return {
            props: {
                users: res.data
            }
        }
    } catch (e) {
        console.log()
    }
}