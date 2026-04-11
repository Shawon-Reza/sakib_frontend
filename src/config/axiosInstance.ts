import axios from "axios";
import { baseUrl } from "./config";


// Main API instance
const axiosApi = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",

    },
});

// Refresh-only instance (no interceptors)
const refreshAxios = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});







export default axiosApi;
