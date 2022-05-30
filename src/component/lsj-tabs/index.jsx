import "./lsj-tabs.css";
import {Tabs} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {getRouteByPath} from "../../route/root-route";

const {TabPane} = Tabs;

const LsjTabs = () => {

    const [curPaneKey, setCurPaneKey] = useState('/');

    const [panes, setPanes] = useState([]);

    const navigate = useNavigate();

    // tabs切换时跳转
    useEffect(() => {
        let route = getRouteByPath(curPaneKey);
        if (route) {
            setPanes([
                {
                    title: route.name,
                    key: route.path,
                    closable: false
                }, ...panes
            ]);
        }
    }, []);

    // tabs切换时跳转
    useEffect(() => {
        navigate(curPaneKey);
    }, [curPaneKey]);

    //tabs切换
    const onChange = (key) => {
        setCurPaneKey(key);
    }

    return (
        <div className="card-container">
            <Tabs type="editable-card" activeKey={curPaneKey} hideAdd
                  onChange={onChange}
                  style={{background: "#eee", maxHeight: "50px"}}>
                {panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.key} closable={pane?.closable}>
                        {pane.content}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default LsjTabs;