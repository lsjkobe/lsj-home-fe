import './content-menu.css'

import {Component, Fragment} from "react";
import {Breadcrumb, Layout, Menu, Switch} from 'antd';
import Home from "../Home";

const {Header, Content, Footer} = Layout;

export default class ContentMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMenuList: []
        }
    }

    render() {
        return <Layout className="layout">
            <Header style={{padding: 0}}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(12).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
            <Content
                // style={{
                //     padding: '0 50px',
                // }}
            >
                {/*<div className="site-layout-content">*/}
                {/*    <Fragment>*/}
                {/*        <Switch>*/}
                {/*            <PrivateRouter exact path="/group" component={Home}></PrivateRouter>*/}
                {/*            <PrivateRouter exact path="/home" component={Home}></PrivateRouter>*/}
                {/*        </Switch>*/}
                {/*    </Fragment>*/}
                {/*</div>*/}
            </Content>
        </Layout>;
    }
}