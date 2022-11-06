import React from 'react';
import {Heading, Input, Select, Textarea} from "@chakra-ui/react";
import styled from "styled-components";

const ContactsTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 75px;
`

const FormTemplate = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Form = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Contacts = () => {
    return (
        <div>
            <Heading style={{marginBottom: 30}} as='h2' size='xl'>
                Контакты
            </Heading>

            <ContactsTemplate>
                <div>
                    <Heading as='h2' size='md'>ОБРАТНАЯ СВЯЗЬ</Heading>
                    <div>
                        <Heading style={{marginBottom: 10}} as='h2' size='md'>Предложения, вопросы, пожелания</Heading>
                        <div>8 800 555 08 08</div>
                    </div>
                </div>
                <div>
                    <Heading style={{marginBottom: 10}} as='h2' size='md'>ОТДЕЛ КОРПОРАТИВНЫХ ПРОДАЖ</Heading>
                    <Heading as='h2' size='sm'>gulyaevgym@mail.ru</Heading>
                </div>
                <div>
                    <Heading style={{marginBottom: 10}} as='h2' size='md'>ДЕПАРТАМЕНТ ФРАНЧАЙЗИНГА</Heading>
                    <Heading as='h2' size='sm'>gulyaevgym@mail.ru</Heading>
                </div>
                <div>
                    <Heading style={{marginBottom: 10}} as='h2' size='md'>ПРЕСС-СЛУЖБА</Heading>
                    <Heading as='h2' size='sm'>gulyaevgym@mail.ru</Heading>
                </div>
            </ContactsTemplate>

            <FormTemplate>
               <div style={{
                   display: 'flex',
                   flexDirection: 'column',
                   marginBottom: 50
               }}>
                   <Heading style={{
                       marginBottom: 30
                   }} as='h2' size='3xl'>
                       Обратная связь
                   </Heading>
                   <Heading style={{width: 750}} as='h3' size='lg'>
                       МЫ РАДЫ ОТВЕТИТЬ НА ЛЮБОЙ ВАШ ВОПРОС, ВЫСЛУШАТЬ ВАШЕ ПРЕДЛОЖЕНИЕ ИЛИ ЗАМЕЧАНИЕ
                   </Heading>
               </div>

                <Form>
                    <Input
                        style={{width: 600, marginBottom: 50}}
                        placeholder='Имя'
                        variant='flushed'
                    />
                    <Input
                        style={{width: 600, marginBottom: 50}}
                        placeholder='Фамилия'
                        variant='flushed'
                    />
                    <Select style={{width: 600, marginBottom: 50}}
                    >
                        <option value='option1'>Задать вопрос</option>
                        <option value='option2'>Оставить отзыв</option>
                        <option value='option3'>Пожаловаться</option>
                    </Select>
                    <Textarea placeholder='Текст сообщения' />
                </Form>
            </FormTemplate>
        </div>
    );
};

export default Contacts;