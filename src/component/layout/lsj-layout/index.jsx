import {Layout} from 'antd';
import React, {useRef, useState} from 'react';
import LsjNavigate from "@/component/layout/lsj-navigate";
import LsjHeader from "@/component/layout/lsj-header";
import LsjContent from "@/component/layout/lsj-content";
import LsjTabs from "@/component/layout/lsj-tabs";
import LsjTopMenu from "@/component/layout/lsj-top-menu";

const LsjLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [curAppCode, setCurAppCode] = useState("");

    const lsjTabsRef = useRef();
    const lsjNavigateRef = useRef();


    const onCollapsedChange = (collapsed) => {
        setCollapsed(collapsed);
    }

    const onMenuSel = (menu) => {
        lsjTabsRef.current.addPane({
            title: menu.domEvent.target.innerText,
            key: menu.key,
        });
    }

    const onChangePane = (paneKey) => {
        lsjNavigateRef.current.setMenuSelKey(paneKey);
    }

    /**
     * 顶部菜单改变.
     * @param topMenuKey
     */
    const onChangeTopMenu = (topMenuKey) => {
        setCurAppCode(topMenuKey);
    }

    return (
        <Layout style={{height: '100vh'}}>
            <LsjTopMenu onChange={onChangeTopMenu}></LsjTopMenu>
            <Layout>
                <LsjNavigate collapsed={collapsed} onMenuSel={onMenuSel} curRef={lsjNavigateRef} appCode={curAppCode}></LsjNavigate>
                <Layout className="site-layout">
                    <LsjHeader collapsed={collapsed} onCollapsedChange={onCollapsedChange}></LsjHeader>
                    <LsjTabs curRef={lsjTabsRef} onChangePane={onChangePane}></LsjTabs>
                    <LsjContent></LsjContent>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default LsjLayout;