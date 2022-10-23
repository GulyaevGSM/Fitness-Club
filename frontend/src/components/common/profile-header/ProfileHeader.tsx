import React from 'react';
import { ProfileTitle, ProfileLogo, GlobalProfileTemplate, UpperProfileHeaderTemplate, LowerProfileHeaderTemplate, ProfileSection } from './styles/profile-header.styles';
import Image from 'next/image'
import gymProfile from '../../../../public/gym-profile.svg'

const ProfileHeader = () => {

    const arrayProfileSections = ['Главная', 'Магазин', 'Занятия', 'Профиль']

    return (
       <GlobalProfileTemplate>
           <UpperProfileHeaderTemplate>
               <ProfileLogo>
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