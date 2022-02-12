import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import css from './movieDetails.module.css'
import {movieService} from "../../services/movieService";
import {Header, Loading, Recommendation} from "../../components";
import {getId} from "../../custom/getId";
import {detailsGenresFinder} from "../../custom/detailsGenresFinder";

const MovieDetails = () => {

    const [currentMovie, setCurrentMovie] = useState(null)
    const [currentMovieTrailers, setCurrentMovieTrailers] = useState(null)
    const [loading, setLoading] = useState(true);

    const {switcherStatus} = useSelector(state => state['moviesReducer']);

    const location = window.location.href;
    const id = getId(location);

    useEffect(() => {
        const getMovie = async () => {
            const response = await movieService.getMovieDetails(id);
            setCurrentMovie(response)
            setLoading(false);
        }
        getMovie()
    }, [])

    useEffect(() => {
        const getVideos = async () => {
            const response = await movieService.getVideos(id);
            setCurrentMovieTrailers(response)
            setLoading(false);

        }
        getVideos()
    }, [])

    const currentGenresArr = [];
    if (currentMovie) {
        const {genres} = currentMovie;
        detailsGenresFinder(genres, genres, currentGenresArr)
    }

    const themeStatus = localStorage.getItem('theme')

    if (loading === true) {
        return <Loading/>
    }

    return (currentMovie &&
        <div className={themeStatus === 'true' ? css.movieDetailsWrapBlack : css.movieDetailsWrapLight}>
            <Header form={false} genres={false}/>

            <div className={css.movieDetailsRow}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w400${currentMovie.poster_path}`}
                         className={css.movieDetailsImg} alt=""/>
                    <div>{currentMovie.toString()}</div>

                </div>
                <div>

                    <div><span className={css.movieDetailsTitle}>{currentMovie.title}</span></div>
                    <div className={css.about}>Про фільм</div>
                    <div className={css.details}>

                        <div className={css.leftRow}>
                            <div className={css.left}>Рік випуску</div>
                            <div className={css.left}>Країна</div>
                            <div className={css.left}>Жанр</div>
                            <div className={css.left}>Час</div>
                            <div className={css.left}>Для дорослих</div>
                            <div className={css.left}>Середні бал</div>
                            <div className={css.left}>Огляд</div>
                        </div>

                        <div className={css.rightRow}>
                            <div className={css.right}>{currentMovie.release_date}</div>
                            <div className={css.right}>{currentMovie.production_countries[0].name}</div>
                            <div className={css.right}>{currentGenresArr.join(', ')}</div>
                            <div className={css.right}> {currentMovie.runtime} хв</div>
                            <div className={css.right}>{currentMovie.adult ? 'Так' : 'Ні'}</div>
                            <div className={css.right}>{currentMovie.vote_average}</div>
                            <div className={css.right}>{currentMovie.overview}</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={css.video}>
                <iframe title={'video'}
                        allowFullScreen="allowfullscreen"
                        src={'https://www.youtube.com/embed/' + currentMovieTrailers?.results[0]?.key}/>

            </div>
            <Recommendation id={id}/>

        </div>);

};

export {MovieDetails};

