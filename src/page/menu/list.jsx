import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import ListUtil from "@/util/list-util";
import {menuListColumns} from "@/page/menu/menu-list-column";
import MenuData from "@/data/menu-data";
import MenuListSearch from "@/page/menu/menu-list-search";

const MenuList = () => {

    const [scrollY, setScrollY] = useState('70vh');
    const [menuDataList, setMenuDataList] = useState([]);

    useEffect(() => {
        function initData() {
            MenuData.queryMenuList({})
                .then(menuList => {
                    doSetMenuDataList(menuList);
                })
        }

        const init = () => {
            setScrollY(ListUtil.calListHeight());
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

    return (
        <div>
            <MenuListSearch doSearch={doSearch}></MenuListSearch>
            <Table
                rowSelection={{type: 'checkbox'}}
                columns={menuListColumns}
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