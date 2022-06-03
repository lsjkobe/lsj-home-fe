import React from 'react'
import * as icons from '@ant-design/icons'

const Icon = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;
    if (antIcon[icon]) {
        return React.createElement(antIcon[icon]);
    } else {
        return null;
    }
};

export default Icon;