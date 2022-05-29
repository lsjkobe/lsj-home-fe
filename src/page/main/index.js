import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import './main.css'
import {Avatar, Badge, Layout, Menu} from 'antd';
import React, {Component} from 'react';
import userData from "../../data/user-data";
import MenuData from "../../data/menu-data";
import type {MenuProps} from 'antd';
import MenuTree from "../../model/MenuTree";
import Icon from "../../common/icon";
import ContentMenu from "../content-menu";

const {Header, Sider, Content} = Layout;
type MenuItem = Required<MenuProps>['items'][number];

class Main extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            avatarUrl: '',
            menuTreeShowList: [],
            menuSel: [],
        }
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

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.userInit();
        this.menuInit();
    }

    userInit = () => {
        userData.getUserData()
            .then((userData) => {
                if (userData && userData.avatarUrl) {
                    this.setState({
                        avatarUrl: userData.avatarUrl
                    })
                }
            })
    }

    menuInit = () => {
        MenuData.getMenuTreeList()
            .then(menuTreeList => {
                let menuTreeShowList = this.menuTreeToShow(menuTreeList);
                this.setState({
                    menuTreeShowList: menuTreeShowList,
                    menuSel: [`${menuTreeList[0].id}`]
                });

            })
            .catch(e => {
                console.log(e);
            })
    }

    menuTreeToShow = (menuTreeList: Array<MenuTree>) => {
        let items: MenuProps['items'] = [];
        for (let menuTree of menuTreeList) {
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
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={this.state.menuSel}
                        defaultSelectedKeys={this.state.menuSel}
                        items={this.state.menuTreeShowList}
                        onClick={this.onMenuClick}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        id="components-layout-demo-custom-trigger"
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            textAlign: "right",
                        }}
                    >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: {float: "left"},
                            onClick: () => this.setState({
                                collapsed: !this.state.collapsed
                            }),
                        })}
                        <span style={{marginRight: '20px',}} className="avatar-item">
                        <Badge count={0} size={'small'}>
                            <Avatar src={this.state.avatarUrl}/>
                        </Badge>
                    </span>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '10px 10px',
                            // padding: 10,
                            minHeight: 680,
                        }}
                    >
                        <ContentMenu></ContentMenu>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;