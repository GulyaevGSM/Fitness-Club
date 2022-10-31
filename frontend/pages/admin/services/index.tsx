import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Admin from "../index";

const Services = () => {
    return (
        <div>
            Services
        </div>
    );
};

export default Services;

Services.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
