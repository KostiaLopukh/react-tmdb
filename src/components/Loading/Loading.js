import React from 'react';

import css from './Loading.module.css'

const Loading = () => {
    const theme = localStorage.getItem('theme')

    return (

        <div className={theme === 'true' ? css.loadingBlack : css.loadingLight}>
            <div className={css.load}><span/></div>
        </div>
    );
};

export {Loading};