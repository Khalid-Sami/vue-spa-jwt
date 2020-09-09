// import config from 'config';
// import { authHeader } from '../helpers';

import {configureBackend} from '../helpers/config-backend'
import endpoints from "../axios/endpoints";

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    let link = endpoints.auth().login
    return configureBackend(link,{email: email,password: password})
        .then(response => {
            // login successful if there's a jwt token in the response
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', JSON.stringify(response.token));
            }
            return response.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };

    return fetch(`'http://localhost:8000/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
