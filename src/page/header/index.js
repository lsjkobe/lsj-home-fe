// import { useState } from 'react';
// import { ConfigProvider, Avatar, Card, Button, Space, Switch } from 'antd';
// import {CompactPicker} from "react-color";
//
// function Header() {
//     const [theme, setTheme] = useState('light');
//     const checked = theme === 'light';
//     const handleThemeChange = (checked) => {
//         setTheme(checked ? 'light' : 'dark');
//     };
//     ConfigProvider.config({
//         theme: {
//             primaryColor: theme,
//         },
//     });
//
//     const changeTheme = (colorObj) => {
//         setTheme(colorObj.hex);
//     }
//
//     return (
//         <div className="App">
//             <CompactPicker color={theme} onChange={changeTheme}></CompactPicker>
//             <Card>
//                 <Space>
//                     <Switch
//                         checked={checked}
//                         checkedChildren="亮"
//                         unCheckedChildren="暗"
//                         onChange={handleThemeChange}
//                     />
//                     <Button type="primary">动态主题</Button>
//                 </Space>
//             </Card>
//         </div>
//     );
// }
//
// export default Header;


//
// const Home = () => {
//     return <div>这是home</div>;
// };
//
// export default Home

import {Component, useState} from 'react';
import {ConfigProvider, Avatar, Card, Button, Space, Switch, Dropdown, Menu} from 'antd';
import { SketchPicker } from 'react-color'

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ]}
    />
);

export default class Header extends Component {
    state = {
        // theme : 'light'
        color: '#22ddbb'
    }

    componentDidMount() {
        ConfigProvider.config({
            theme: {
                primaryColor: this.state.color,
            },
        });
    }

    changeTheme = (colorObj) => {
        this.setState({
            color: colorObj.hex
        })
        ConfigProvider.config({
            theme: {
                primaryColor: this.state.color,
            },
        });
    }

    // ...
    render() {
        return <Card>
            <Space style={{background: '#ccc'}}>
                <SketchPicker color={this.state.color} onChange={this.changeTheme}></SketchPicker>
            </Space>
        </Card>
    }
}