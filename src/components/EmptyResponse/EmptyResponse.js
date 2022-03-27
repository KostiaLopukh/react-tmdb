import React from 'react';

import css from './EmptyResponse.module.css';

const EmptyResponse = () => {

    const theme = localStorage.getItem('theme');
    return (
        <div className={`${css.EmptyResponse} ${theme==='true'?css.black:css.light}`}>

            Nothing found. Clarify your request.

        </div>
    );
};

export {EmptyResponse};
