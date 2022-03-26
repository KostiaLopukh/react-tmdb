import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import css from './Header.module.css'
import {getMovies} from "../../slices/moviseSlice/moviesSlice";
import {logoutUser} from "../../slices/authSlice/authSlice";

import {Form, ColorSwitcher, DropDownGenres} from "../index";
import DropDownAccount from "../DropDownAccount/DropDownAccount";


const Header = ({form, genres, register}) => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [openAccount, setOpenAccount] = useState(false)

    const dispatch = useDispatch();
    const email = localStorage.getItem('email');

    let isAuth;
    switch (localStorage.getItem('isAuth')) {
        case 'true':
            isAuth = true;
            break;
        case 'false':
            isAuth = false;
            break;
        default:
            isAuth = false;
    }


    return (<>
        <div className={css.Header}>

            {!isAuth && <div className={css.auth}>
                <div>
                    <button className={`${css.bn632} ${css.bn19} ${css.log}`}>
                        <Link to={'/register'}>Register</Link>
                    </button>
                </div>

                <div>
                    <button className={`${css.bn632} ${css.bn19} ${css.log}`}>
                        <Link to={'/login'}>Login</Link>
                    </button>
                </div>

            </div>
            }

            {isAuth &&
                <div>
                    <div className={css.account} onClick={() => setOpenAccount(!openAccount)}>
                        <a className={css.accountFather}>
                            <span className={css.accountChild}>{email}</span>
                            <div className={css.liquid}/>
                        </a>
                    </div>

                    {openAccount && <DropDownAccount/>}

                </div>
            }

            <Link to={'/'}>
                <ul className={css.nav}>
                    <li onClick={() => {
                        dispatch(getMovies({page: 1}));
                    }}><span>Home</span></li>
                </ul>
            </Link>

            {form && <Form/>}

            <div className={css.colorSwitcher}>
                <ColorSwitcher/>
                {genres && <div className={css.check}>
                    <div className={css.father} onClick={() => setOpen(!open)}>
                        <a className={css.buttonFather}>
                            <span className={css.buttonChild}>genres</span>
                            <div className={css.liquid}/>
                        </a>
                    </div>
                    <div>{open && <DropDownGenres/>}</div>
                </div>}

            </div>

        </div>
    </>);
};

export {Header};
