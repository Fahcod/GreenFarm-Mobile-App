import axios from "axios";

const Backend_URL = 'http://localhost:7500';

export const axiosInstance = axios.create({
    baseURL:Backend_URL,
    withCredentials:true,
    headers:{
        Authorization:`Bearer 098765`
    }
});