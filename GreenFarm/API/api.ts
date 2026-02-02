import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Backend_URL = 'http://192.168.1.198:7500';

export const axiosInstance = axios.create({
    baseURL:Backend_URL,
});

// add the interceptors to attach the token automatically before sending
// the request
axiosInstance.interceptors.request.use(
    async (config)=>{
      // fetch the user   
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token found!")
      }
      // return the config  
      return config
    },
    (error)=>Promise.reject(error)
);