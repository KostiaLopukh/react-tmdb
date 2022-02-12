import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, getByString} from "../../slices/moviseSlice/moviesSlice";
import css from './Form.module.css'

const Form = () => {
    const dispatch = useDispatch();
    const {currentPage} = useSelector(state => state['moviesReducer'])

    const onChange = (e) => {
        if (e.target.value === '') {
            dispatch(getMovies({page: 1}));
        } else {
            dispatch(getByString({string: e.target.value, page: currentPage}));
        }
    }


    return (
        <form>
            <input className={css.input} type="text" defaultValue={''} onChange={onChange}
                   placeholder={'  Search'}/>
        </form>
    );

}

export {Form};