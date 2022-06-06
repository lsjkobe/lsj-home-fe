import {Table} from "antd";
import React, {useEffect, useImperativeHandle, useState} from "react";
import MenuListAction from "@/page/menu/menu-list-action";
import MenuData from "@/data/menu-data";
import ListUtil from "@/util/list-util";

const MenuListTable = (props) => {
    const {curRef} = props;
    const [scrollY, setScrollY] = useState('70vh');
    const [columns, setColumns] = useState([]);
    const [menuDataList, setMenuDataList] = useState([]);

    useImperativeHandle(curRef, () => (
        {
            doQueryRef: (query) => {
                _doQuery(query);
            }
        }
    ))

    useEffect(() => {
        const init = () => {
            setScrollY(ListUtil.calListHeight());
            initRender();
            initData();
        }
        init();
    }, []);

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
                    render: (record) => {
                        return <MenuListAction {...props} menuData={record}></MenuListAction>
                    },
                },
            ]);
        }

        initColumns();
    }

    function initData() {
        _doQuery();
    }


    const _doQuery = (query = {}) => {
        MenuData.queryMenuList(query)
            .then(menuList => {
                doSetMenuDataList(menuList);
            })
    }

    const doSetMenuDataList = (menuList) => {
        for (let menuVo of menuList) {
            menuVo.key = menuVo.id;
        }
        setMenuDataList(menuList);
    }

    return (
        <Table
            rowSelection={{type: 'checkbox'}}
            columns={columns}
            dataSource={menuDataList}
            scroll={{
                // x: 'max-content',
                y: scrollY,
            }}
        />
    );
}

export default MenuListTable;