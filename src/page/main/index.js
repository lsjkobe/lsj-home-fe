import './main.css'
import {Layout} from 'antd';
import React, {useRef, useState} from 'react';
import LsjNavigate from "../../component/lsj-navigate";
import LsjHeader from "../../component/lsj-header";
import LsjContent from "../../component/lsj-content";
import LsjTabs from "../../component/lsj-tabs";

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [curMenu, setCurMenu] = useState({});

    const lsjTabsRef = useRef();


    const onCollapsedChange = (collapsed) => {
        setCollapsed(collapsed);
    }

    const onMenuSel = (menu) => {
        setCurMenu(menu);
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

export default Main;