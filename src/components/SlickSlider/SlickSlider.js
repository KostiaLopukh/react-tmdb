import React, {Component} from "react";
import Slider from "react-slick";

import css from './SlickSlider.module.css';
import {MovieRecommendation} from "../Recommendation/MovieRecommendation";


export default class SimpleSlider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const settings = {
            dots: true, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 4
        };

        return (<div>
            <div className={css.container}>
                <h3>You can also be interested:</h3>
                <Slider {...settings}>

                    {this.props.movies.map((movie, index) => <MovieRecommendation key={index} movie={movie}/>)}

                </Slider>
            </div>
        </div>);
    }
}