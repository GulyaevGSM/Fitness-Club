import React from 'react';
import { ProfileTitle, ProfileLogo, GlobalProfileTemplate, UpperProfileHeaderTemplate, LowerProfileHeaderTemplate, ProfileSection, ProfileLogout, LogoBlock } from './styles/profile-header.style';
import Image from 'next/image'
import gymProfile from '../../../../public/gym-profile.svg'
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../services/redux/hooks";
import { MdLogout } from "react-icons/md";
import {logoutUser} from "../../../services/redux/slices/user.slice";
import Link from "next/link";

const ProfileHeader = () => {
    const router = useRouter()
    const {user} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()

    const logoutHandler = async () => {
        try {
            await dispatch(logoutUser())
            await router.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
       <GlobalProfileTemplate>
           <UpperProfileHeaderTemplate>
               <LogoBlock>
                   <Link href='/'>
                       <ProfileLogo>
                           <Image src={gymProfile} width={200} height={50}/>
                       </ProfileLogo>
                   </Link>
                   <ProfileTitle>
                       <div>GulyaevGYM</div>
                       <span>Личный кабинет</span>
                   </ProfileTitle>
               </LogoBlock>
               {user ? (
                   <ProfileLogout
                       onClick={logoutHandler}
                   >
                       <MdLogout size={25} />
                   </ProfileLogout>
               ) : null
               }
           </UpperProfileHeaderTemplate>
           <LowerProfileHeaderTemplate>
               <Link href={'/profile'}>
                   <ProfileSection>
                       Главная
                   </ProfileSection>
               </Link>
               <Link href={'/profile/shop'}>
                   <ProfileSection>
                       Магазин
                   </ProfileSection>
               </Link>
               <Link href={'/profile/work'}>
                   <ProfileSection>
                       Занятия
                   </ProfileSection>
               </Link>
               <Link href={'/profile/details'}>
                   <ProfileSection>
                       Профиль
                   </ProfileSection>
               </Link>
           </LowerProfileHeaderTemplate>
       </GlobalProfileTemplate>
    );
};

export default ProfileHeader;