import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../utils/getUrlParameter';

export default function config() {
    const pipelineName = utils.getPipelineName();
    return {
        product: {
            key: 'product',
            label: 'Product',
            status: 'SUCCESS',
            time: '0',
            itemList: [
                {
                    label: '商品',
                    name: 'goods',
                    type: 'input'
                },
                {
                    label: '规格',
                    name: 'goodsFlavor',
                    type: 'input'
                },
                {
                    label: '描述',
                    name: 'goodsDesc',
                    type: 'textArea'
                }
            ]
        },

        // 无结果的状态
        runningStatus: ['REBUILDING', 'IN_PROGRESS', 'BUILDING'],

        //  流水线面包屑
        pipeLineBreadcrumb: [
            {
                title: '无人流水线',
                key: 'unmannedAssemblyLine'
            },
            {
                title: <Link to="/">{'流水线概览'}</Link>,
                key: 'overview'
            },
            {
                title: `${pipelineName}`,
                key: 'pipelineName'
            }
        ]
    };
}
