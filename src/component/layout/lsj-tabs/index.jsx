import "./lsj-tabs.css";
import {Tabs} from "antd";
import {useEffect, useImperativeHandle, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {getRouteByPath} from "@/route/root-route";

const {TabPane} = Tabs;

const LsjTabs = (props) => {
    const {curRef} = props;

    const [curPaneKey, setCurPaneKey] = useState('/');
    const [panes, setPanes] = useState([]);

    const navigate = useNavigate();

    useImperativeHandle(curRef, () => (
        {
            addPane: (newPane) => {
                if (newPane.key) {
                    if (!isExistKey(newPane.key)) {
                        setPanes([
                            ...panes, newPane
                        ]);
                    }
                    setCurPaneKey(newPane.key);
                }
            }
        }
    ))
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

    const isExistKey = (checkKey) => {
        for (let pane of panes) {
            if (pane.key === checkKey) {
                return true;
            }
        }
        return false;
    }

    //tabs切换
    const onChange = (key) => {
        setCurPaneKey(key);
        props.onChangePane(key);
    }

    //编辑
    const onEdit = (targetKey, action) => {
        if (action === 'remove') {
            let delIndex = -1;
            panes.forEach((item, index, arr) => {
                if (item.key === targetKey) {
                    delIndex = index;
                    arr.splice(index, 1);
                }
            })
            if (delIndex > -1 && targetKey === curPaneKey) {
                let activeIndex = delIndex;
                if (panes.length === delIndex) {
                    activeIndex = delIndex - 1;
                }
                setCurPaneKey(panes[activeIndex].key);
            }
            setPanes([...panes]);
        }
    }

    return (
        <div className="card-container">
            <Tabs type="editable-card" activeKey={curPaneKey} hideAdd
                  onChange={onChange} onEdit={onEdit}
                  style={{background: "#eee", maxHeight: "40px"}}>
                {panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.key} closable={pane?.closable}>
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default LsjTabs;