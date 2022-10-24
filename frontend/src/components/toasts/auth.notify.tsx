import toast from "react-hot-toast";

export const authNotify = (icon: any, params: string) => toast(params,
    {
        icon,
        style: {
            width: '300px',
            borderRadius: '10px',
            background: '#141415',
            color: '#fff',
        },
    }
);