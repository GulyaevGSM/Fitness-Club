import React, {ReactNode} from 'react';
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Admin from "../index";

const Blog = () => {
    return (
        <div>
            Blog
        </div>
    );
};

export default Blog;

Blog.getLayout = function getLayout(page: ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

