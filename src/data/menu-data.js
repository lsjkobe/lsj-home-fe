import ApiAxios from "../common/api-axios";
import {RBAC_CONST} from "../rbac-const";
import MenuVO from "../model/MenuVO";

export default class MenuData {
    static urls = {
        getMenuTree: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/menuTree",
    }

    constructor() {
    }

    static getMenuData = (): Promise<Array<MenuVO>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.getMenuTree)
                .then((menuData: Array<MenuData>) => {
                    resolve(menuData);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}