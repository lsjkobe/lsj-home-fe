import {Layout} from 'antd';
import React, {useRef, useState} from 'react';
import LsjNavigate from "@/component/layout/lsj-navigate";
import LsjHeader from "@/component/layout/lsj-header";
import LsjContent from "@/component/layout/lsj-content";
import LsjTabs from "@/component/layout/lsj-tabs";

const LsjLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const lsjTabsRef = useRef();


    const onCollapsedChange = (collapsed) => {
        setCollapsed(collapsed);
    }

    const onMenuSel = (menu) => {
        lsjTabsRef.current.addPane({
            title: menu.domEvent.target.innerText,
            key: menu.key,
        });
    }

    return (
        <Layout>
            <LsjNavigate collapsed={collapsed} onMenuSel={onMenuSel}></LsjNavigate>
            <Layout className="site-layout">
                <LsjHeader collapsed={collapsed} onCollapsedChange={onCollapsedChange}></LsjHeader>
                <LsjTabs curRef={lsjTabsRef}></LsjTabs>
                <LsjContent></LsjContent>
            </Layout>
        </Layout>
    );
}

export default LsjLayout;