import React, {Component} from "react";
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import MenuData from "../../data/menu-data";
import MenuTree from "../../model/MenuTree";
import type {MenuProps} from "antd";
import Icon from "../../common/icon";

type MenuItem = Required<MenuProps>['items'][number];

export default class LsjNavigate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
            menuSel: [],
            menuTreeList: []
        }
    }

    componentDidMount() {
        this.init();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            collapsed: nextProps.collapsed,
        })
    }


    init = () => {
        this.menuInit();
    }

    getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    menuInit = () => {
        MenuData.getMenuTreeList()
            .then(menuTreeListResp => {
                let menuTreeList = this.menuTreeToShow(menuTreeListResp);
                this.setState({
                    menuTreeList: menuTreeList,
                    menuSel: [`${menuTreeListResp[0].id}`]
                });

            })
            .catch(e => {
                console.log(e);
            })
    }

    menuTreeToShow = (menuTreeListResp: Array<MenuTree>) => {
        let items: MenuProps['items'] = [];
        for (let menuTree of menuTreeListResp) {
            let item = this.menuTreeSingleToShow(menuTree);
            items.push(item);
        }
        return items;
    }

    menuTreeSingleToShow = (menuTree: MenuTree) => {
        let item = this.getItem(menuTree.menuName, menuTree.id, <Icon icon={menuTree.menuIcon}/>);
        if (menuTree.children && menuTree.children.length > 0) {
            item.children = [];
            for (let child of menuTree.children) {
                let childItem = this.menuTreeSingleToShow(child);
                item.children.push(childItem);
            }
        }
        return item;
    }

    onMenuClick = (item) => {
        this.setState({
            menuSel: [item.key]
        });
    }

    render() {
        return <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={this.state.menuSel}
                items={this.state.menuTreeList}
                onClick={this.onMenuClick}
            />
        </Sider>;
    }
}