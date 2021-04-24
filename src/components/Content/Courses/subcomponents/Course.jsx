import React from 'react';

import './Course.scss';

const Course = ({ authors, id, img, price, title }) => {
    const allAuthors = authors.join(', ')

    return (
        <li>
            <article className="course-card">
                <img src={img} alt={title} className="course-card__image" />
                <h3 className="course-card__title">{title}</h3>
                <p className="course-card__price">{`Cena kursu: ${price}zł`}</p>
                <p className="course-card__author">{`Autorzy kursu: ${allAuthors}`}</p>
            </article>
        </li>
    );
}

export default Course;