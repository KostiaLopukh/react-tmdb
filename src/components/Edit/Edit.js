import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    changePassword,
    checkAuth, refresh,
    updateUser, uploadAvatar
} from "../../slices/authSlice/authSlice";
import {Header} from "../Header/Header";
import style from "../../pages/Register/Register.module.css";
import css from "./Edit.module.css"
import input from '../../components/Form/Form.module.css';
import button from '../Header/Header.module.css';
import {authService} from "../../services/authService"

const {forgotPassword} = authService;

const Edit = () => {

    const {error401, error403, status200, allowToNavigate, changedAvatar} = useSelector(state => state['authReducer']);

    const {themeStatus} = useSelector(state => state['moviesReducer']);
    const theme = localStorage.getItem('theme');
    const [form, setForm] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState(false);
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

    const onSelectImageHandler = async (files) => {
        const accessToken = localStorage.getItem('accessToken')
        const file = files[0];
        const formData = new FormData();

        formData.append('avatar', file)

        dispatch(uploadAvatar({accessToken, formData}))
    }

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

                <button className={`${button.bn632} ${button.bn19}`}
                        onClick={() => setChangeAvatar(!changeAvatar)}>Change avatar
                </button>

                {changeAvatar && <div style={{marginTop:"10px"}}>
                    <input type="file"
                           onChange={(e) => onSelectImageHandler(e.target.files)}
                    />
                    {changedAvatar && <span>Avatar changed successfully</span>}
                </div>
                }

                {form && isActivated === false ?
                    <span>To change you password, please, activate your account ^)</span> : null}

                {status200 && <span>Password changed successfully!</span>}
                {sendEmail && <span>Email sent successfully, please check your box!</span>}
                {error403 && <span>Wrong old password</span>}


            </div>


        </div>
    );
};

export default Edit;

