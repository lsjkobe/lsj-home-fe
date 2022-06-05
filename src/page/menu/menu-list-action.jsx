import React, {useEffect, useState} from "react";
import {Button, Space} from "antd";
import PermButton from "@/component/button/perm-button";
import UserData from "@/data/user-data";

const MenuListAction = () => {
    const [permList, setPermList] = useState([]);

    useEffect(() => {
        UserData.getPermList()
            .then(permList => {
                setPermList(permList);
            })
    }, []);

    return (
        <Space size="middle">
            <PermButton perm={'rbac:menu:edit'} permList={permList}>
                <Button type="primary" size={"small"}>编辑</Button>
            </PermButton>
            <PermButton perm={'rbac:menu:del'} permList={permList}>
                <Button type="primary" size={"small"} danger>刪除</Button>
            </PermButton>
        </Space>
    );
}

export default MenuListAction;