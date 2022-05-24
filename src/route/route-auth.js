import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react'
import {getRouteByPath} from "./root-route";
import UserHandler from "../common/user-handler";

const RouteAuthEach = () => {
    // const navigate = useNavigate()
    const location = useLocation()
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        let curRoute = getRouteByPath(location.pathname)
        let blLogin = UserHandler.getToken();
        if (curRoute && curRoute.auth && (!blLogin || blLogin === 'false')) {
            setAuth(false)
            // navigate('/login', {replace: true})
            doLogin();
        } else {
            setAuth(true)
        }
    }, [])
    return auth ? <Outlet/> : null
}

const doLogin = () => {
    UserHandler.delToken();
    const urlParams = new URL(window.location.href);
    const origin = urlParams?.origin;
    window.location.href =
        `${process.env.REACT_APP_SERVER_URL}?${process.env.REACT_APP_REDIRECT_URL_PARAM}=${origin + process.env.REACT_APP_LOGIN_PATH}`;
}

export {RouteAuthEach, doLogin}