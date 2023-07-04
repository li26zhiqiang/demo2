/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Timeline, Divider } from 'antd';
import { SyncOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

export default function PipeLineItem(props) {
    const lines = props.itemList || [];

    const dotDic = {
        //  成功（有结果）
        SUCCESS: {
            color: 'green',
            dot: <CheckCircleOutlined />
        },
        //  未构建（有结果）
        NOT_BUILT: {
            color: 'gray'
        },
        //  构建中（无结果）
        BUILDING: {
            color: 'rgb(22, 119, 255)',
            dot: <SyncOutlined spin />
        },
        //  重新构建（无结果）
        REBUILDING: {
            color: 'rgb(22, 119, 255)',
            dot: <SyncOutlined spin />
        },
        //  运行中（无结果）
        IN_PROGRESS: {
            color: 'rgb(22, 119, 255)',
            dot: <SyncOutlined spin />
        },
        //  终止（有结果）
        ABORTED: {
            color: 'red',
            dot: <CloseCircleOutlined />
        },
        //  未知（有结果）
        UNKNOWN: {
            color: 'red',
            dot: <CloseCircleOutlined />
        },
        //  取消（有结果）
        CANCELLED: {
            color: 'red',
            dot: <CloseCircleOutlined />
        },
        //  失败（有结果）
        FAILURE: {
            color: 'red',
            dot: <CloseCircleOutlined />
        },
        FAILED: {
            color: 'red',
            dot: <CloseCircleOutlined />
        },
        //  不稳定（有结果）
        UNSTABLE: {
            color: 'red',
            dot: <CloseCircleOutlined />
        }
    };

    return (
        <>
            <Card hoverable bordered={true} className={styles['pipeline-product-view']}>
                {lines.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.label}</p>
                            <div className={styles['pipeline-product-timeline']}>
                                <Timeline
                                    key={index}
                                    items={item.value.map((children) => {
                                        return {
                                            ...dotDic[children.status],
                                            ...children
                                        };
                                    })}
                                />
                            </div>
                            {lines.length - 1 !== index ? <Divider dashed /> : <></>}
                        </div>
                    );
                })}
            </Card>
        </>
    );
}
