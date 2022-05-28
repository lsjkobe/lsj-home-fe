import {
    AppstoreOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, SettingOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Avatar, Badge, Layout, Menu} from 'antd';
import React, {Component} from 'react';

import './main.css'
import userData from "../../data/user-data";
import MenuData from "../../data/menu-data";
import type {MenuProps} from 'antd';
import MenuVO from "../../model/MenuVO";

const {Header, Sider, Content} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

class Main extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            avatarUrl: '',
            menuData: []
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

    init() {
        this.userInit();
        this.menuInit();
    }

    userInit() {
        userData.getUserData()
            .then((userData) => {
                if (userData && userData.avatarUrl) {
                    this.setState({
                        avatarUrl: userData.avatarUrl
                    })
                }
            })
    }

    menuInit() {
        MenuData.getMenuData()
            .then(menuData => {
                let menuTreeList = this.menuDataToShow(menuData);
                this.setState({
                    menuData: menuTreeList
                });
            })
            .catch(e => {
                console.log(e);
            })
    }

    menuDataToShow(menuData:Array<MenuVO>) {
        let items: MenuProps['items'] = [];
        for (let menuDataItem of menuData) {
            let item = this.menuDataSingleToShow(menuDataItem);
            items.push(item);
        }
        return items;
    }

    menuDataSingleToShow(menuVo: MenuVO) {
        let item = this.getItem(menuVo.menuName, menuVo.id, <MailOutlined />);
        if (menuVo.children && menuVo.children.length > 0) {
            item.children = [];
            for (let child of menuVo.children) {
                let childItem = this.menuDataSingleToShow(child);
                item.children.push(childItem);
            }
        }
        return item;
    }

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={this.state.menuData}
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
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;