import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService} from "../../services/authService";

export const registerUser = createAsyncThunk('authSlice/login', async ({data}, {dispatch}) => {
    try {
        const {name, email, password, phone} = data;
        const response = await authService.register(name, email, password, phone);
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('isAuth', 'true');

            dispatch(setIsAuth(true));
        }
    } catch (e) {
        if (e.response.status === 400) {
            dispatch(set400(true))
        }
        dispatch(setError(e.response.data.message));
    }
});

export const login = createAsyncThunk('authSlice/login', async ({email, password}, {dispatch}) => {
    try {
        const response = await authService.login(email, password);
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('isAuth', 'true');

            dispatch(setIsAuth(true));
        }
    } catch (e) {
        dispatch(setError(e.response.data.message));
    }
});

export const logoutUser = createAsyncThunk('authSlice/logoutUser', async ({accessToken}, {dispatch}) => {
    try {
        await authService.logout(accessToken);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');

        localStorage.setItem('isAuth', 'false');
        document.location.reload()

        dispatch(setIsAuth(false));
    } catch (e) {
        console.log(e);
    }
});

export const refresh = createAsyncThunk('authSlice/refresh', async ({refreshToken}, {dispatch}) => {
    try {
        const response = await authService.refresh(refreshToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('allowToVisit', 'true');
        dispatch(setAllowToVisit(true));


        dispatch(set401(false));
    } catch (e) {
        localStorage.setItem('allowToVisit', 'false');
        dispatch(setAllowToVisit(false));

    }
});


export const checkAuth = createAsyncThunk('authSlice/checkAuth', async ({accessToken, refreshToken}, {dispatch}) => {
    try {
        await authService.checkAuth(accessToken);
        dispatch(setAllowToVisit(true));
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(set401(true));
            localStorage.setItem('allowToVisit', 'false');
            dispatch(setAllowToVisit(false));

        }
    }
});


export const updateUser = createAsyncThunk('authSlice/checkAuth', async (data, {dispatch}) => {
    try {
        const response = await authService.updateUser(data);
        if (response.status === 200) {
            dispatch(setAllowToNavigate(true));
        }
    } catch (e) {
        console.log(e.response.message);
    }
});

export const changePassword = createAsyncThunk('authSlice/changePassword', async ({
                                                                                      oldPassword,
                                                                                      newPassword,
                                                                                      accessToken
                                                                                  }, {dispatch}) => {
    try {
        const response = await authService.changePassword({oldPassword, newPassword, accessToken})
        if (response.status === 200) {
            dispatch(set200(true))
            dispatch(set403(false));
        }

    } catch (e) {
        if (e.response.status === 401) {
            dispatch(set401(true));
            localStorage.setItem('allowToVisit', 'false');
            dispatch(setAllowToVisit(false));
        } else if (e.response.status === 403) {
            dispatch(set403(true))
        }
    }
});

export const forgotPasswordSet = createAsyncThunk('authSlice/forgotPassword', async ({
                                                                                         actionToken,
                                                                                         newPassword
                                                                                     }, {dispatch}) => {
    try {
        const response = await authService.forgotPasswordSet({actionToken, newPassword})
        console.log(response);

        if (response.status === 200) {
            localStorage.removeItem('email');
            localStorage.removeItem('actionToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('isAuth');
            dispatch(setAllowToVisit(false));
            dispatch(set200(true));
        }
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(set401(true));
            localStorage.setItem('allowToVisit', 'false');
            dispatch(setAllowToVisit(false));
        } else if (e.response.status === 403) {
            dispatch(set403(true))
        }
    }
});


const authSlice = createSlice({
    name: '/authSlice', initialState: {
        isAuth: false,
        error: null,
        allowToVisit: false,
        allowToNavigate: false,
        currentEmail: null,
        error400: false,
        error401: false,
        error403: false,
        status200: false,
    }, reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setAllowToVisit: (state, action) => {
            state.allowToVisit = action.payload;
        },
        setAllowToNavigate: (state, action) => {
            state.allowToNavigate = action.payload;
        },
        set400: (state, action) => {
            state.error400 = action.payload;
        },
        set401: (state, action) => {
            state.error401 = action.payload;
        },
        set403: (state, action) => {
            state.error403 = action.payload;
        },
        set200: (state, action) => {
            state.status200 = action.payload;
        },
    },

    extraReducers: {}
});


const authReducer = authSlice.reducer;

export default authReducer;

export const {
    setIsAuth,
    setError,
    setAllowToVisit,
    set401,
    set403,
    set200,
    setAllowToNavigate,
    set400
} = authSlice.actions;
