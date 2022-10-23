import AppHeader from "../common/app-header/AppHeader";

const AppLayout = ({children}: any) => {
    return (
        <>
            <AppHeader />
            <div className='content'>
                {children}
            </div>
        </>
    );
};

export default AppLayout;