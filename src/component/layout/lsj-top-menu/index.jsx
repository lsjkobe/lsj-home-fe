import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import ApplicationData from "@/data/application-data";

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
            setMenuSelKey(appList[0].code);
            onChange(appList[0].code);
        }
    }, [appList]);


    useEffect(() => {
        const init = () => {
            menuInit();
        }

        const menuInit = () => {
            ApplicationData.getBatchByCurUser()
                .then(appList => {
                    setAppList(appList);
                })
                .catch(e => {
                    console.log(e);
                })
        }

        init();
    }, [])

    const onMenuClick = (item) => {
        onChange(item.key);
        setMenuSelKey([item.key]);
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