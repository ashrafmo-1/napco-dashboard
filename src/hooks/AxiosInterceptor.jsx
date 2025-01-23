import axios from "axios";
import { useEffect } from "react";
import {TOKEN} from "../helpers/index.js";

// eslint-disable-next-line react/prop-types
const AxiosInterceptor = ({ children }) => {

    axios.defaults.baseURL = "https://napco-api.testingelmo.com/api/v1/";
    axios.defaults.headers.post.Authorization = `Bearer ${TOKEN}`;
    axios.defaults.headers.delete.Authorization = `Bearer ${TOKEN}`;
    axios.defaults.headers.get.Authorization = `Bearer ${TOKEN}`;
    axios.defaults.headers.put.Authorization = `Bearer ${TOKEN}`;

    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (TOKEN) {
                    config.headers.Authorization = `Bearer ${TOKEN}`;
                }
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [TOKEN]);

    return <>{children}</>;
};

export default AxiosInterceptor;