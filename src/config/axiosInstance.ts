import axios from "axios";
import { baseUrl } from "./config";


// Main API instance
const axiosApi = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "credentials": "include",

    },
});

// Refresh-only instance (no interceptors)
const refreshAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});







export default axiosApi;
