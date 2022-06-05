import ApiAxios from "@/common/api-axios";
import {RBAC_CONST} from "@/rbac-const";
import MenuTree from "@/model/MenuTree";
import MenuVO from "@/model/MenuVO";

export default class MenuData {
    static urls = {
        getMenuTree: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/menuTree",
        queryMenuList: RBAC_CONST.RBAC_API_PREFIX + "/menu/query/list",
    }

    constructor() {
    }

    static getMenuTreeList = (): Promise<Array<MenuTree>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.getMenuTree)
                .then((menuData: Array<MenuTree>) => {
                    resolve(menuData);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static getMenuList = () : Promise<Array<MenuVO>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.queryMenuList)
                .then((menuList: Array<MenuVO>) => {
                    resolve(menuList);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static queryMenuList = (query) : Promise<Array<MenuVO>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.post(this.urls.queryMenuList, query)
                .then((menuList: Array<MenuVO>) => {
                    resolve(menuList);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}