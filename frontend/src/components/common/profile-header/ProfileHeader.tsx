import React from 'react';
import { ProfileTitle, ProfileLogo, GlobalProfileTemplate, UpperProfileHeaderTemplate, LowerProfileHeaderTemplate, ProfileSection } from './styles/profile-header.style';
import Image from 'next/image'
import gymProfile from '../../../../public/gym-profile.svg'
import {useRouter} from "next/router";

const ProfileHeader = () => {
    const router = useRouter()

    const arrayProfileSections = ['Главная', 'Магазин', 'Занятия', 'Профиль']

    const redirectHandler = () => router.push('/')


    return (
       <GlobalProfileTemplate>
           <UpperProfileHeaderTemplate>
               <ProfileLogo
                   onClick={redirectHandler}
               >
                   <Image src={gymProfile} width={200} height={50}/>
               </ProfileLogo>
               <ProfileTitle>
                   <div>GulyaevGYM</div>
                   <span>Личный кабинет</span>
               </ProfileTitle>
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