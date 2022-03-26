import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom'
import {Header} from "../../components";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "../../validators/passwordValidator";
import css from './ForgotPassword.module.css'
import form from "../../components/Form/Form.module.css";
import head from "../../components/Header/Header.module.css";
import {checkAuth, forgotPasswordSet, refresh} from "../../slices/authSlice/authSlice";
import {useDispatch, useSelector} from "react-redux";
import style from "../Register/Register.module.css";

const ForgotPassword = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notEqual, setNotEqual] = useState('');
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: joiResolver(passwordValidator),
        mode: 'onTouched'
    })
    const {error401, status200} = useSelector(state => state['authReducer']);
    const {themeStatus} = useSelector(state => state['moviesReducer']);

    const dispatch = useDispatch();
    const token = searchParams.get('actionToken');
    const theme = localStorage.getItem('theme')

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        dispatch(checkAuth({accessToken}));
    }, []);

    useEffect(() => {
        if (error401) {
            const refreshToken = localStorage.getItem('refreshToken');
            dispatch(refresh({refreshToken}));
        }
    }, [error401])

    const change = (data) => {
        const {password} = data;
        if (data.password !== data.repeatPassword) {
            setNotEqual('Not equal passwords, try again');
            return;
        }
        setNotEqual('');
        dispatch(forgotPasswordSet({actionToken: token, newPassword: password}))
    };

    return (

        <div className={`${css.row} ${theme === 'true' ? style.containerBlack : style.containerWhite}`}>
            <Header/>
            <div className={css.formRow}>
                <form onSubmit={handleSubmit(change)} className={css.form}>
                    <input className={`${form.input} ${form.login}`} type="password" {...register('password')}
                           placeholder={'New password'} defaultValue={''} onChange={() => setNotEqual('')}/>
                    {errors.password && <span>{errors.password.message}</span>}
                    <input className={`${form.input} ${form.login}`} type="password" {...register('repeatPassword')}
                           placeholder={'Repeat new password'} defaultValue={''} onChange={() => setNotEqual('')}/>
                    {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
                    {notEqual && <span>{notEqual}</span>}
                    {status200 && <span>Password changed successfully, attend <a href="http://localhost:3000/login"
                                                                                 style={{color: 'purple'}}>this</a> to login again</span>}
                    <input className={`${head.bn632} ${head.bn19}`} type="submit" value={'Set new'}/>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
