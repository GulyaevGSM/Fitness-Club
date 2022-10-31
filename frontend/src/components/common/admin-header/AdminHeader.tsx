import React from 'react';
import { AdminTemplate } from './styles/admin-header.style';
import Link from "next/link";

const AdminHeader = () => {
    return (
        <AdminTemplate>
            <Link href='/admin/users'>
                <div>Пользователи</div>
            </Link>
            <Link href='/admin/blog'>
                <div>Блог</div>
            </Link>
            <Link href='/admin/coaches'>
                <div>Тренеры</div>
            </Link>
            <Link href='/admin/services'>
                <div>Услуги</div>
            </Link>
        </AdminTemplate>
    );
};

export default AdminHeader;
