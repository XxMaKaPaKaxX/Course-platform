import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import config from '../../config';
import { StoreContext } from '../../store/StoreProvider';

import './Course.scss';

const Course = ({ authors, id, img, price, title, isUserContext }) => {
    const url = `${config.baseUrl}/users`;
    const { user, setUser } = useContext(StoreContext);
    const allAuthors = authors.join(', ');
    const history = useHistory();
    const isUserLogged = Boolean(user);

    const handleOnClick = async () => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    login: user.login,
                    courseId: id
                })
            })

            const data = await response.json();

            if (response.status === 202) {
                setUser(data.user);
                history.push('/my-courses');
            }
        } catch (err) {
            console.log(err)
        }
    };

    const sholdBeByeButton = isUserLogged && !isUserContext
    return (
        <li>
            <article className="course-card">
                <img src={img} alt={title} className="course-card__image" />
                <h3 className="course-card__title">{title}</h3>
                <p className="course-card__price">{`Cena kursu: ${price}zł`}</p>
                <p className="course-card__author">{`Autorzy kursu: ${allAuthors}`}</p>
                {sholdBeByeButton && <button onClick={handleOnClick}>Kup ten kurs</button>}
            </article>
        </li>
    );
}

export default Course;