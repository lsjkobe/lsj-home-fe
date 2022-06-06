import React, {useEffect, useImperativeHandle, useState} from 'react';
import {Form, Row, Col, Input, Button, Select, Space} from 'antd';
import ApplicationData from "@/data/application-data";

const {Option} = Select;

const AdvancedSearchForm = (props) => {
    const {curRef} = props;
    const {doSearchCB, doAddCB} = props.btnCallBack;
    const [appDataList, setAppDataList] = useState([]);

    const [form] = Form.useForm();

    useImperativeHandle(curRef, () => (
        {
            doSearchRef: () => {
                doSearchLogic(form.getFieldsValue())
            }
        }
    ))

    useEffect(() => {
        const asyncInitData = async () => {
            let appList = await ApplicationData.getBatchByCurUser();
            if (!appList || appList.length === 0) {
                return;
            }
            setAppDataList(appList);
            //初始化form里的select
            form.setFieldsValue({...form.getFieldsValue(), appId: appList[0].id});
            doSearchLogic(form.getFieldsValue())
        }
        const initData = () => {
            asyncInitData().then(() => {

            });
        }

        const init = () => {
            initData();
        }

        init();
    }, [form])

    const getFormItems = () => {
        const children = [];
        children.push(
            [
                <Col span={6} key='select-app'>
                    <Form.Item name='appId' label={`选择应用`}
                               rules={[
                                   {
                                       required: true,
                                       message: '应用不能为空',
                                   },
                               ]}
                    >
                        <Select name='selectApp' showSearch placeholder="选择应用" optionFilterProp="children"
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {appDataList.map(app => {
                                return <Option key={app.id} value={app.id}>{app.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>,
                <Col span={6} key='query-key-work'>
                    <Form.Item name='keyWork' label={`输入关键字`}>
                        <Input style={{width: 150}} placeholder="输入关键字"/>
                    </Form.Item>
                </Col>,
            ]
        );
        return children;
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        doSearchLogic(values);
    };

    const doSearchLogic = (query) => {
        doSearchCB(query);
    }

    return (
        <div style={{margin: '10px'}}>
            <Form form={form} name="advanced_search" className="ant-advanced-search-form"
                  onFinish={onFinish}
            >
                <Row style={{margin: 0}} gutter={24}>{getFormItems()}</Row>
                <Row>
                    <Col span={12} style={{textAlign: 'left',}}>
                        <Space>
                            <Button type="primary" onClick={doAddCB}>新增</Button>
                        </Space>
                    </Col>
                    <Col span={12} style={{textAlign: 'right',}}>
                        <Space>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={() => {
                                form.resetFields();
                            }}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

const MenuListHeader = (props) => (
    <div>
        <AdvancedSearchForm {...props}/>
    </div>
);

export default MenuListHeader;