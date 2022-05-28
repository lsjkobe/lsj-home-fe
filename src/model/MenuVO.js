export default class MenuVO {
    id: number;
    menuName: string;
    menuPath: string;
    perms: string;
    menuType: number;
    menuIcon: string;
    children: Array<MenuVO>;

    constructor() {
    }
}
