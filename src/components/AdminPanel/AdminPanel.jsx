import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';

const AdminPanel = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { courses } = useContext(StoreContext);

    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = (event) => {
        if (event) {
            event.preventDefault();
        }

        setIsOpenPopup(false);
    }

    const coursesElements = courses.map((course) => <CourseDetails key={course.id} {...course} />)

    return (
        <section>
            {coursesElements}
            <button onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} isEditMode={false} />
        </section>
    );
}

export default AdminPanel;