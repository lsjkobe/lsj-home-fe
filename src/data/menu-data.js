import ApiAxios from "../common/api-axios";
import {RBAC_CONST} from "../rbac-const";
import MenuTree from "../model/MenuTree";

export default class MenuData {
    static urls = {
        getMenuTree: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/menuTree",
    }

    constructor() {
    }

    static getMenuTreeList = (): Promise<Array<MenuTree>> => {
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