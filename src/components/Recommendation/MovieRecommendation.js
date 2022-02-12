import React from 'react';

import css from "../SlickSlider/SlickSlider.module.css";
import {Link} from "react-router-dom";

const MovieRecommendation = ({movie}) => {
    const {poster_path, original_title, id} = movie;
    const theme = localStorage.getItem('theme');

    return (<div className={theme === 'true' ? css.sliderBlack : css.sliderLight}>

            <Link to={`/id/${id.toString()}`} target={'_blank'}>

                <div className={css.recommendationHover}>
                    <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt=""/>
                </div>
                <div>
                    <h3 className={theme === 'true' ? css.sliderBlack : css.sliderLight}>{original_title}</h3>
                </div>
            </Link>

        </div>
    );
};

export {MovieRecommendation};


