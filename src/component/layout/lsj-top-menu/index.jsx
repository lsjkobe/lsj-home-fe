import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import ApplicationData from "@/data/application-data";
import CacheMenuHandler from "@/common/cache-menu-handler";

const LsjTopMenu = (props) => {
    const {onChange} = props;
    const [appList, setAppList] = useState([]);
    const [menuSelKey, setMenuSelKey] = useState([]);
    const [menuAppList, setMenuAppList] = useState([]);

    useEffect(() => {
        if (appList && appList.length > 0) {
            setMenuAppList(appList.map((appData) => ({
                key: `${appData.code}`,
                label: `${appData.name}`,
            })))
        }
    }, [appList]);

    useEffect(() => {

    }, [menuSelKey]);

    useEffect(() => {
        const init = () => {
            menuInit().then();
        }

        const menuInit = async () => {
            let appList = await ApplicationData.getBatchByCurUser();
            setAppList(appList);
            let topMenuKey = appList[0].code;
            if (CacheMenuHandler.getMenuCache().curTopMenuKey) {
                topMenuKey = CacheMenuHandler.getMenuCache().curTopMenuKey;
            }
            CacheMenuHandler.saveCurTopMenuKey(topMenuKey);
            setMenuSelKey(topMenuKey);
            onChange(topMenuKey);
        }

        init();
    }, [])

    const onMenuClick = (item) => {
        onChange(item.key);
        setMenuSelKey([item.key]);
        CacheMenuHandler.saveCurTopMenuKey(item.key);
    }

    return (
        <Header className="header" style={{padding: 0}}>
            <div className="logo"/>
            <Menu
                selectedKeys={menuSelKey}
                theme="light"
                mode="horizontal"
                items={menuAppList}
                onClick={onMenuClick}
            />
        </Header>
    );
}


export default LsjTopMenu;