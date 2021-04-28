import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';
import UserCourses from '../UserCourses/UserCourses';
import Courses from './Courses/Courses';
import AdminPanel from '../AdminPanel/AdminPanel';

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
                {isAdmin && <Route exact path="/manage-courses" render={() => <AdminPanel />} />}
                <Redirect to="/" />
            </Switch>
        </main>
    );
}

export default Content;