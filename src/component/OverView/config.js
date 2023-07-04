import React from 'react';
import { Tooltip, Divider, Button, Popconfirm, message, Badge } from 'antd';
import { DeleteOutlined, CaretRightOutlined, PauseOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import utils from '../utils/time';
import status from '../utils/status';
import { deletePipeLine, runPipeline, stopLastBuild } from '../api/api';

export default function config(props) {
    const navigate = useNavigate();
    //  删除流水线
    async function delPipeLine(record) {
        const parameter = {
            pipelineName: record?.pipelineName
        };

        const resp = await deletePipeLine(parameter);

        if (resp) {
            message.success('删除成功');
            props.getPipeLineList();
        }
    }

    //  启动流水线
    async function startPipeLine(record) {
        const parameter = {
            name: record.pipelineName,
            goods: record?.goods,
            goodsFlavor: record?.goodsFlavor,
            goodsDesc: record?.goodsDesc
        };
        const resp = await runPipeline(parameter);

        if (resp) {
            message.success('操作成功');
            props.getPipeLineList();
        }
    }

    //  暂停流水线
    async function stop(record) {
        const parameter = {
            name: record?.pipelineName
        };

        const resp = await stopLastBuild(parameter);

        if (resp) {
            message.success('操作成功');
            props.getPipeLineList();
        }
    }

    //  跳转到流水线详情
    function jumpPipeLine(record) {
        navigate('/detail?name=' + record.pipelineName);
    }

    const deleteInfo = {
        description: '确认要删除这条流水线吗？',
        okText: '是',
        cancelText: '否'
    };

    const startInfo = {
        description: '将要启动这条流水线',
        okText: '是',
        cancelText: '否'
    };

    const stopInfo = {
        description: '将要终止这条流水线',
        okText: '是',
        cancelText: '否'
    };

    return {
        modal1Data: [
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
        ],
        columns: [
            {
                title: '名称',
                dataIndex: 'pipelineName',
                render: (text) => {
                    const url = `/detail?name=${text}`;
                    return <Link to={url}>{text}</Link>;
                }
            },
            {
                title: '执行人',
                dataIndex: 'builder',
                render: (text) => <span>{text || '--'}</span>
            },
            {
                title: '运行状态',
                dataIndex: 'pipelineStatus',
                render: (text) => <>{status.getStatus(text) || <Badge status="default" text="未运行" />}</>
            },
            {
                title: '开始时间',
                dataIndex: 'timestamp',
                render: (text) => <>{text ? utils.getLocalTime(text) : '--'}</>
            },
            {
                title: '运行时间',
                dataIndex: 'duration',
                render: (text) => <>{utils.formatDate(text)}</>
            },
            {
                title: '创建人',
                dataIndex: 'ownerName',
                render: (text) => <span>{text || '--'}</span>
            },
            {
                title: '操作',
                dataIndex: 'opt',
                width: 150,
                render: (text, record) => {
                    return (
                        <>
                            {record.building ? (
                                // 暂停
                                <Popconfirm {...stopInfo} onConfirm={() => stop(record)}>
                                    <Tooltip title="终止">
                                        <Button
                                            disabled={record?.inQueue || record?.pipelineStatus === 'ABORTING'}
                                            size={'small'}
                                            shape="circle"
                                            type="primary"
                                            icon={<PauseOutlined />}
                                        />
                                    </Tooltip>
                                </Popconfirm>
                            ) : (
                                // 启动
                                <Popconfirm {...startInfo} onConfirm={() => startPipeLine(record)}>
                                    <Tooltip title="启动">
                                        <Button
                                            type="primary"
                                            size={'small'}
                                            shape="circle"
                                            icon={<CaretRightOutlined />}
                                        />
                                    </Tooltip>
                                </Popconfirm>
                            )}
                            <Divider type="vertical" />
                            {/* 跳转到流水线详情 */}
                            <Tooltip title="跳转到流水线详情">
                                <Button
                                    shape="circle"
                                    size={'small'}
                                    onClick={() => jumpPipeLine(record)}
                                    icon={<SettingOutlined />}
                                ></Button>
                            </Tooltip>
                            <Divider type="vertical" />
                            {/* 删除 */}
                            <Popconfirm {...deleteInfo} onConfirm={() => delPipeLine(record)}>
                                <Tooltip title="删除">
                                    <Button
                                        disabled={record.building}
                                        shape="circle"
                                        size={'small'}
                                        danger
                                        icon={<DeleteOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Popconfirm>
                        </>
                    );
                }
            }
        ]
    };
}
