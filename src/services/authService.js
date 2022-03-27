import backAxiosService from "./backAxiosService";

export const authService = {
    register: async (name, email, password, phone) => {
        return backAxiosService.post('/auth/register', {name, email, password, phone});
    },
    login: async (email, password) => {
        return backAxiosService.post('/auth/login', {email, password});
    },
    logout: async (accessToken) => {
        return backAxiosService.post('/auth/logout', {}, {
            headers: {
                'Authorization': accessToken
            }
        });
    },
    checkAuth: async (accessToken) => {
        return backAxiosService.post('/auth/checkAuth', {}, {
            headers: {
                'Authorization': accessToken
            }
        })
    },
    refresh: async (refreshToken) => {
        return backAxiosService.post('/auth/refresh', {}, {
            headers: {
                'Authorization': refreshToken,
            }
        })
    },
    getDetailsByEmail: async (email) => {
        return backAxiosService.post('/users', {email})
    },
    updateUser: async (data) => {
        return backAxiosService.post('/auth/update', {data})
    },
    changePassword: async (data) => {
        const {oldPassword, newPassword, accessToken} = data;
        return backAxiosService.post('/auth/password/change', {
            oldPassword,
            newPassword
        }, {headers: {'Authorization': accessToken}})
    },
    forgotPasswordSet: async (data) => {
        const {actionToken, newPassword} = data;
        return backAxiosService.post('/auth/password/forgot/set', {newPassword}, {headers: {'Authorization': actionToken}})
    },
    forgotPassword: async (email) => {
        return backAxiosService.post('/auth/password/forgot', {email})
    },
    sendMailActivate: async (email) => {
        return backAxiosService.post('/auth/sendMail', {email})
    },
}
