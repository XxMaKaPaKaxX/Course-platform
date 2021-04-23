import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ isUserLogged }) => {
    return (
        <>
            <p className="aside-menu__title">Panel użytkownika</p>
            <nav>
                <ul>
                    <li className="aside-menu__link">
                        <Link to="/">Kursy w sprzedaży</Link>
                    </li>
                    {isUserLogged && <li className="aside-menu__link"><Link to="my-courses">Moje zakkupione kursy</Link></li>}
                </ul>
            </nav>
        </>
    );
}

export default UserMenu;