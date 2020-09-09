import HomePage from "../components/jwt-auth/HomePage";
import LoginPage from "../components/jwt-auth/LoginPage";


export default [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
]
