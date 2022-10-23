import React, {ReactNode} from 'react';
import Image from 'next/image'

import styled from "styled-components";
import {Button} from "@chakra-ui/react";
import nf from '../public/404.gif'
import {useRouter} from "next/router";
import {func} from "prop-types";

export const NotFoundTemplate = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #313030;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  font-size: 23px;
  color: #000;
  font-weight: bold;
`

export const NotFoundContent = styled.div`
  margin-top: 100px;
  text-align: center;
  color: #eee;
  font-size: 15px;
`

export const NotFoundTitle = styled.div`
  color: #000;
  font-size: 39px;
  font-weight: bold;
`

export const NotFoundSubTitle = styled.div`
  color: #fff;
  margin: 30px;
`

const NotFound = () => {

    const router = useRouter()

    const redirectHandler = () => router.push('/')

    return (
        <NotFoundTemplate>
            <Image src={nf} width={800} height={210}/>
            <NotFoundContent>
                <NotFoundTitle>Страница не найдена</NotFoundTitle>
                <br/>
                <NotFoundSubTitle>
                    Неправильно набран адрес или такой страницы не существует
                </NotFoundSubTitle>
                <Button
                    onClick={redirectHandler}
                    style={{
                        background: '#968057',
                        borderRadius: 30
                    }}
                >Перейти на главную</Button>
            </NotFoundContent>
        </NotFoundTemplate>
    );
};

export default NotFound;

NotFound.getLayout = function getLayout(page: ReactNode) {
    return (
        <>
            {page}
        </>
    )
}
