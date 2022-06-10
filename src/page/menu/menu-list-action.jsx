import React, {useState} from "react";
import {Button, Popconfirm, Space} from "antd";
import PermButton from "@/component/button/perm-button";

const MenuListAction = (props) => {
    const {doAddCB, doEditCB, doDelCB} = props.btnCallBack;
    const {menuData} = props;

    return (
        <div>
            <Space size="middle">
                <PermButton perm={'rbac:menu:add'}>
                    <Button type="primary" size={"small"} onClick={() => {
                        doAddCB&&doAddCB(menuData.id)
                    }}>新增</Button>
                </PermButton>
                <PermButton perm={'rbac:menu:edit'}>
                    <Button type="primary" size={"small"} onClick={() => {
                        doEditCB&&doEditCB(menuData)
                    }}>编辑</Button>
                </PermButton>
                <PermButton perm={'rbac:menu:del'}>
                    <Popconfirm title={`确定删除【${menuData.menuName}】吗？`} onConfirm={() => {
                        doDelCB&&doDelCB(menuData.id)
                    }}>
                        <Button type="primary" size={"small"} danger>刪除</Button>
                    </Popconfirm>
                </PermButton>
            </Space>
        </div>
    );
}

export default MenuListAction;