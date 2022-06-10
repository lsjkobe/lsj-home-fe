export default class MenuTree {
    key: string;
    id: number;
    parentId: number;
    menuName: string;
    menuPath: string;
    perms: string;
    menuType: number;
    orderNum: number;
    menuTypeValue: string;
    menuIcon: string;
    children: Array<MenuTree>;

    constructor() {
    }
}
