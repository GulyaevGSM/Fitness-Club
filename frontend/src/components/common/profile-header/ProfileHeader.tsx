import React from 'react';
import { ProfileTitle, ProfileLogo, GlobalProfileTemplate, UpperProfileHeaderTemplate, LowerProfileHeaderTemplate, ProfileSection, ProfileLogout, LogoBlock } from './styles/profile-header.style';
import Image from 'next/image'
import gymProfile from '../../../../public/gym-profile.svg'
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../services/redux/hooks";
import { MdLogout } from "react-icons/md";
import {logoutUser} from "../../../services/redux/slices/user.slice";

const ProfileHeader = () => {
    const router = useRouter()
    const {user} = useAppSelector(state => state.UserReducer)
    const dispatch = useAppDispatch()

    const arrayProfileSections = ['Главная', 'Магазин', 'Занятия', 'Профиль']

    const redirectHandler = () => router.push('/')

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
                   <ProfileLogo
                       onClick={redirectHandler}
                   >
                       <Image src={gymProfile} width={200} height={50}/>
                   </ProfileLogo>
                   <ProfileTitle>
                       <div>GulyaevGYM</div>
                       <span>Личный кабинет</span>
                   </ProfileTitle>
               </LogoBlock>
               <ProfileLogout
                   onClick={logoutHandler}
               >
                   <MdLogout size={25} />
               </ProfileLogout>
           </UpperProfileHeaderTemplate>
           <LowerProfileHeaderTemplate>
               {
                   arrayProfileSections.map((section: string, index: number) => (
                       <ProfileSection key={index}>
                           {section}
                       </ProfileSection>
                   ))
               }
           </LowerProfileHeaderTemplate>
       </GlobalProfileTemplate>
    );
};

export default ProfileHeader;