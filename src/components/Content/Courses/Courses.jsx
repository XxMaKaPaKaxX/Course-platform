import React, { useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider.jsx';
import Course from './subcomponents/Course';


import './Courses.scss';

const Courses = () => {

    const { courses } = useContext(StoreContext);

    const coursesElements = courses.map(course => <Course key={course.id} {...course} />)

    return (
        <section className="courses">
            <h2 className="courses__title">t</h2>
            <ul className="courses__list">
                {coursesElements}
            </ul>
        </section>
    );
}

export default Courses;