import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import LoginForm from '../LoginForm/LoginForm';
/* import Modal from '../Modal/Modal'; */
import './Header.scss';




const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, setUser } = useContext(StoreContext);

    const handleOnClose = () => setIsModalOpen(false);
    const handleOnClick = () => {
        if (Boolean(user)) {
            setUser(null);
        } else {
            setIsModalOpen(true);
        }
    }

    const labelForButton = user ? 'Wyloguj się' : 'Zaloguj się';

    return (
        <>
            <header className='header'>
                <div className='header__logo-wrapper'></div>
                <h1 className='header__title'>Super kursy dla programistów!</h1>
                <button onClick={handleOnClick}>{labelForButton}</button>
                <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
            </header>
        </>
    );
}

export default Header;