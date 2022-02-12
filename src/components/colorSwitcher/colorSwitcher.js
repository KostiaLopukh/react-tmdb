import React from 'react';
import Switch from '@material-ui/core/Switch'
import {useDispatch, useSelector} from "react-redux";

import {changeSwitcherStatus} from "../../slices/moviseSlice/moviesSlice";

const ColorSwitcher = () => {
    const dispatch = useDispatch();
    const {switcherStatus} = useSelector(state => state['moviesReducer']);

    const state = localStorage.getItem('theme')

    return (

        <div>
            <Switch checked={state === 'true'} onChange={() => {
                dispatch(changeSwitcherStatus())
            }}/>
        </div>

    );
};

export {ColorSwitcher};