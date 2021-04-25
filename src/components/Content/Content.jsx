import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';
import UserCourses from '../UserCourses/UserCourses';
import Courses from './Courses/Courses';


import './Content.scss';

const ADMIN_TYPE = 1;

const Content = () => {
    const { user } = useContext(StoreContext);
    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_TYPE;

    return (
        <main className="content">
            <Switch>
                <Route exact path="/" render={() => <Courses />} />
                {isUserLogged && <Route exact path="/my-courses" render={() => <UserCourses />} />}
                {isAdmin && <Route exact path="/manage-courses" render={() => <div>strona admina</div>} />}

                <Redirect to="/" />
            </Switch>
        </main>
    );
}

export default Content;