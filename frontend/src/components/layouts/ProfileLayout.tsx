import React from 'react';
import {Outlet} from "react-router-dom";
import ProfileHeader from "../common/ProfileHeader";

const ProfileLayout = () => {
    return (
        <>
            <ProfileHeader />
            <div className='content'>
                <Outlet />
            </div>
        </>
    );
};

export default ProfileLayout;
