import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import ListUtil from "@/util/list-util";
import {menuListColumns} from "@/page/menu/menu-list-column";

const data = [];

for (let i = 0; i < 1; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Pa1rk no. ${i}`,
    });
}

const MenuList = () => {

    const [scrollY, setScrollY] = useState('70vh');
    // const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        const init = () => {
            setScrollY(ListUtil.calListHeight());
        }
        init();
    }, []);

    const onTableChange = (pagination, filters, sorter, extra) => {
        if (extra.action === 'paginate') {
            // setCurPage(pagination.current);
        }
    }

    return (
        <Table
            columns={menuListColumns}
            dataSource={data}
            onChange={onTableChange}
            scroll={{
                x: 'max-content',
                y: scrollY,
            }}
        />
    );
};

export default MenuList;