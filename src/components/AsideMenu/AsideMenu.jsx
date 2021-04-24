import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';

import './AsideMenu.scss';

const ADMIN_TYPE = 1;

const AsideMenu = () => {

    const { user } = useContext(StoreContext);
    if (user) {

    }
    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE
        ? <AdminMenu />
        : null;

    return (
        <section className="aside-menu">
            <div className="aside-menu__nav-wrapper">
                <UserMenu isUserLogged={Boolean(user)} />
                {adminMenuComponent}
            </div>
        </section>
    );
}

export default AsideMenu;