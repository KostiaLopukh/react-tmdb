import React from 'react';

import css from './Layout.module.css'
import {Header, Movies} from "../../components";


const Layout = () => {

    return (
        <div className={css.main}>
            <div>
                <Header form={true} genres={true} register={true}/>
                <Movies/>
            </div>
        </div>
    );

};

export {Layout};
