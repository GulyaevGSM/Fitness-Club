import React from 'react';
import AdminHeader from "../common/admin-header/AdminHeader";

const AdminLayout = ({children}: any) => {
    return (
        <>
        <AdminHeader />
        <div className='content'>
            {children}
        </div>
        </>
    );
};

export default AdminLayout;
