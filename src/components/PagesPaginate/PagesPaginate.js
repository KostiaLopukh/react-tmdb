import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMovies, getByString, setCurrentPage} from "../../slices/moviseSlice/moviesSlice";
import css from "./PagesPaginate.module.css";
import {createPages} from "../../custom/pageCreator";

const PagesPaginate = () => {
    const dispatch = useDispatch();
    const {currentPage, totalPages, string} = useSelector(state => state['moviesReducer']);

    const pages = [];
    createPages(pages, totalPages, currentPage);

    return (
        <>
            <div className={css.pages}>
                {pages.map((page, index) => <a
                    className={page === currentPage ? css.currentPage : css.page} key={index}
                    onClick={() => {
                        dispatch(setCurrentPage({page}))
                        if (string.length) {
                            dispatch(getByString({string, page}));
                        } else {
                            dispatch(getMovies({page}));
                        }
                    }}>{page}</a>)}
                <div className={css.totalPages}>
                    <a>...{totalPages}</a>
                </div>
            </div>
        </>
    );
};

export {PagesPaginate};