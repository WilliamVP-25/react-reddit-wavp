import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Profile from "../app/users/Profile";

const UserRoutes = () => {
    return (
        <>
            <Route path='/users/:username'>
                <Profile/>
            </Route>
        </>
    );
};
export default UserRoutes;