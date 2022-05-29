import './main.css'
import {Layout} from 'antd';
import React, {Component} from 'react';
import userData from "../../data/user-data";
import LsjNavigate from "../../component/lsj-navigate";
import LsjHeader from "../../component/lsj-header";
import LsjContent from "../../component/lsj-content";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            avatarUrl: '',
        }
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.userInit();
    }

    userInit = () => {
        userData.getUserData()
            .then((userData) => {
                if (userData && userData.avatarUrl) {
                    this.setState({
                        avatarUrl: userData.avatarUrl
                    })
                }
            })
    }

    onCollapsedChange = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    }

    render() {
        return (
            <Layout>
                <LsjNavigate collapsed={this.state.collapsed}></LsjNavigate>
                <Layout className="site-layout">
                    <LsjHeader collapsed={this.state.collapsed} onCollapsedChange={this.onCollapsedChange}></LsjHeader>
                    <LsjContent></LsjContent>
                </Layout>
            </Layout>
        );
    }
}

export default Main;