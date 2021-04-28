import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import CoursePopup from './CoursePopup';
import config from '../../../config';

const CourseDetails = (props) => {
    const url = `${config.baseUrl}/courses`;
    const { id, title } = props;
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { setCourses } = useContext(StoreContext);

    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = (event) => {
        if (event) {
            event.preventDefault();
        }
        setIsOpenPopup(false);
    }

    const handleDeletePopup = async () => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            })

            if (response.status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id));
            } else {
                console.log(response.status);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <details>
            <summary>{title}</summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={handleDeletePopup}>Usuń</button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
        </details>
    );
}

export default CourseDetails;