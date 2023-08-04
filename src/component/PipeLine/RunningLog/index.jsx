import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Badge } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import time from '../../utils/time';
import utils from '../../utils/getUrlParameter';
import status from '../../utils/status';
import { getRunningLog } from '../../api/api';
import styles from './index.less';

export default function RunningLog() {
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    function showVisible() {
        setVisible(true);
        getRunningLogList();
    }

    //  取消
    function cancel() {
        setVisible(false);
    }

    //  获取执行记录
    async function getRunningLogList() {
        const pipelineName = utils.getPipelineName();
        const parm = {
            name: pipelineName,
            fullStages: true,
            _: new Date().valueOf(),
            pageNum: currentPage,
            pageSize: currentPageSize
        };

        setLoading(true);
        const resp = await getRunningLog(parm);
        setLoading(false);

        if (resp && resp.data && resp.data.records) {
            setDataSource(resp.data.records);
            setTotal(resp?.data?.total || 0);
        }
    }

    function open(url) {
        window.open(url);
    }

    useEffect(() => {
        if (visible) {
            getRunningLogList();
        }
    }, [currentPage, currentPageSize]);

    const tableParm = {
        columns: [
            {
                title: '序号',
                dataIndex: 'name'
            },
            {
                title: '名称',
                dataIndex: 'pipelineName',
                render: (text, record) => {
                    const url = `/console/pipeline/detail?name=${text}&id=${record?.id}`;
                    return (
                        <span className={styles['running-log-pipeline-name']} onClick={() => open(url)}>
                            {text}
                        </span>
                    );
                }
            },
            {
                title: '执行人',
                dataIndex: 'builder'
            },
            {
                title: '运行状态',
                dataIndex: 'status',
                render: (text) => <>{status.getStatus(text) || <Badge status="default" text="未运行" />}</>
            },
            {
                title: '开始时间',
                dataIndex: 'startTimeMillis',
                render: (text) => <>{text ? time.getLocalTime(text) : '--'}</>
            },
            {
                title: '运行时间',
                dataIndex: 'durationMillis',
                render: (text) => <>{time.formatDate(text)}</>
            },
            {
                title: '结束时间',
                dataIndex: 'endTimeMillis',
                render: (text) => <>{text ? time.getLocalTime(text) : '--'}</>
            }
        ],
        size: 'small',
        loading,
        dataSource,
        bordered: true,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: currentPageSize,
            onChange: (page, pageSize) => {
                setCurrentPage(page);
                setCurrentPageSize(pageSize);
            },
            current: currentPage,
            total: total,
            showTotal: () => `共 ${total} 条`
        }
    };

    return (
        <>
            <Button type="link" icon={<ProfileOutlined />} onClick={() => showVisible()}>
                执行记录
            </Button>
            <Modal width={1080} open={visible} onCancel={cancel} title="执行记录" footer={null}>
                <Table {...tableParm} />
            </Modal>
        </>
    );
}
