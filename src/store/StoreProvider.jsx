import React, { createContext, useEffect, useState } from 'react';
import config from '../config';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {

    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        const response = await fetch(`${config.baseUrl}/courses`);
        const data = await response.json();
        setCourses(data.courses)
    }

    useEffect(() => {
        fetchData()
        /* .then(() => console.log('dane dot. kursów załadowane'))
        .catch(err => console.log('dane dot. kursów nie zostały pomyślnie załadowane', err)) */
    }, [])


    return (
        <StoreContext.Provider value={{
            courses,
            setCourses,
            user,
            setUser
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;