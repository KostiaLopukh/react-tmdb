import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import css from './Movie.module.css'
import {genresFinder} from "../../custom/genresFinder";

const Movie = ({movie}) => {
    const {id, poster_path, title, vote_average, release_date, genre_ids} = movie
    const {genres} = useSelector(state => state['moviesReducer']);

    const currentGenresArr = [];
    genresFinder(genres, genre_ids, currentGenresArr);

    const themeStatus = localStorage.getItem('theme')

    return (<div className={css.Movie}>

        <Link to={`/id/${id.toString()}`}>
            <div className={css.dws}>
                <div className={css.blocImg}><img
                    src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt={title}/>
                    <div className={css.blocText}>
                        <div className={css.text}>
                            <h2>Details <span>of this movie</span></h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={themeStatus === 'true' ? css.titleBlack : css.titleLight}>
                {title}
            </div>
            <div className={themeStatus === 'true' ? css.ratingBlack : null}>
                <span>Rating</span>: {vote_average}</div>
            <div className={themeStatus === 'true' ? css.release_dataBlack : null}>
                <span>Release date:</span> {release_date}
            </div>
            <div className={css.genres}>
                {currentGenresArr.map((genre, index) => <span key={index}
                                                              className={themeStatus === 'true' ? css.genreBlack : css.genreLight}>{genre}</span>)}
            </div>
        </Link>

    </div>);
};

export {Movie};