import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import Modal from '../Modal/Modal';
import config from '../../config';

import './LoginForm.scss';

const LoginForm = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const { setUser } = useContext(StoreContext);

    const handleOnChangeLogin = (e) => setLogin(e.target.value);
    const handleOnChangePassword = (e) => setPassword(e.target.value);
    const handleOnCloseModal = (e) => {
        e.preventDefault();
        handleOnClose();
        clearForm();
    };

    const clearForm = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${config.baseUrl}/users`, {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                login,
                password
            })
        })

        const data = await response.json();

        if (response.status === 200) {
            setUser(data.user);
            clearForm();
            handleOnClose();
        } else {
            setValidateMessage(data.message)
        };
    };

    const ValidateMessageComponent = validateMessage.length
        ? <p className="login-form__validate-message">{validateMessage}</p>
        : null;

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={true}>
            {ValidateMessageComponent}
            <form className="login-form" method="post" onSubmit={(e) => handleOnSubmit(e)}>
                <div className="login-form__row">
                    <label>
                        <input type="text" value={login} onChange={(e) => handleOnChangeLogin(e)} />
                    </label>
                </div>
                <div className="login-form__row">
                    <label>
                        <input type="password" value={password} onChange={(e) => handleOnChangePassword(e)} />
                    </label>
                </div>
                <div className="login-form__row">
                    <button type="submit">Zaloguj</button>
                    <button type="button" onClick={(e) => handleOnCloseModal(e)}>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
}

export default LoginForm;