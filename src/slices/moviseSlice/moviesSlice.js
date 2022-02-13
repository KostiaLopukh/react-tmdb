import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {movieService} from "../../services/movieService";

export const getMoviesGenres = createAsyncThunk('moviesSlice/getMoviesGenres', async (_, {dispatch}) => {
    try {
        let genres = await movieService.getGenres();
        genres.map(genre => genre.status = false);
        dispatch(setGenres(genres))

    } catch (e) {
        console.error(e);
    }
});


export const getMovies = createAsyncThunk('getByGenre/moviesSlice', async ({page}, {dispatch, getState}) => {
    try {
        dispatch(setCurrentPage({page: page}))

        const state = getState();
        const response = await movieService.getPageByGenre(state.moviesReducer.chosenGenres, state.moviesReducer.currentPage);

        if (response.results.length) {
            dispatch(setEmptyResponse({response: false}));
        } else {
            dispatch(setEmptyResponse({response: true}));
        }
        dispatch(setMoviesPerPage(response));
        dispatch(setMoviesWithGenresPerPage(response));
        dispatch(setTotalPages(response.total_pages));
        return response;

    } catch (e) {
        console.error(e);
    }

});

export const getByString = createAsyncThunk('getByString/movieSlice', async ({
                                                                                 string, page: currentPage
                                                                             }, {dispatch}) => {
    try {
        dispatch(setString({string}))
        dispatch(setCurrentPage({page: currentPage}))

        const response = await movieService.getByString(string, currentPage);

        if (response.results.length) {
            dispatch(setEmptyResponse({response: false}));
        } else {
            dispatch(setEmptyResponse({response: true}));
        }

        return response;

    } catch (e) {
        console.error(e);
    }

})


const moviesSlice = createSlice({
    name: '/movieSlice', initialState: {
        moviesPerPage: [],
        currentPage: 1,
        totalPages: null,
        genres: [],
        genresOfCurrentMovie: [],
        status: null,
        error: null,
        switcherStatus: true,
        chosenGenres: [],
        moviesWithGenresPerPage: [],
        string: '',
        emptyResponse: false,


    }, reducers: {
        setMoviesPerPage: (state, action) => {
            state.moviesPerPage = action.payload.results
            state.currentPage = action.payload.page;
        }, setGenres: (state, action) => {
            state.genres = action.payload;
        }, changeSwitcherStatus: (state) => {
            state.switcherStatus = !state.switcherStatus;
            localStorage.setItem('theme', !state.switcherStatus);

        }, changeStatus: (state, action) => {
            const changedGenre = state.genres.find(genre => genre.id === action.payload.id);
            changedGenre.status = !changedGenre.status;

            if (changedGenre.status) {
                state.chosenGenres.push(changedGenre.id);
            } else {
                state.chosenGenres.splice(changedGenre, 1);
            }
        }, setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        }, setMoviesWithGenresPerPage: (state, action) => {
            state.moviesWithGenresPerPage = action.payload.results;
        }, setCurrentPage: (state, action) => {
            state.currentPage = action.payload.page
        }, setString: (state, action) => {
            state.string = action.payload.string;
        }, setEmptyResponse: (state, action) => {
            state.emptyResponse = action.payload.response;
        },

    },

    extraReducers: {
        [getMovies.pending]: (state) => {
            state.status = 'pending';
            state.error = null
        }, [getMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.moviesPerPage = action.payload.results
        },


        [getByString.pending]: (state) => {
            state.status = 'pending';
            state.error = null
        }, [getByString.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.moviesPerPage = action.payload.results
            state.totalPages = action.payload.total_pages
        },
    }
});


const moviesReducer = moviesSlice.reducer;

export default moviesReducer;

export const {
    setMoviesPerPage,
    setGenres,
    changeSwitcherStatus,
    changeStatus,
    setTotalPages,
    setMoviesWithGenresPerPage,
    setCurrentPage,
    setString,
    setEmptyResponse,
} = moviesSlice.actions;
