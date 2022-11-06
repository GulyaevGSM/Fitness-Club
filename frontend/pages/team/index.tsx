import React from 'react';
import styled from "styled-components";
import {Heading} from "@chakra-ui/react";

const TeamTemplate = styled.div`

`

const TeamBlock = styled.div`
  margin: 30px auto;
  width: 80%;
`

const TeamCard = styled.div`
  border: 1px solid #eee;
  padding: 40px 20px;
  transition: all .2s linear;
  
  div {
    margin-top: 10px;
    color: #666;
    font-size: 17px;
    opacity: .8;
  }
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px 0px;
    cursor: pointer;
  }
`


const Team = () => {
    return (
        <TeamTemplate>
            <Heading as='h2' size='xl'>
               Тренеры
            </Heading>

            <TeamBlock>
                <TeamCard>
                    <Heading as='h2' size='lg'>
                        Михаил
                    </Heading>
                    <div>Инструктор тренажёрного зала, мастер-тренер</div>
                </TeamCard>
                <TeamCard>
                    <Heading as='h2' size='lg'>
                        Олег
                    </Heading>
                    <div>Менеджер тренажерного зала, мастер-тренер
                    </div>
                </TeamCard>
                <TeamCard>
                    <Heading as='h2' size='lg'>
                        Александр
                    </Heading>
                    <div>Инструктор тренажерного зала
                    </div>
                </TeamCard>
                <TeamCard>
                    <Heading as='h2' size='lg'>
                        Осман
                    </Heading>
                    <div>Инструктор тренажерного зала, мастер-тренер
                    </div>
                </TeamCard>
            </TeamBlock>
        </TeamTemplate>
    );
};

export default Team;
