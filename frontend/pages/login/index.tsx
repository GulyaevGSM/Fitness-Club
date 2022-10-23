import React, {ReactNode} from 'react';

const Login = () => {
    return (
        <div>
            LOgin
        </div>
    );
};

export default Login;

Login.getLayout = function getLayout(page: ReactNode) {
    return (
        <>
            {page}
        </>
    )
}
