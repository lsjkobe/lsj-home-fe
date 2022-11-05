import ApiAxios from "@/common/api-axios";
import {RBAC_CONST} from "@/rbac-const";
import MenuTree from "@/model/MenuTree";
import MenuVO from "@/model/MenuVO";

export default class MenuData {
    static urls = {
        getMenuTree: RBAC_CONST.RBAC_API_PREFIX + "/auth/get/menuTree/",
        queryMenuList: RBAC_CONST.RBAC_API_PREFIX + "/menu/query/list",
        delById: RBAC_CONST.RBAC_API_PREFIX + "/menu/del/id/",
        getTypes: RBAC_CONST.RBAC_API_PREFIX + "/menu/types",
        add: RBAC_CONST.RBAC_API_PREFIX + "/menu/add",
        edit: RBAC_CONST.RBAC_API_PREFIX + "/menu/edit",
    }

    static addMenu = (menuVo: MenuVO): Promise<string> => {
        return new Promise((resolve, reject) => {
            ApiAxios.post(this.urls.add, menuVo)
                .then((res: string) => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static editMenu = (menuVo: MenuVO): Promise<string> => {
        return new Promise((resolve, reject) => {
            ApiAxios.put(this.urls.edit, menuVo)
                .then((res: string) => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static getMenuTreeList = (appCode): Promise<Array<MenuTree>> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.getMenuTree + appCode)
                .then((menuData: Array<MenuTree>) => {
                    resolve(menuData);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static delById = (id): Promise<string> => {
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

    static queryMenuList = (query): Promise<Array<MenuVO>> => {
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

    /**
     * 获取菜单类型.
     * @returns {Promise<Array>}
     */
    static getMenuTypes = (): Promise<Array> => {
        return new Promise((resolve, reject) => {
            ApiAxios.get(this.urls.getTypes)
                .then((menuTypes: Array) => {
                    resolve(menuTypes);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}