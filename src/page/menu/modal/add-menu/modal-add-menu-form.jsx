import {Col, Form, Input, Row, Select, TreeSelect} from 'antd';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import MenuData from "@/data/menu-data";
import * as MenuUtil from "@/page/menu/menu-util";

const {Option} = Select;

const ModalAddMenuForm = (props) => {

    const {menu, curRef, isAdd} = props;

    const {doSubmitCB} = props.callBack;

    const [menuData, setMenuData] = useState([]);

    const [menuTypes, setMenuTypes] = useState([]);

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
        form.setFieldsValue({...form.getFieldsValue(), ...menu});
        setMenuDisabled(menu.parentId);
    }, [menu.parentId]);

    useEffect(() => {
        setMenuTreeSelData(MenuUtil.transToTreeSelData(menuData));
    }, [menuData]);


    const initDataAsync = async () => {
        let _menuList = await MenuData.queryMenuList({appId: menu.appId});
        _menuList = [{
            id: 0,
            menuName: "/"
        }, ..._menuList];
        setMenuData(_menuList);
        const _menuTypes = await MenuData.getMenuTypes();
        setMenuTypes(_menuTypes);
    }

    const onSubmit = (values) => {
        doSubmitAsync(values).then(newMenu => {
            doSubmitCB && doSubmitCB(newMenu);
        })
    }

    const doSubmitAsync = async (values) => {
        let newMenu;
        if (isAdd) {
            newMenu = {...values, appId: menu.appId};
            await MenuData.addMenu(newMenu);
        } else {
            newMenu = {...menu, ...values};
            await MenuData.editMenu(newMenu);
        }
        return newMenu;
    }

    return (
        <Form form={form} name="add-menu-form" onFinish={onSubmit}>
            <Row style={{margin: 0}} gutter={24}>
                <Col span={24} key='select-parent-menu'>
                    <Form.Item name='parentId' label='父级菜单'
                               rules={[
                                   {
                                       required: true,
                                       message: '父级菜单不能为空',
                                   },
                               ]}
                    >
                        <TreeSelect
                            disabled={menuDisabled || !isAdd}
                            style={{width: '100%'}}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={menuTreeSelData}
                            placeholder="选择父菜单"
                        />
                    </Form.Item>
                </Col>
                <Col span={24} key='input-menu-name'>
                    <Form.Item name='menuName' label='菜单名称'
                               rules={[
                                   {
                                       required: true,
                                       message: '菜单名称不能为空',
                                   },
                               ]}
                    >
                        <Input placeholder="输入菜单名称"/>
                    </Form.Item>
                </Col>
                <Col span={24} key='input-menu-path'>
                    <Form.Item name='menuPath' label='菜单路径'
                               rules={[
                                   {
                                       required: true,
                                       message: '菜单路径不能为空',
                                   },
                               ]}
                    >
                        <Input placeholder="输入菜单路径"/>
                    </Form.Item>
                </Col>
                <Col span={24} key='input-menu-perms'>
                    <Form.Item name='perms' label='授权标识'
                               rules={[
                                   {
                                       required: true,
                                       message: '授权标识不能为空',
                                   },
                               ]}
                    >
                        <Input placeholder="输入授权标识"/>
                    </Form.Item>
                </Col>
                <Col span={12} key='input-menu-order'>
                    <Form.Item name='orderNum' label='序号'>
                        <Input placeholder="输入序号"/>
                    </Form.Item>
                </Col>
                <Col span={12} key='select-menu-type'>
                    <Form.Item name='menuType' label='菜单类型'
                               rules={[
                                   {
                                       required: true,
                                       message: '菜单类型不能为空',
                                   },
                               ]}
                    >
                        <Select name='selectMenuType' showSearch placeholder="选择菜单类型" optionFilterProp="children"
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {menuTypes.map(app => {
                                return <Option key={app.type} value={app.type}>{app.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ModalAddMenuForm;