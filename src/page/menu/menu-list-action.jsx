import React from "react";
import {Button, Space} from "antd";
import PermButton from "@/component/button/perm-button";

const MenuListAction = (props) => {
    const {doAddCB, doDelCB} = props.btnCallBack;
    const {menuData} = props;
    return (
        <Space size="middle">
            <PermButton perm={'rbac:menu:add'}>
                <Button type="primary" size={"small"} onClick={()=>{doAddCB(menuData.id)}}>新增</Button>
            </PermButton>
            <PermButton perm={'rbac:menu:edit'}>
                <Button type="primary" size={"small"}>编辑</Button>
            </PermButton>
            <PermButton perm={'rbac:menu:del'}>
                <Button type="primary" size={"small"} danger onClick={()=>{doDelCB(menuData.id)}}>刪除</Button>
            </PermButton>
        </Space>
    );
}

export default MenuListAction;