import React, {useRef} from 'react';
import styled from "styled-components";
import {Heading} from "@chakra-ui/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import Image from "next/image";
import one from "../public/one.jpg";
import two from "../public/two.jpg";
import three from "../public/three.jpg";
import club1 from '../public/club1.webp'
import club2 from '../public/club2.webp'
import club3 from '../public/club3.webp'
import club4 from '../public/club4.webp'
import club5 from '../public/club5.webp'
import club6 from '../public/club6.webp'
import club7 from '../public/club7.webp'

const CompanyTemplate = styled.div`
  
`

const CompanyInfo = styled.div`
  margin: 30px auto;
`

const Title = styled.div`
  color: #666;
  font-size: 20px;
  margin-bottom: 25px;
`

const Content = styled.div`
  color: #000;
  font-size: 23px;
`

const Company = () => {

    const arr = [club1, club2, club3, club4, club5, club6, club7]

    return (
        <CompanyTemplate>
            <Heading as='h2' size='xl'>
                О нас
            </Heading>

            <CompanyInfo>
                <Title>
                    Здесь вас ждет совершенство во всех деталях:
                </Title>
                <Content>
                    <div>превосходно оснащенный тренажерный зал;</div>
                    <div>студии для занятий популярными фитнес-программами: йогой, танцевальными направлениями, Pilates, различными видами единоборств;
                    </div>
                    <div>роскошная аквазона с банным комплексом;
                    </div>
                    <div>оздоровительная атмосфера соляной пещеры, массажные кабинеты, солярии;
                    </div>
                    <div>профессиональная SPA-клиника;
                    </div>
                </Content>
            </CompanyInfo>
            <Title>

                Наш клуб - это уникальное оборудование, инновационные технологии, индивидуальный подход – для любого уровня подготовки и результативных занятий.
            </Title>
            <Heading style={{marginBottom: '65px'}} as='h2' size='xl'>
                Фотографии
            </Heading>

            <div style={{
                position: 'static',
                left: 0,
                textAlign: 'center',
            }}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={2}
                    navigation
                    style={{
                        height: 550,
                        zIndex: 0,
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {
                        arr.map((i: any) => (
                            <SwiperSlide>
                                <Image src={i} width={600} height={400} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </CompanyTemplate>
    );
};

export default Company;
