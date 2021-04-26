import React, { useContext } from 'react';
import Course from '../Course/Course';
import { StoreContext } from '../../store/StoreProvider';

import './UserCourses.scss';

const UserCourses = () => {

    const { user, courses } = useContext(StoreContext);
    const userCourses = courses
        .filter(course => user.courses.includes(course.id))
        .map(course => <Course key={course.id} {...course} isUserContext={true} />);

    return (
        <section className="user-courses">
            <h2 className="user-courses__title">Twoje wykupione kursy</h2>
            <ul className="user-courses__list">
                {userCourses}
            </ul>
        </section>
    );
}

export default UserCourses;