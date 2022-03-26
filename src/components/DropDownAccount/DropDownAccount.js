import React from 'react';
import {logoutUser} from "../../slices/authSlice/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import css from '../Header/Header.module.css';


const DropDownAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        const accessToken = localStorage.getItem('accessToken');
        dispatch(logoutUser({accessToken}));
        navigate('/', {replace: true})
    };

    return (
        <div className={css.dropDownDetails}>

            <div>
                <button className={`${css.bn632} ${css.bn19}`}>
                    <Link to={'/account'}>Account</Link>
                </button>
            </div>

            <div>
                <button className={`${css.bn632} ${css.bn19}`} onClick={() => logout()}>Logout</button>
            </div>




        </div>
    );
};

export default DropDownAccount;
