import React, {useEffect, useRef, useState} from 'react';
import {message} from 'antd';
import MenuListHeader from "@/page/menu/menu-list-header";
import MenuListTable from "@/page/menu/menu-list-table";
import MenuData from "@/data/menu-data";
import ModalAddMenu from "@/page/menu/modal/add-menu/modal-add-menu";

const MenuList = () => {
    const [addMenuVisible, setAddMenuVisible] = useState(false);
    const [menuSel, setMenuSel] = useState();
    const menuListHeaderRef = useRef();
    const menuListTableRef = useRef();
    const modalAddMenuRef = useRef();


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
        setAddMenuVisible(true);
        setMenuSel(menuId);
    }

    const doDelOne = (menuId) => {
        MenuData.delById(menuId)
            .then(res => {
                message.info(res).then(() => {
                });
                menuListHeaderRef.current?.doSearchRef();
            });
    }

    const getHandles = () => {
        return {
            handleOk: () => {
                modalAddMenuRef.current?.submitRef().then(() => {
                    setAddMenuVisible(false);
                });
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
                    doAddCB: doAdd, doDelCB: doDelOne
                }}> </MenuListTable>
            </div>
            <ModalAddMenu curRef={modalAddMenuRef} visible={addMenuVisible} parentMenuId={menuSel}
                          handles={getHandles()}></ModalAddMenu>
        </>
    );
};

export default MenuList;