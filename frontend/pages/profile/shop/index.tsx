import React, {ReactNode} from 'react';
import {ProfileLayout} from "../../../src/components/layouts/ProfileLayout";
import Details from "../details";

const Shop = () => {
    return (
        <div>
            Shop
        </div>
    );
};

export default Shop;

Shop.getLayout = function getLayout(page: ReactNode) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
