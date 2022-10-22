import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from "../common/AppHeader";

const AppLayout = () => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    );
};

export default AppLayout;
