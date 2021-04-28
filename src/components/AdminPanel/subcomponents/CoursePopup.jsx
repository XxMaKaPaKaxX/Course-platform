import React, { useState, useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import Modal from '../../Modal/Modal';
import config from '../../../config';
import './CoursePopup.scss';

const CoursePopup = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {
    const url = `${config.baseUrl}/courses`;
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext);
    const handleOnChangeAuthor = (event) => setAuthor(event.target.value);
    const handleOnChangeImg = (event) => setFormImg(event.target.value);
    const handleOnChangePrice = (event) => setFormPrice(event.target.value);
    const handleOnChangeTitle = (event) => setFormTitle(event.target.value);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const courseObj = {
            authors: formAuthors,
            id,
            img: formImg,
            price: Number(formPrice),
            title: formTitle
        };
        console.log(courseObj)
        if (isEditMode) {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseObj)
            })
            const data = await response.json();

            if (response.status === 202) {
                setCourses(data.courses);
            } else {
                console.log(data.message);
            }
        } else {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseObj)
            })
            const data = await response.json();

            if (response.status === 201) {
                setCourses(data.courses);
            }
        }

        hidePopup();
    };

    const handleAddAuthor = (event) => {
        event.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor]);
        setAuthor('');
    }

    const deleteAuthor = (event) => {
        const authorToDelete = event.target.dataset.author;
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
    }

    const authorsElements = formAuthors.map(author => (
        <li key={author}>
            <p>{author}</p>
            <button data-author={author} onClick={deleteAuthor}>Usuń</button>
        </li>
    ))

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs'

    return (
        <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
            <div className='course-popup'>
                <form className='course-popup__form' method='submit' onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='course-popup__form-row'>
                        <label>
                            Author
                            <input className='course-popup__input'
                                type='text'
                                value={formAuthor}
                                onChange={handleOnChangeAuthor}
                            />
                            <button onClick={handleAddAuthor}>Dodaj autora</button>
                        </label>
                    </div>

                    <div className='course-popup__form-row'>
                        <label>
                            Obrazek url:
                            <input className='course-popup__input'
                                type='text'
                                value={formImg}
                                onChange={handleOnChangeImg}
                            />
                        </label>
                    </div>

                    <div className='course-popup__form-row'>
                        <label>
                            Cena
                            <input className='course-popup__input'
                                type='number'
                                value={formPrice}
                                onChange={handleOnChangePrice}
                            />
                        </label>
                    </div>

                    <div className='course-popup__form-row'>
                        <label>
                            Tytuł:
                            <input className='course-popup__input'
                                type='text'
                                value={formTitle}
                                onChange={handleOnChangeTitle}
                            />
                        </label>
                    </div>
                    <button type='submit'>{correctLabel}</button>
                    <button type='button' onClick={hidePopup}>Anuluj</button>
                </form>
                <p>Lista autorów:</p>
                <ul>
                    {authorsElements}
                </ul>
            </div>
        </Modal>
    );
}

export default CoursePopup;