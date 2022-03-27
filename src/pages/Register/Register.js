import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../slices/authSlice/authSlice";
import {useForm} from "react-hook-form";
import {Header} from "../../components";
import css from './Register.module.css';
import style from '../../components/Header/Header.module.css';
import {registerValidator} from "../../validators/registerValidator";
import form from "../../components/Form/Form.module.css";

const Register = () => {


    const [repeatPassword, setRepeatPassword] = useState('')
    const [password, setPassword] = useState('')

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: joiResolver(registerValidator),
        mode: 'onTouched'
    });
    const theme = localStorage.getItem('theme');

    const dispatch = useDispatch();

    const {isAuth, error, error400} = useSelector(state => state['authReducer']);
    const {switcherStatus} = useSelector(state => state['moviesReducer']);


    const navigate = useNavigate();

    const submit = (data) => {
        dispatch(registerUser({data}));
    };

    if (isAuth) {
        navigate('/', {replace: true})
    }


    return <div>
        <div className={theme === 'true' ? css.containerBlack : css.containerWhite}>
            <Header genres={false}/>

            <form onSubmit={handleSubmit(submit)} className={css.register}>
                <input className={`${form.input} ${form.login}`} type="text" defaultValue={''}
                       placeholder={'Name'} {...register('name')}/>
                {errors.name && <span>{errors.name.message}</span>}
                <input className={`${form.input} ${form.login}`} type="email" defaultValue={''}
                       placeholder={'Email'} {...register('email')}/>
                {errors.email && <span>{errors.email.message}</span>}
                <input className={`${form.input} ${form.login}`} type="password" defaultValue={''}
                       placeholder={'Password'} {...register('password')} onChange={e => setPassword(e.target.value)}/>
                {errors.password && <span>{errors.password.message}</span>}
                <input className={`${form.input} ${form.login}`} type="password" defaultValue={''}
                       placeholder={'Repeat password'} onChange={e => setRepeatPassword(e.target.value)}/>
                {password !== repeatPassword && <span>Passwords are different</span>}
                <input className={`${form.input} ${form.login}`} type="text" defaultValue={''}
                       placeholder={'+380999999999'} {...register('phone')}/>
                {errors.phone && <span>{errors.phone.message}</span>}
                <button className={`${style.bn632} ${style.bn19}`}>
                    Register
                </button>
                {error && <div style={{color:'orange'}}>{error}</div>}
            </form>

        </div>

    </div>;
};

export {Register};
