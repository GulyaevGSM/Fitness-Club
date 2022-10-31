import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../../src/components/layouts/ProfileLayout";
import Profile from "../index";

const Work = () => {
    return (
        <div>
           Work
        </div>
    );
};

export default Work;

Work.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
