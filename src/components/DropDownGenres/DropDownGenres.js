import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from '../Header/Header.module.css'
import {changeStatus, getMovies} from "../../slices/moviseSlice/moviesSlice";

const DropDownGenres = () => {

    const {genres} = useSelector(state => state['moviesReducer']);

    const dispatch = useDispatch()

    return (<div className={css.dropGenres}>
        {genres.map((genre, index) => (<div key={index}>
            <span className={css.dropName}>{genre.name}</span>
            <input type="checkbox" checked={genre.status} onChange={() => {
                dispatch(changeStatus({id: genre.id}))
                dispatch(getMovies({page: 1}))
            }}/>

        </div>))}
    </div>);

};

export {DropDownGenres};