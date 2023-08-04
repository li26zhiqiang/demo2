/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import config from './config';
import { getPipeLineView } from '../api/api';
import AddPipeLine from './AddPipeLine';

export default function OverView() {
    const { columns } = config({getPipeLineList});
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    let timer = null;

    // 校验如果表格里面没有build的数据，就不刷新表格了
    function checkoutHasBuilding(records) {
        const arr = records.filter(item => item.building);

        if (arr.length === 0 || checkoutIsThisPage()) {
            clearInterval(timer);
            timer = null;
            return;
        } else if (timer === null) {
            timer = setInterval(() => {
                getPipeLineList();
            }, 8000);
        }
    }

    // 校验是否当前页面
    function checkoutIsThisPage() {
        return window.location.pathname !== '/console/pipeline/mypipeline/overview';
    }

    async function getPipeLineList() {
        try {
            const parameter = {
                pageNum: currentPage,
                pageSize: currentPageSize
            };
            const resp = await getPipeLineView(parameter);

            if (resp) {
                checkoutHasBuilding(resp?.data?.records);
                setDataSource(resp?.data?.records || []);
                setTotal(resp?.data?.total || 0);
            } else {
                clearInterval(timer);
                timer = null;
            }
        } catch (err) {
            clearInterval(timer);
            timer = null;
        }

    }

    useEffect(() => {
        getPipeLineList();
        timer = setInterval(() => {
            getPipeLineList();
        }, 8000);

        return () => clearInterval(timer);
    }, [currentPage, currentPageSize]);

    const addParm = {
        getPipeLineList: () => getPipeLineList()
    };

    const tableParm = {
        columns,
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
            <AddPipeLine {...addParm} />
            <Table {...tableParm} />
        </>
    );
}
