import React from "react";
import {Content} from "antd/es/layout/layout";
import {ContentRouter} from "@/route/root-route";

const LsjContent = () => {

    return (
        <Content
            className="site-layout-background"
            style={{
                minHeight: 680,
            }}
        >
            <ContentRouter>
            </ContentRouter>
        </Content>
    );
}

export default LsjContent;