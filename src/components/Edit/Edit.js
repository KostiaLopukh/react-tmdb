import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    changePassword,
    checkAuth, refresh,
    updateUser
} from "../../slices/authSlice/authSlice";
import {Header} from "../Header/Header";
import style from "../../pages/Register/Register.module.css";
import css from "./Edit.module.css"
import input from '../../components/Form/Form.module.css';
import button from '../Header/Header.module.css';
import {authService} from "../../services/authService"

const {forgotPassword} = authService;

const Edit = () => {

    const {error401, error403, status200, allowToNavigate} = useSelector(state => state['authReducer']);
    const {themeStatus} = useSelector(state => state['moviesReducer']);

    const theme = localStorage.getItem('theme');
    const [form, setForm] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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


    if (allowToNavigate) {
        navigate('/account', {replace: true})
        document.location.reload();
    }

    const {state} = useLocation();
    const {name, phone, email, isActivated} = state;


    const {register, handleSubmit} = useForm();
    const update = async (data) => {
        dispatch(updateUser({...data, email}));
    };

    const change = async (data) => {
        const accessToken = localStorage.getItem('accessToken')
        const {oldPassword, newPassword} = data;
        dispatch(changePassword({oldPassword, newPassword, accessToken}))
    };

    const sendEmailForgotPassword = async () => {
        const email = localStorage.getItem('email');
        const response = await forgotPassword(email)
        if (response.status === 200) {
            setSendEmail(true);
        }
    };

    return (
        <div className={theme === 'true' ? style.containerBlack : style.containerWhite}>
            <Header/>


            <div className={css.row}>
                <form onSubmit={handleSubmit(update)} className={css.form}>
                    Name: <input className={`${input.input} ${input.login}`} type="text"
                                 defaultValue={name} {...register('name')}/>
                    Phone number: <input className={`${input.input} ${input.login}`} type="text"
                                         defaultValue={phone} {...register('phone')}/>

                    <input type="submit" value={'Edit'} className={`${button.bn632} ${button.bn19}`}/>
                </form>

                <div className={css.buttonsToChange}>
                    <button onClick={() => setForm(!form)} className={`${button.bn632} ${button.bn19}`}>Change password
                    </button>
                    <button className={`${button.bn632} ${button.bn19}`}
                            onClick={() => sendEmailForgotPassword()}>Forgot
                        password
                    </button>
                </div>

                {form && isActivated ?
                    <form onSubmit={handleSubmit(change)}>
                        <div className={css.changePasswordForm}>
                            <div className={css.changePasswordRow}>
                                <input className={`${input.input} ${input.login}`} type="text"
                                       placeholder={'Old password'} {...register('oldPassword')}/>
                                <input className={`${input.input} ${input.login}`} type="text"
                                       placeholder={'New password'} {...register('newPassword')}/>
                            </div>
                            <div>
                                <button type={'submit'} className={`${button.bn632} ${button.bn19}`}>Change</button>
                            </div>
                        </div>
                    </form>
                    : null
                }
                {form && isActivated===false ? <span>To change you password, please, activate your account ^)</span> : null}

                {status200 && <span>Password changed successfully!</span>}
                {sendEmail && <span>Email sent successfully, please check your box!</span>}
                {error403 && <span>Wrong old password</span>}
            </div>

        </div>
    );
};

export default Edit;
