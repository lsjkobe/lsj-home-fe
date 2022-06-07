import React, {useEffect, useRef} from 'react';
import {message} from 'antd';
import MenuListHeader from "@/page/menu/menu-list-header";
import MenuListTable from "@/page/menu/menu-list-table";
import MenuData from "@/data/menu-data";
import ModalAddMenu from "@/page/menu/modal/add-menu/modal-add-menu";

const MenuList = () => {

    const menuListHeaderRef = useRef();
    const menuListTableRef = useRef();


    useEffect(() => {

        const init = () => {
        }
        init();
    }, []);

    const doSearch = (query) => {
        if (menuListTableRef.current) {
            menuListTableRef.current?.doQueryRef(query);
        }
    }

    const doAdd = (menuId) => {
        message.info('This is a normal message').then();
    }

    const doDelOne = (menuId) => {
        MenuData.delById(menuId)
            .then(res => {
                message.info(res).then(() => {
                });
                menuListHeaderRef.current.doSearchRef();
            });
    }

    return (
        <>
            <div>
                <MenuListHeader curRef={menuListHeaderRef} btnCallBack={{
                    doSearchCB: doSearch, doAddCB: doAdd
                }}></MenuListHeader>
                <MenuListTable curRef={menuListTableRef} btnCallBack={{
                    doAddCB: doAdd, doDelCB: doDelOne
                }}> </MenuListTable>
            </div>
            <ModalAddMenu></ModalAddMenu>
        </>
    );
};

export default MenuList;