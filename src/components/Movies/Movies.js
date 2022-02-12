import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, getMoviesGenres} from "../../slices/moviseSlice/moviesSlice";
import css from './Movies.module.css';
import {Loading, Movie, PagesPaginate, EmptyResponse} from "../index";


const Movies = () => {
    const {
        moviesPerPage,
        currentPage,
        status,
        emptyResponse
    } = useSelector(state => state['moviesReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies({page: currentPage}));
        dispatch(getMoviesGenres());
    }, [])

    const themeStatus = localStorage.getItem('theme')

    return (
        <div>

            {status === 'pending' && <Loading/>}
            {emptyResponse && status === 'fulfilled' ? <EmptyResponse/> : null}

            <div className={themeStatus === 'false' ? css.MoviesRowBlack : css.MoviesRowLight}>
                {status === 'fulfilled' && moviesPerPage.map((movie, index) => (<Movie
                        key={index} movie={movie}/>
                ))}
                <div>{status === 'fulfilled' && <PagesPaginate/>}</div>
            </div>

        </div>
    );
};

export {Movies};