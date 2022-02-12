import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import css from './Header.module.css'
import {getMovies} from "../../slices/moviseSlice/moviesSlice";
import {Form, ColorSwitcher, DropDownGenres} from "../index";


const Header = ({form, genres}) => {

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    return (<>
        <div className={css.Header}>
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