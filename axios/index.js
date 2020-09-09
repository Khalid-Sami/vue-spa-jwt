import axios from 'axios'
import Vue from 'vue'
import {router} from "../helpers";
import {authHeader} from '../helpers/auth-header'
import endpoints from "./endpoints";

const axiosInstance = axios.create({
    baseURL: 'api/',
    // timeout: 1000,
});

axiosInstance.interceptors.request.use(function (config) {
        if (!authHeader().length)
            return config;
        axios.defaults.headers.common['Authorization'] = authHeader().Authorization;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    },
    function (error) {
        return Promise.reject(error);
    });

axiosInstance.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201)
            return Promise.resolve(response)
        else
            return Promise.reject(response)
    },

    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    // alert(error.response.data.msg)
                    break;

                case 401:
                    if(error.response.message === 'Expired token')
                        console.log('Expired token')
                    else
                        console.log("Unauthorized");

                    break;

                case 403:
                    router.replace({
                        path: "/login",
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                case 404:
                    console.log('page not exist');
                    break;

                case 502:
                    setTimeout(() => {
                        router.replace({
                            path: "/login",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
            }
            return Promise.reject(error.response);
        }
    }
)
// Vue.prototype.$axios = axiosInstance

// export const endPoints = endpoints
export default axiosInstance
