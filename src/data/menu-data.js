import ApiAxios from "@/common/api-axios";
import {RBAC_CONST} from "@/rbac-const";
import MenuTree from "@/model/MenuTree";
import MenuVO from "@/model/MenuVO";

export default class MenuData {
    static urls = {
        getMenuTree: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/menuTree",
        queryMenuList: RBAC_CONST.RBAC_API_PREFIX + "/menu/query/list",
        delById: RBAC_CONST.RBAC_API_PREFIX + "/menu/del/id/",
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

    static delById = (id) : Promise<string> => {
        return new Promise((resolve, reject) => {
            ApiAxios.post(this.urls.delById + id)
                .then((res: string) => {
                    resolve(res);
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