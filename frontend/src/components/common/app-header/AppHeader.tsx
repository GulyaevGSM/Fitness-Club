import React from 'react';
import {Button, IconButton, Input, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import {AppHeaderTemplate, CallNumber, InputBlock, LogIn, Logo, LowerSection, LowerHeader, NumberPhone, UpperHeader, SearchIcon } from './styles/app-header.style';
import gymLogo from '../../../../public/gym-logo.svg'
import Image from 'next/image'
import {useRouter} from "next/router";
import {useAppSelector} from "../../../services/redux/hooks";
import { IoMdPerson } from "react-icons/io";
import { GiWorld } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import {
    AddIcon,
    CalendarIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    PhoneIcon,
    RepeatIcon
} from '@chakra-ui/icons';
import Link from "next/link";

const AppHeader = () => {
    const router = useRouter()
    const {user} = useAppSelector(state => state.UserReducer)

    const redirectHandler = () => router.push('/')

    return (
        <AppHeaderTemplate>
            <UpperHeader>
                <Logo
                    onClick={redirectHandler}
                >
                    <Image src={gymLogo} width={200} height={100}/>
                </Logo>
                <InputBlock>
                    <Input placeholder='Поиск по сайту' />
                    <SearchIcon><BsSearch size={20} /></SearchIcon>
                </InputBlock>
                <CallNumber>
                    <div>
                        <IoIosCall />
                        <NumberPhone href="tel:+74951234567">+7 (978) 876-83-25</NumberPhone>
                    </div>
                    <span>Заказать звонок</span>
                </CallNumber>
                <LogIn>
                    <div onClick={() => router.push(user ? '/profile' : '/login')}>
                        <a><BsFillPersonFill size={18}/></a>
                        <span>Вход</span>
                    </div>
                    <div onClick={() => router.push(user ? '/profile' : '/login')}>Личный кабинет</div>
                </LogIn>
                <Button>Оставить заявку</Button>
            </UpperHeader>

            <LowerHeader>
                <LowerSection>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <Link href='/team'>
                                <MenuItem icon={<IoMdPerson />}>
                                    Наш персонал
                                </MenuItem>
                            </Link>
                            <Link href='/blog'>
                                <MenuItem icon={<CalendarIcon />}>
                                    Блог
                                </MenuItem>
                            </Link>
                            <Link href='/company'>
                                <MenuItem icon={<GiWorld />}>
                                    О нас
                                </MenuItem>
                            </Link>
                            <Link href='/contacts'>
                                <MenuItem icon={<PhoneIcon />}>
                                    Наши контакты
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </LowerSection>
                <Link href='/team'>
                    <LowerSection>Команда</LowerSection>
                </Link>
                <Link href='/blog'>
                    <LowerSection>Блог</LowerSection>
                </Link>
                <Link href='/company'>
                    <LowerSection>О нас</LowerSection>
                </Link>
                <Link href='/contacts'>
                    <LowerSection>Контакты</LowerSection>
                </Link>
            </LowerHeader>
        </AppHeaderTemplate>
    );
};

export default AppHeader;