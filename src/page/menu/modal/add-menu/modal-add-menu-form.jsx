import {Button, Col, Form, Row, TreeSelect} from 'antd';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import MenuData from "@/data/menu-data";
import * as MenuUtil from "@/page/menu/menu-util";

const ModalAddMenuForm = (props) => {

    const {defaultMenuId, curRef} = props;

    const [menuData, setMenuData] = useState([]);

    const [menuDisabled, setMenuDisabled] = useState(false);

    const [menuTreeSelData, setMenuTreeSelData] = useState([]);

    const [form] = Form.useForm();

    useImperativeHandle(curRef, () => (
        {
            submitRef() {
                form.submit();
            }
        }
    ))

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
        if (defaultMenuId) {
            form.setFieldsValue({...form.getFieldsValue(), parentId: defaultMenuId});
            setMenuDisabled(true);
        }
    }, [defaultMenuId]);

    useEffect(() => {
        setMenuTreeSelData(MenuUtil.transToTreeSelData(menuData));
    }, [menuData]);


    const initDataAsync = async () => {
        const menuList = await MenuData.queryMenuList({appId: 2});
        setMenuData(menuList);
    }

    const onSubmit = (values) => {
        console.info(values);
    }

    return (
        <Form form={form} name="add-menu-form" onFinish={onSubmit}>
            <Row style={{margin: 0}} gutter={24}>
                <Col span={24} key='select-parent-menu'>
                    <Form.Item name='parentId' label='选择父级菜单'
                               rules={[
                                   {
                                       required: true,
                                       message: '父级菜单不能为空',
                                   },
                               ]}
                    >
                        <TreeSelect
                            disabled={menuDisabled}
                            style={{width: '100%'}}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={menuTreeSelData}
                            placeholder="选择父菜单"
                            // treeDefaultExpandAll
                            // onChange={onChange}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ModalAddMenuForm;