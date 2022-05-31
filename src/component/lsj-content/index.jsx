import React, {Component} from "react";
import ContentMenu from "../../page/content-menu";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {BaseRouter} from "../../route/root-route";
import LsjTabs from "../lsj-tabs";

const LsjContent = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                // margin: '10px 10px',max-height
                // padding: 10,
                minHeight: 680,
            }}
        >
            <BaseRouter></BaseRouter>
        </Content>
    );
}

export default LsjContent;