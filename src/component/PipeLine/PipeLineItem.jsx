/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Spin, Card, Timeline, Divider, Tooltip, Modal, Button } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { SyncOutlined, CloseCircleOutlined, CheckCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import { getLogView } from '../api/api';
import styles from './index.less';

export default function PipeLineItem(props) {
    const lines = props.itemList || [];
    const [visible, setVisible] = useState(false);
    const [logValue, setLogValue] = useState('');
    const [selectStep, setSelectStep] = useState(null);
    const [loading, setLoading] = useState(null);
    const { pipelineRecord } = props;

    function cancel() {
        setVisible(false);
    }

    async function showModal(step) {
        setVisible(true);
        getLog(step);
        setSelectStep(step);
    }

    async function getLog(step) {
        if (!pipelineRecord || !step) {
            return;
        }

        const {pipelineName, displayName} = pipelineRecord;
        const parameter = {
            name: pipelineName,
            runId: displayName ? displayName.split('#')[1] : 0,
            stageId: step?.id
        };

        setLoading(true);
        const resp = await getLogView(parameter);
        setLoading(false);

        if (resp) {
            setLogValue(resp?.data);
        }
    }

    function refreshLog() {
        getLog(selectStep);
    }

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
                                    items={item.value.map((step) => {

                                        return {
                                            ...dotDic[step.status],
                                            ...step,
                                            children: <div className={styles['pipeline-step-view']}>
                                                {step.children}
                                                {step?.id && <Tooltip title="日志">
                                                    <span className={styles['pipeline-log-view']} onClick={() => {
                                                        showModal(step);
                                                    }}>
                                                        <SnippetsOutlined />
                                                    </span>
                                                </Tooltip>}
                                            </div>
                                        };
                                    })}
                                />
                            </div>
                            {lines.length - 1 !== index ? <Divider dashed /> : <></>}
                        </div>
                    );
                })}
            </Card>

            <Modal
                open={visible}
                onCancel={cancel}
                title="查看日志"
                footer={[null]}
                width={1080}
            >
                <Button style={{ marginBottom: '16px' }} type={'primary'} onClick={() => refreshLog()}>{'刷新'}</Button>
                <Spin spinning={loading}>
                    <AceEditor
                        mode="json"
                        theme="github"
                        name="pipelineJson"
                        value={logValue}
                        width='100%'
                        splits={1}
                    />
                </Spin>
            </Modal>
        </>
    );
}
