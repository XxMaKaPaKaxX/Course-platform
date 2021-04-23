import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ children, handleOnClose, isOpen, shouldBeClosedOnOutsideClick }) => {

    const modalRef = useRef(null);
    const previosActiveElement = useRef(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        const { current: modal } = modalRef;

        if (isOpen) {
            previosActiveElement.current = document.activeElement;
            modal.showModal();
        } else if (previosActiveElement.current) {
            modal.close();
            previosActiveElement.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const { current: modal } = modalRef;
        const handleCancel = event => {
            event.preventDefault();
            handleOnClose();
        };
        modal.addEventListener('cancel', handleCancel);

        return () => {
            modal.removeEventListener('cancel', handleCancel);
        }
    }, [handleOnClose])

    const handleOutsideClick = ({ target }) => {
        const { current } = modalRef;

        if (shouldBeClosedOnOutsideClick && target === current) {
            handleOnClose();
        }
    }

    return ReactDOM.createPortal((
        <dialog
            className='modal'
            ref={modalRef}
            onClick={(e) => handleOutsideClick(e)}
        >
            {children}
        </dialog>
    ), document.body);
}

export default Modal;