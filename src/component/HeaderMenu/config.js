import React from 'react';
import { OrderedListOutlined } from '@ant-design/icons';

export default function config({ linkToPage }) {
    return {
        menu: [
            {
                key: 'overview',
                label: <span onClick={() => linkToPage('/')}>流水线概览</span>,
                icon: <OrderedListOutlined />,
                breadcrumb: [
                    {
                        title: '工作台',
                        key: 'overview'
                    },
                    {
                        title: '流水线概览',
                        key: 'pipelineName'
                    }
                ]
            }
        ]
    };
}
