import axios from 'axios';
import userHandler from "../common/user-handler";
import ApiRes from "../model/ApiRes";
import UserInfo from "../model/UserInfo";
import ApiAxios from "@/common/api-axios";
import {RBAC_CONST} from "@/rbac-const";

export default class UserData {
    static urls = {
        getUserByToken: '',
        getPermList: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/permList",
    }

    constructor() {
    }

    static getUserData = (): Promise<UserInfo> => {
        return new Promise(resolve => {
            let userData = userHandler.getUserData();
            let token = userHandler.getToken();
            if (!userData && token) {
                axios.get(this.urls.getUserByToken)
                    .then((res: ApiRes) => {
                        if (res.success) {
                            userData = res.obj;
                        }
                    })
                    .catch(e => {
                        resolve(userData);
                    })
            }
            resolve(userData);
        })
    }

    static getPermList = (): Promise<Array<string>> => {
        return new Promise(resolve => {
            ApiAxios.get(this.urls.getPermList)
                .then((permList: Array<string>) => {
                    userHandler.savePermList(permList);
                    resolve(permList);
                })
                .catch(e => {
                    resolve([]);
                })
        })
    }
}