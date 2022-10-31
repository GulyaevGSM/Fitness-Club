import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Admin from "../index";

const Coaches = () => {
    return (
        <div>
            Coaches
        </div>
    );
};

export default Coaches;

Coaches.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
