/* eslint-disable prettier/prettier */
import React from 'react';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import utils from '../../utils/time';
import styles from './index.less';

export default function PipeLineHeader(props) {
    const svgList = props?.pipeLineList || [];

    const color = {
        SUCCESS: '#50d4ab',
        NOT_BUILT: '#8a8e99',

        FAILED: '#f66f6a',
        FAILURE: '#f66f6a',
        ABORTED: '#f66f6a',
        UNKNOWN: '#f66f6a',
        CANCELLED: '#f66f6a',
        UNSTABLE: '#f66f6a',

        BUILDING: '#46484e',
        REBUILDING: '#46484e',
        IN_PROGRESS: '#46484e',
        ABORTING: '#46484e'
    };

    const loadingDic = {
        running: <LoadingOutlined />
    };

    return (
        <>
            {svgList.map((item, index) => {
                const running = loadingDic[item.status] || '';

                if (index === 0) {
                    return (
                        <div className={styles['svg-item-start']} key={index}>
                            <svg height={60} width={275}>
                                <polygon
                                    points="0,0 250,0 275,30 250,60 0,60"
                                    style={{ fill: color[item.status], strokeWidth: 1 }}
                                />
                            </svg>
                            <span className={styles['svg-label']}>{item.label}</span>
                            <span className={styles['svg-time']}>
                                {running}
                            </span>
                        </div>
                    );
                } else if (index === svgList.length - 1) {
                    return (
                        <div className={styles['svg-item']} key={index}>
                            <svg height={60} width={275}>
                                <polygon
                                    points="0,0 250,0 250,60 0,60 25,30"
                                    style={{ fill: color[item.status], strokeWidth: 1 }}
                                />
                            </svg>
                            <span className={styles['svg-label']}>
                                {item.label}
                                {item.status === 'BUILDING' && (
                                    <SyncOutlined spin className={styles['svg-sync-outlined']} />
                                )}
                            </span>
                            <span className={styles['svg-time']}>
                                {running} {utils.formatDate(item.time)}
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className={styles['svg-item']} key={index}>
                            <svg height={60} width={275}>
                                <polygon
                                    points="0,0 250,0 275,30 250,60 0,60 25,30"
                                    style={{ fill: color[item.status], strokeWidth: 1 }}
                                />
                            </svg>
                            <span className={styles['svg-label']}>
                                {item.label}
                                {item.status === 'BUILDING' && (
                                    <SyncOutlined spin className={styles['svg-sync-outlined']} />
                                )}
                            </span>
                            <span className={styles['svg-time']}>
                                {running} {utils.formatDate(item.time)}
                            </span>
                        </div>
                    );
                }
            })}
        </>
    );
}
