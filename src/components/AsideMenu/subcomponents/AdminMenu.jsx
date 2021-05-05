import React from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <p className="aside-menu__title">Panel administratora</p>
            <nav>
                <ul>
                    <li className="aside-menu__link">
                        <Link to="/manage-courses">Zarządzania kursami</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default AdminMenu;