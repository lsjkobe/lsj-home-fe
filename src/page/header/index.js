import { useState } from 'react';
import { ConfigProvider, Avatar, Card, Button, Space, Switch } from 'antd';

function Header() {
    const [theme, setTheme] = useState('light');
    const checked = theme === 'light';
    const handleThemeChange = (checked) => {
        setTheme(checked ? 'light' : 'dark');
    };
    ConfigProvider.config({
        theme: {
            primaryColor: checked ? 'aquamarine' : 'darkgreen',
        },
    });

    return (
        <div className="App">
            <Card>
                <Space>
                    <Switch
                        checked={checked}
                        checkedChildren="亮"
                        unCheckedChildren="暗"
                        onChange={handleThemeChange}
                    />
                    <Button type="primary">动态主题</Button>
                </Space>
            </Card>
        </div>
    );
}

export default Header;