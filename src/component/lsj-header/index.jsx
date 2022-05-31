import './lsj-header.css';
import React, {useState, useEffect} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Avatar, Badge} from "antd";
import {Header} from "antd/es/layout/layout";
import userData from "../../data/user-data";

const LsjHeader = (props) => {

    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        userInit();
    }

    const userInit = () => {
        userData.getUserData()
            .then((userData) => {
                if (userData && userData.avatarUrl) {
                    setAvatarUrl(userData.avatarUrl);
                }
            })
    }

    const onCollapsedChange = () => {
        props.onCollapsedChange(!props.collapsed);
    }
    return (
        <Header
            id="components-layout-demo-custom-trigger"
            className="site-layout-background"
            style={{
                padding: 0,
                textAlign: "right",
            }}
        >
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: {float: "left"},
                onClick: onCollapsedChange,
            })}
            <span style={{marginRight: '20px',}} className="avatar-item">
                        <Badge count={0} size={'small'}>
                            <Avatar src={avatarUrl}/>
                        </Badge>
                    </span>
        </Header>
    );
}

export default LsjHeader;