/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from './config';
import styles from './index.less';

export default function BreadcrumbComp() {
    const { menu } = config({ linkToPage: (path) => linkToPage(path) });
    const [overviewBreadcrumb] = useState( menu[0]?.children[0]?.breadcrumb || []);
    const navigate = useNavigate();

    function linkToPage(path) {
        navigate(path);
    }

    return <div className={styles['breadcrumb-comp']}>
        <Breadcrumb items={overviewBreadcrumb} />
    </div>;
}
