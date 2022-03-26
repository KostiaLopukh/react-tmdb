import axios from "axios";

const API_URL = 'http://localhost:5000'

export const backAxiosService = axios.create({
    baseURL: API_URL,
});

// backAxiosService.interceptors.request.use((config)=>{
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
// })

export default backAxiosService;

