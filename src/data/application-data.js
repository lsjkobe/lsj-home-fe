import ApiAxios from "@/common/api-axios";
import {RBAC_CONST} from "@/rbac-const";
import AppVO from "@/model/AppVO";

export default class ApplicationData {
    static urls = {
        getBatchByCurUser: RBAC_CONST.RBAC_API_PREFIX + "/application/get/batch/curUser",
    }

    constructor() {
    }

    static getBatchByCurUser = () : Promise<Array<AppVO>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.getBatchByCurUser)
                .then((appList: Array<AppVO>) => {
                    resolve(appList);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}