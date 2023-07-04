import React from 'react';
import { Badge } from 'antd';

function getStatus(text) {
    const statusDic = {
        //  成功的状态
        SUCCESS: <Badge status="success" text="成功" />,
        //  失败状态
        ABORTED: <Badge status="error" text="终止" />,
        FAILED: <Badge status="error" text="失败" />,
        FAILURE: <Badge status="error" text="失败" />,
        CANCELLED: <Badge status="error" text="以取消" />,
        UNKNOWN: <Badge status="error" text="未知" />,
        UNSTABLE: <Badge status="error" text="不稳定" />,
        //  未运行的状态
        NOT_BUILT: <Badge status="default" text="未运行" />,
        //  正在运行的状态
        REBUILDING: <Badge status="processing" text="重新构建" />,
        IN_PROGRESS: <Badge status="processing" text="运行中" />,
        BUILDING: <Badge status="processing" text="构建中" />,

        ABORTING: <Badge status="warning" text="终止中" />
    };

    return statusDic[text] || text;
}

function paginationStatus() {
    function changePagination() {}

    return {
        onChange: changePagination,
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100]
    };
}

export default { getStatus, paginationStatus };
