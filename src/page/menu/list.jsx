import React, {useEffect, useState} from 'react';
import {Table, message} from 'antd';
import ListUtil from "@/util/list-util";
import MenuData from "@/data/menu-data";
import MenuListHeader from "@/page/menu/menu-list-header";
import MenuListAction from "@/page/menu/menu-list-action";

const MenuList = () => {

    const [scrollY, setScrollY] = useState('70vh');
    const [menuDataList, setMenuDataList] = useState([]);
    const [columns, setColumns] = useState([]);

    const initRender = () => {
        const initColumns = () => {
            setColumns([
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
                        return <MenuListAction btnCallBack={{
                            doAddCB: doAdd
                        }}></MenuListAction>
                    },
                },
            ]);
        }

        initColumns();
    }

    useEffect(() => {
        function initData() {
            MenuData.queryMenuList({})
                .then(menuList => {
                    doSetMenuDataList(menuList);
                })
        }

        const init = () => {
            setScrollY(ListUtil.calListHeight());
            initRender();
            initData();
        }
        init();
    }, []);

    const doSetMenuDataList = (menuList) => {
        for (let menuVo of menuList) {
            menuVo.key = menuVo.id;
        }
        setMenuDataList(menuList);
    }

    const doSearch = (menuList) => {
        doSetMenuDataList(menuList);
    }

    const doAdd = () => {
        message.info('This is a normal message').then();
    }

    return (
        <div>
            <MenuListHeader doSearchCallBack={doSearch} btnCallBack={{
                doSearchCB: doSearch, doAddCB: doAdd
            }}></MenuListHeader>
            <Table
                rowSelection={{type: 'checkbox'}}
                columns={columns}
                dataSource={menuDataList}
                scroll={{
                    // x: 'max-content',
                    y: scrollY,
                }}
            />
        </div>
    );
};

export default MenuList;