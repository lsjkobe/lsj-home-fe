import React, {useState, useEffect} from "react";
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import MenuData from "@/data/menu-data";
import MenuTree from "@/model/MenuTree";
import type {MenuProps} from "antd";
import Icon from "@/common/icon";
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

const LsjNavigate = (props) => {
    const {onMenuSel} = props;
    const [collapsed, setCollapsed] = useState(props.collapsed);
    const [menuSelKey, setMenuSelKey] = useState([]);
    const [menuTreeList, setMenuTreeList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setCollapsed(props.collapsed);
    }, [props.collapsed])

    useEffect(() => {
        init();
    }, [])


    const init = () => {
        menuInit();
    }

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const menuInit = () => {
        MenuData.getMenuTreeList()
            .then(menuTreeListResp => {
                let menuTreeList = menuTreeToShow(menuTreeListResp);
                setMenuTreeList(menuTreeList);
                setMenuSelKey(menuTreeListResp[0].menuPath)

            })
            .catch(e => {
                console.log(e);
            })
    }

    const menuTreeToShow = (menuTreeListResp: Array<MenuTree>) => {
        let items: MenuProps['items'] = [];
        for (let menuTree of menuTreeListResp) {
            let item = menuTreeSingleToShow(menuTree);
            items.push(item);
        }
        return items;
    }

    const menuTreeSingleToShow = (menuTree: MenuTree) => {
        let item = getItem(menuTree.menuName, menuTree.menuPath, <Icon icon={menuTree.menuIcon}/>);
        if (menuTree.children && menuTree.children.length > 0) {
            item.children = [];
            for (let child of menuTree.children) {
                let childItem = menuTreeSingleToShow(child);
                item.children.push(childItem);
            }
        }
        return item;
    }

    const onMenuClick = (item) => {
        onMenuSel(item);
        setMenuSelKey([item.key]);
        navigate(item.key);
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={menuSelKey}
                items={menuTreeList}
                onClick={onMenuClick}
            />
        </Sider>
    );
}



export default LsjNavigate;