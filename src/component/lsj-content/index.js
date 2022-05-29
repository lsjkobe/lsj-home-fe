import React, {Component} from "react";
import ContentMenu from "../../page/content-menu";
import {Content} from "antd/es/layout/layout";

export default class LsjContent extends Component {

    constructor(props, context: any) {
        super(props, context);
    }

    render() {
        return <Content
            className="site-layout-background"
            style={{
                margin: '10px 10px',
                // padding: 10,
                minHeight: 680,
            }}
        >
            <ContentMenu></ContentMenu>
        </Content>;
    }
}