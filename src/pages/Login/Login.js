import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login, setError, setIsAuth} from "../../slices/authSlice/authSlice";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {Header} from "../../components";
import style from '../Register/Register.module.css';
import css from './Login.module.css';
import head from '../../components/Header/Header.module.css';
import form from '../../components/Form/Form.module.css';
import {loginValidator} from "../../validators/loginValidator";
import {authService} from "../../services/authService";


const {forgotPassword} = authService;

const Login = () => {
    const dispatch = useDispatch();

    const [currentEmail, setCurrentEmail] = useState('')
    const [sendEmail, setSendEmail] = useState('');


    const {isAuth, error} = useSelector(state => state['authReducer']);
    const {themeStatus} = useSelector(state => state['moviesReducer']);

    const theme = localStorage.getItem('theme');

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: joiResolver(loginValidator),
        mode: 'onTouched'
    });

    const submit = (data) => {
        const {email, password} = data;
        dispatch(login({email, password}))
    }

    const sendEmailForgotPassword = async () => {
        setSendEmail('Wait a minute')
        dispatch(setError(null))
        const response = await forgotPassword(currentEmail)
        if (response.status === 200) {
            setSendEmail(true);
        }
    };

    if (isAuth) {
        navigate('/');
    }

    return (
        <div className={theme === 'true' ? style.containerBlack : style.containerWhite}>
            <Header/>
                <form onSubmit={handleSubmit(submit)} className={css.form} >

                    <input className={`${form.input} ${form.login}`} type="text" defaultValue={''} placeholder={'Email'}
                           {...register('email')} onChange={(e)=>setCurrentEmail(e.target.value)}/>
                    {errors.email && <span>{errors.email.message}</span>}
                    <input className={`${form.input} ${form.login}`} type="password" defaultValue={''} placeholder={'Password'} {...register('password')}/>
                    {errors.password && <span>{errors.password.message}</span>}
                    {error && <div>{error}</div>}
                    <button type={'submit'} className={`${head.bn632} ${head.bn19}`}>
                        Login
                    </button>

                    <span className={style.forgot} onClick={() => sendEmailForgotPassword()}>Forgot password</span>
                    {sendEmail && <span style={{color:'orange'}}>Email sent successfully, please check your box!</span>}

                </form>


        </div>
    );
};

export default Login;
