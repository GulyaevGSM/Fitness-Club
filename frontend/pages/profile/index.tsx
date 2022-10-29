import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../src/components/layouts/ProfileLayout";

const Profile = () => {
    return (
        <div>
            Profile
        </div>
    );
};

export default Profile

Profile.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

// export const getServerSideProps = async (ctx: any) => {
//     try {
//
//     } catch (e) {
//         console.log(e)
//     }
// }