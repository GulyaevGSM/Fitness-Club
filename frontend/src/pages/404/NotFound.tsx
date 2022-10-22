import React from 'react';
import {NotFoundContent, NotFoundSubTitle, NotFoundTemplate, NotFoundTitle} from "./styles/not-found.styles";
import nf from './images/404.gif'
import { Button } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    const redirectHandler = () => navigate('/')

    return (
        <NotFoundTemplate>
            <img src={nf} alt='nf'/>
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
