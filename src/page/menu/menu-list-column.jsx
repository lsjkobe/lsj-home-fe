import React from "react";
import MenuListAction from "@/page/menu/menu-list-action";

const menuListColumns = [
    {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
    },
    {
        title: '菜单路径',
        dataIndex: 'menuPath',
        key: 'menuPath',
        width: '15%',
    },
    {
        title: '授权标识',
        dataIndex: 'perms',
        key: 'perms',
        width: '15%',
    },
    {
        title: '排序',
        dataIndex: 'orderNum',
        key: 'orderNum',
        width: '15%',
    },
    {
        title: '菜单类型',
        dataIndex: 'menuTypeValue',
        key: 'menuTypeValue',
        width: '15%',
    },
    {
        title: 'Action',
        key: 'operation',
        width: '20%',
        render: () => {
            return <MenuListAction></MenuListAction>
        },
    },
];

export {menuListColumns}