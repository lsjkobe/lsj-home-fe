import React from "react";
import {Content} from "antd/es/layout/layout";
import {BaseRouter} from "@/route/root-route";

const LsjContent = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                minHeight: 680,
            }}
        >
            <BaseRouter></BaseRouter>
        </Content>
    );
}

export default LsjContent;