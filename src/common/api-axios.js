import axios, {AxiosRequestConfig} from "axios";
import ApiRes from "../model/ApiRes";
import {AxiosResponse} from "axios";

export default class ApiAxios {
    static get(url: string, config: AxiosRequestConfig) {
        const finalUrl = process.env.REACT_APP_SERVER_URL + url;
        return new Promise((resolve, reject) => {
            axios.get(finalUrl, config)
                .then((res: AxiosResponse<ApiRes>) => {
                    if (res.data && res.data.success) {
                        resolve(res.data.obj);
                    } else {
                        reject({
                            response: res.data.message
                        });
                    }
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}