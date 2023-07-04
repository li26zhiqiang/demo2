/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Popconfirm, Form, Button, Col, Row, Divider, Tooltip, message } from 'antd';
import { PauseOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import PipeLineStart from './PipeLineStart';
import RunningLog from './RunningLog';
import { pipelineInfo, stopPipeLine } from '../api/api';
import utils from '../utils/getUrlParameter';
import styles from './index.less';

export default function Header(props) {
    const { form, stage, getNewSince, pipelineRecord, isInQueueVal, checkoutIsInQueue } = props;
    const { builder, ownerName, building, displayName, pipelineStatus } = pipelineRecord;

    const pipelineName = utils.getPipelineName();
    const pipelineId = utils.getPipelineId();

    const [pipelineInformitration, setPipelineInformitration] = useState([]);


    async function getPipeLineInfo() {
        const resp = await pipelineInfo();

        if (resp) {
            setPipelineInformitration(resp?.data);
        }
    }

    async function stop() {

        const runId = displayName.split('#')[1];
        const parameter = {
            name: pipelineName,
            runId
        };

        const resp = await stopPipeLine(parameter);

        if (resp) {
            message.success('操作成功');
            getNewSince({ type: 'create' });
        }
    }

    function getPipelineStatus() {
        //  失败的状态 //  成功的状态 //  运行中的状态
        let successStatus = ['SUCCESS'];
        let errorStatus = ['ABORTED', 'CANCELLED', 'FAILURE', 'FAILED', 'UNKNOWN', 'UNSTABLE'];

        if (successStatus.includes(pipelineStatus)) {
            return <CheckCircleOutlined style={{ color: '#87d068', marginRight: '12px', fontSize: '18px' }} />;
        } else if (building || isInQueueVal) {
            return <SyncOutlined spin style={{ color: '#108ee9', marginRight: '12px', fontSize: '18px' }}/>;
        } else if (errorStatus.includes(pipelineStatus)) {
            return <CloseCircleOutlined style={{ color: '#f50', marginRight: '12px', fontSize: '18px' }} />;
        } else {
            return '';
        }
    }

    useEffect(() => {
        //  获取流水线的基本信息
        getPipeLineInfo();
    }, []);

    const pipelineStatusVal = getPipelineStatus();

    return (
        <>
            <div className={styles['pipeline-name']}>
                <Row>
                    <Col span={4}>
                        {pipelineStatusVal}<span className={styles['pipeline-title']}>{pipelineName}</span>
                    </Col>
                    <Col span={5}>
                        {!pipelineId && <div className={styles['pipeline-button-list']}>
                            <PipeLineStart {...{ stage, form, getNewSince, pipelineName, isInQueueVal, building, checkoutIsInQueue }}/>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="终止"
                                description="确定要终止这条流水线？"
                                onConfirm={() => stop()}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Tooltip title="终止">
                                    <Button disabled={!building || pipelineStatus === 'ABORTING'} icon={<PauseOutlined />} >终止</Button>
                                </Tooltip>
                            </Popconfirm>
                        </div>}
                    </Col>
                    <Col span={3} offset={7} className={styles['pipeline-username-col']}>
                        <Tooltip title={builder}>
                            <span className={styles['pipeline-username']}>{`执行人：${builder || '--'}`}</span>
                        </Tooltip>
                    </Col>
                    <Col span={3} className={styles['pipeline-username-col']}>
                        <Tooltip title={ownerName}>
                            <span className={styles['pipeline-username']}>{`创建人：${ownerName || '--'}`}</span>
                        </Tooltip>
                    </Col>
                    <Col span={2}>
                        <RunningLog />
                    </Col>
                </Row>
            </div>

            <div>
                <Form>
                    <Row>
                        {pipelineInformitration.map((item, index) => {
                            return (
                                <Col span={4} key={index} >
                                    <Form.Item className={styles['pipeline-col-formitem']} label={item.label} name={item.label}>
                                        {item.value}
                                    </Form.Item>
                                </Col>
                            );
                        })}
                        <Divider className={styles['pipeline-header-divider']} />
                    </Row>
                </Form>
            </div>
        </>
    );
}
