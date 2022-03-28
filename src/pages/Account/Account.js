import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {Header} from "../../components";
import css from './Account.module.css';
import style from '../Register/Register.module.css'
import button from '../../components/Header/Header.module.css';
import {authService} from '../../services/authService';
import Edit from "../../components/Edit/Edit";

const Account = () => {
    const [user, setUser] = useState({});
    const [emailSent, setEmailSent] = useState(false);
    const theme = localStorage.getItem('theme')
    const dispatch = useDispatch();
    const email = localStorage.getItem('email');

    const {themeStatus} = useSelector(state => state['moviesReducer']);

    useEffect(async () => {
        const {user} = await authService.getDetailsByEmail(email).then(value => value.data);
        setUser(user);
    }, [])

    const edit = () => {
        return <Edit/>
    };

    const createdAt = new Date(user?.createdAt);
    const today = new Date();
    const diffTime = Math.abs(createdAt - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const sendMailActivate = async () => {
        const response = await authService.sendMailActivate(user.email)
        if (response.status === 200) {
            setEmailSent(true);
        }
    };


    return (
        <div className={`${css.row} ${theme === 'true' ? style.containerBlack : style.containerWhite}`}>
            <Header/>
            <div className={css.main}>
                <div>
                    <h1>Your profile</h1>
                </div>
                <div className={css.flexRow}>
                    <div>
                        <img src={user.avatar} className={css.avatar} alt=""/>
                    </div>
                    <div>
                        <span>Name:</span>
                        <div className={css.info}>
                            {user.name}
                        </div>
                        <span>Email:</span>
                        <div className={css.info}>
                            {user.email}
                        </div>
                        <span>Phone:</span>
                        <div className={css.info}>
                            {user.phone}
                        </div>
                        <span>Status:</span>
                        <div className={css.info}>
                            {user.isActivated ? 'Activated' : 'Not activated'}
                        </div>
                        <div>
                            {!user.isActivated &&
                                <button className={`${button.bn632} ${button.bn19} ${button.activate}`}
                                        onClick={() => sendMailActivate()}>Activate</button>}
                            {emailSent &&
                                <div style={{padding: '10px 0'}}><span>Email sent successfully, please, check your box to activate your account!</span>
                                </div>}
                        </div>
                        <span>Date:</span>
                        <div className={css.info}>
                            Account was created {diffDays} days ago - {user.createdAt && user.createdAt.slice(0, 10)}
                        </div>

                        <button className={`${button.bn632} ${button.bn19}`}>
                            <Link to={'/editProfile'} state={user}>Edit</Link>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Account;
