import React from 'react';
import {Routes, Route} from "react-router-dom";

import {MovieDetails, Layout} from "./pages";
import {Register} from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Edit from "./components/Edit/Edit";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {

    return (<div>
        <Routes>
            <Route path={'/'} element={<Layout/>}/>
            <Route path={'/id/:id'} element={<MovieDetails/>}/>

            <Route path={'/account'} element={<Account/>}/>
            <Route path={'/editProfile'} element={<Edit/>}/>
            <Route path={'/newPassword'} element={<ForgotPassword/>}/>


            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/logout'} element={<Logout/>}/>
        </Routes>
    </div>);


};

export default App;



