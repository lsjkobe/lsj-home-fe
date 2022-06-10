import {Modal} from 'antd';
import React, {useImperativeHandle, useRef, useState} from 'react';
import Draggable from 'react-draggable';
import ModalAddMenuForm from "@/page/menu/modal/add-menu/modal-add-menu-form";

const ModalAddMenu = (props) => {
    const {curRef, visible, menu, isAdd, callBack} = props;
    const {handleOk, handleCancel} = props?.handles;
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0, top: 0, bottom: 0, right: 0,
    });
    //拖拽
    const draggableRef = useRef(null);
    //拖拽
    const addMenuFormRef = useRef();

    useImperativeHandle(curRef, () => (
        {
            submitRef() {
                addMenuFormRef.current?.submitRef();
            }
        }
    ))

    /**
     * 拖拽调用.
     * @param _event
     * @param uiData
     */
    const onStart = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggableRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    /**
     * 获取标题.
     * @returns {JSX.Element}
     */
    const getTitle = () => {
        return <div style={{width: '100%', cursor: 'move',}}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    onFocus={() => {
                    }} onBlur={() => {
        }}
        >
            {isAdd ? "新建菜单" : "编辑菜单"}
        </div>
    }

    return (
        <Modal
            title={getTitle()} visible={visible} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消"
            modalRender={(modal) => (
                <Draggable disabled={disabled} bounds={bounds}
                           onStart={(event, uiData) => onStart(event, uiData)}>
                    <div ref={draggableRef}>{modal}</div>
                </Draggable>
            )}
        >
            <ModalAddMenuForm curRef={addMenuFormRef} menu={menu} isAdd={isAdd} callBack={callBack}></ModalAddMenuForm>
        </Modal>
    );
};

export default ModalAddMenu;