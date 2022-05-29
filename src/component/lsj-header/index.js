import React, {Component} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Avatar, Badge} from "antd";
import {Header} from "antd/es/layout/layout";

export default class LsjHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
        }
    }

    onCollapsedChange = () => {
        const curCollapsed = !this.state.collapsed;
        this.setState({
            collapsed: curCollapsed
        });
        this.props.onCollapsedChange(curCollapsed);
    }

    render() {
        return <Header
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
                onClick: this.onCollapsedChange,
            })}
            <span style={{marginRight: '20px',}} className="avatar-item">
                        <Badge count={0} size={'small'}>
                            <Avatar src={this.state.avatarUrl}/>
                        </Badge>
                    </span>
        </Header>;
    }
}