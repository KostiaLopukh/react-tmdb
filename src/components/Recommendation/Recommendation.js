import React, {useEffect, useState} from 'react';

import {movieService} from "../../services/movieService";
import SimpleSlider from "../SlickSlider/SlickSlider";
import css from '../SlickSlider/SlickSlider.module.css'


const Recommendation = ({id}) => {
    const [recMovie, setRecMovie] = useState([]);

    useEffect(() => {
        movieService.getRecommendation(id).then(value => setRecMovie(value.results));

    }, [])

    const theme = localStorage.getItem('theme');

    return (<div className={theme === 'true' ? css.sliderBlack : css.sliderLight}>
        <SimpleSlider movies={recMovie}/>
    </div>);
};

export {Recommendation};