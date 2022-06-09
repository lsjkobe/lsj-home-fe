import MenuVO from "@/model/MenuVO";

const toTreeSelData = (menu: MenuVO) => {
    let item = {
        title: menu.menuName,
        value: menu.id,
        children: []
    }
    if (menu.children) {
        for (let child of menu.children) {
            let childItem = toTreeSelData(child);
            item.children.push(childItem);
        }
    }
    return item;
}

export const transToTreeSelData = (menuList: Array<MenuVO>) => {
    let items = [];
    for (let menu of menuList) {
        let item = toTreeSelData(menu);
        items.push(item);
    }
    return items;
}