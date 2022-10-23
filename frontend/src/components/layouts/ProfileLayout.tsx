import ProfileHeader from "../common/profile-header/ProfileHeader";

export const ProfileLayout = ({children}: any) => {
    return (
        <>
            <ProfileHeader />
            <div className='content'>
                {children}
            </div>
        </>
    );
};

