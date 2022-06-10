import React, {useEffect, useRef, useState} from 'react';
import {message} from 'antd';
import MenuListHeader from "@/page/menu/menu-list-header";
import MenuListTable from "@/page/menu/menu-list-table";
import MenuData from "@/data/menu-data";
import ModalAddMenu from "@/page/menu/modal/add-menu/modal-add-menu";

const MenuList = () => {
    const [addMenuVisible, setAddMenuVisible] = useState(false);
    const [menuSel, setMenuSel] = useState();
    //是否是新增
    const [isAdd, setIsAdd] = useState(true)
    const menuListHeaderRef = useRef();
    const menuListTableRef = useRef();
    const modalAddMenuRef = useRef();


    useEffect(() => {
        const init = () => {
        }
        init();
    }, []);

    const doSearch = (query) => {
        setMenuSel({...menuSel, appId: query.appId});
        menuListTableRef.current?.doQueryRef(query);
    }

    const doAdd = (menuId) => {
        setIsAdd(true);
        setAddMenuVisible(true);
        setMenuSel({
            appId: menuSel?.appId,
            parentId: menuId
        });
    }

    const doEdit = (menu) => {
        setIsAdd(false);
        setAddMenuVisible(true);
        setMenuSel(menu);
    }

    const doDelOne = (menuId) => {
        MenuData.delById(menuId)
            .then(res => {
                message.info(res).then(() => {
                });
                menuListHeaderRef.current?.doSearchRef();
            });
    }

    const doSubmitCB = (newMenu) => {
        setAddMenuVisible(false);
        menuListHeaderRef.current?.doSearchRef();
    }

    const getHandles = () => {
        return {
            handleOk: () => {
                modalAddMenuRef.current?.submitRef();
            },
            handleCancel: () => {
                setAddMenuVisible(false);
            }
        }
    }

    return (
        <>
            <div>
                <MenuListHeader curRef={menuListHeaderRef} btnCallBack={{
                    doSearchCB: doSearch, doAddCB: doAdd
                }}></MenuListHeader>
                <MenuListTable curRef={menuListTableRef} btnCallBack={{
                    doAddCB: doAdd, doEditCB: doEdit, doDelCB: doDelOne
                }}> </MenuListTable>
            </div>
            <ModalAddMenu curRef={modalAddMenuRef} visible={addMenuVisible} menu={menuSel} isAdd={isAdd}
                          handles={getHandles()} callBack={{doSubmitCB: doSubmitCB}}></ModalAddMenu>
        </>
    );
};

export default MenuList;