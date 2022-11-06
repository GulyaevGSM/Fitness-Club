import type { NextPage } from 'next'
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import {A11y, EffectFade, Navigation, Pagination, Scrollbar} from "swiper";
import {useRef} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import one from '../public/one.jpg'
import two from '../public/two.jpg'
import three from '../public/three.jpg'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from "styled-components";
import {Heading} from "@chakra-ui/react";

const HomeTemplate = styled.div`
  margin: -30px -80px;
`

const HomeContent = styled.div`
  padding: 25px;
`

const NewsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
`

const NewsCard = styled.div`
  width: 33.33333%;
  padding: 40px;
  margin: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  
  div:first-child {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  div {
    color: #666;
    font-size: 15px;
  }
`

const InfoContent = styled.div`
  background-color: #eee;
  padding: 20px;
  margin: 0 auto;
`

const InfoText = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  
  div {
    margin: 12px;
    
    div {
      font-size: 20px;
    }
  }
`


const Home: NextPage = () => {

    const arr = [one, two, three]

  return (
    <HomeTemplate>
        <Head>
            <title>Главная</title>
        </Head>

        <div style={{
            position: 'static',
            left: 0,
            textAlign: 'center',
        }}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
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
                            <Image src={i} width={1700} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>

        <HomeContent>

            <NewsBlock>
                <NewsCard>
                    <div>Фитнес</div>
                    <div>В нашем фитнес-клубе созданы идеальные условия для комфортных и эффективных тренировок, как в персональном формате, так и в виде групповых занятий. Новейшее оборудование, разнообразие направлений, специализированные залы - все это фитнес в клубе BIOSFERA.</div>
                </NewsCard>
                <NewsCard>
                    <div>Бассейн и аквазона</div>
                    <div>В велнес-клубе BIOSFERA - шикарная аквазона с бассейном, джакузи, жемчужной ванной, финской сауной и турецким хамамом, и соляной пещерой. Мы сделали эту зону максимально комфортной как для тренировок в воде, так и для отдыха рядом с Ленинским проспектом и Шаболовской.</div>
                </NewsCard>
                <NewsCard>
                    <div>Фитнес-диагностика</div>
                    <div>Хотите узнать больше о своем организме и эффективно применять эти знания? Приходите на фитнес-тестирование в клубе BIOSFERA. В отличие от обычной биоимпедансометрии, наша диагностика представляет собой уникальную запатентованную методику комплексного анализа состояния организма по 83 показателям.</div>
                </NewsCard>
                <NewsCard>
                    <div>Проект BIOHACKING</div>
                    <div>В отличие от обычной биоимпедансометрии, наша диагностика представляет собой уникальную запатентованную методику комплексного анализа состояния организма по 123 показателям</div>
                </NewsCard>
                <NewsCard>
                    <div>mediSPA центр</div>
                    <div>В нашем mediSPA комплексе, расположенном на 2-м этаже бизнес-центра, представлен полный спектр услуг в сфере красоты и здоровья, от классического маникюра и экспресс-укладки в салоне красоты до сложных инъекционных и аппаратных процедур и разнообразных SPA-программ.</div>
                </NewsCard>
                 <NewsCard>
                    <div>Фитнес-бар и ресторан</div>
                    <div>Велнес-клуб - это место, где Вы можете не только заниматься фитнесом, плавать в бассейне, ухаживать за собой в SPA, но и перекусить в фитнес-баре, заказав белковый коктейль, или пообедать с друзьями в ресторане европейской и грузинской кухни.</div>
                </NewsCard>
            </NewsBlock>
        </HomeContent>

        <InfoContent>
            <Heading style={{
                textAlign: 'center'
            }} as='h2' size='xl'>
                7    ПРИЧИН ВЫБРАТЬ НАШ ФИТНЕС-КЛУБ
            </Heading>

            <InfoText>
                <div>
                    <Heading as='h2' size='md'>Легкость парковки.</Heading>
                    <div>Владельцам премиальных клубных карт предоставляется место на отдельной парковке.</div>
                </div>
                <div>
                    <Heading as='h2' size='md'>Аквазона</Heading>
                    <div>с бассейном, джакузи, соляной пещерой и банным комплексом.</div>
                </div>
                <div>
                    <Heading as='h2' size='md'>Индивидуальное сопровождение врача.</Heading>
                    <div>Вы получаете не только первичную диагностику, но и постоянное сопровождение врача.
                    </div>
                </div>
                <div>
                    <Heading as='h2' size='md'>SPA-клиника и салон красоты.</Heading>
                    <div>У нас есть медицинская лицензия, широкий спектр современных процедур, включая аппаратную и инъекционную косметологию.</div>
                </div>
                <div>
                    <Heading as='h2' size='md'>Профессиональный штат.</Heading>
                    <div>Сотрудники нашего клуба имеют профильное (спортивное или медицинское) образование, реальные спортивные достижения и серьезный опыт.</div>
                </div>
                <div>
                    <Heading as='h2' size='md'>Безупречный сервис.</Heading>
                    <div>Безупречный сервис, строгие клубные правила, избранная аудитория.</div>
                </div>
                <div>
                    <Heading as='h2' size='md'>Новейшее оборудование.</Heading>
                    <div>В нашем клубе представлено современное кардиооборудование.</div>
                </div>
            </InfoText>
        </InfoContent>

    </HomeTemplate>
  )
}

export default Home
