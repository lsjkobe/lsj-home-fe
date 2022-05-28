import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Avatar, Badge, Layout, Menu} from 'antd';
import React, {Component} from 'react';

import './main.css'
import userData from "../../data/user-data";

const {Header, Sider, Content} = Layout;

class Main extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            avatarUrl: '\n' +
                '',
            menuData: []
        }
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
        this.setState({
            menuData: [
                {
                    key: '1',
                    icon: <UserOutlined/>,
                    label: 'nav 1',
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined/>,
                    label: 'nav 2',
                },
                {
                    key: '3',
                    icon: <UploadOutlined/>,
                    label: 'nav 3',
                },
            ]
        })
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