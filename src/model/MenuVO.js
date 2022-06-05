export default class MenuTree {
    key: string;
    id: number;
    menuName: string;
    menuPath: string;
    perms: string;
    menuType: number;
    menuIcon: string;
    children: Array<MenuTree>;

    constructor() {
    }
}
