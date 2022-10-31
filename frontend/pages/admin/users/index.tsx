import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Admin from "../index";

const Users = () => {
    return (
        <div>
            Users
        </div>
    );
};

export default Users;

Users.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
