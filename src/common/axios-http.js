import axios from 'axios';
import {doLogin} from "../route/route-auth";
import UserHandler from "./user-handler";

const init = function () {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    axios.interceptors.request.use(
        (config) => {
            let token = UserHandler.getToken();
            if (token) {
                if (!config.headers.common) {
                    config.headers.common = {}
                }
                config.headers.common[process.env.REACT_APP_PARAM_TOKEN] = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    axios.interceptors.response.use(
        resp => {
            const data = resp.data;
            if (data[process.env.REACT_APP_AUTH_STATUS] === 401) {
                doLogin();
            } else {
                return resp;
            }
        },
        error => {
            return Promise.reject(error);
        }
    );
}
export default {init}