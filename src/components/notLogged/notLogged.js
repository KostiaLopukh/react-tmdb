import React from 'react';
import {Link} from "react-router-dom";
import {Header} from "../Header/Header";
import css from './notLogged.module.css';
import style from '../../pages/Register/Register.module.css';

const NotLogged = () => {
    const theme = localStorage.getItem('theme');


    return (
        <div className={theme === 'true' ? style.containerBlack : style.containerWhite}>
            <Header register={true} genres={false} form={false}/>
            <div className={css.row} style={theme === 'ture' ? {color: 'white'} : {color: 'black'}}>
                <div className={css.text}>Sorry, but to see this page you must be logged in!</div>
            </div>
        </div>
    );
};

export default NotLogged;
