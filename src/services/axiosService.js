import axios from "axios";
import baseURL from "../constants/urls";

export const axiosService = axios.create({
    baseURL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGU2YjcyMjcxZmQzYWQ3ZjRlMjdkYjA2MDkzOTViMCIsInN1YiI6Ij' +
            'YxZmVlMGQ1MWYzZTYwMDA0M2M1NDlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xzq8v6kTFqmcVNVhPpTCxwS5g' +
            'Nt7MTzWKux5SfudY4E'
    }

})

