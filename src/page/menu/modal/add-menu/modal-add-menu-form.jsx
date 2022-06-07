import {Col, Form, Row, TreeSelect} from 'antd';
import React, {useEffect, useState} from 'react';
import MenuData from "@/data/menu-data";
import * as MenuUtil from "@/page/menu/menu-util";

const ModalAddMenuForm = () => {

    const [menuData, setMenuData] = useState([]);

    const [menuTreeSelData, setMenuTreeSelData] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        function initData() {
            initDataAsync().then();
        }

        const init = () => {
            initData();
        }
        init();
    }, []);

    useEffect(() => {
        setMenuTreeSelData(MenuUtil.transToTreeSelData(menuData));
    }, [menuData]);


    const initDataAsync = async () => {
        const menuList = await MenuData.queryMenuList({appId: 2});
        setMenuData(menuList);
    }

    return (
        <Form form={form} name="add-menu-form">
            <Row style={{margin: 0}} gutter={24}>
                <Col span={24} key='select-parent-menu'>
                    <Form.Item name='parentMenu' label='选择父级菜单'
                               rules={[
                                   {
                                       required: true,
                                       message: '父级菜单不能为空',
                                   },
                               ]}
                    >
                        <TreeSelect
                            style={{width: '100%'}}
                            // value={value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={menuTreeSelData}
                            placeholder="选择父菜单"
                            treeDefaultExpandAll
                            // onChange={onChange}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ModalAddMenuForm;