/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Layout, Menu, Row, theme, Card, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';
import config from './config';
import styles from './index.less';

const { Content, Sider } = Layout;

export default function HeaderMenu() {
    const { menu } = config({ linkToPage: (path) => linkToPage(path) });
    const [overviewBreadcrumb] = useState(menu[0].breadcrumb);
    const [collapsed] = useState(false);
    const navigate = useNavigate();

    function linkToPage(path) {
        navigate(path);
    }

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout>
            <Content>
                <Layout className={styles['menu-layout']} style={{ background: '#ebeef5' }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <div className={styles['menu-header-title']}>
                            工作台
                        </div>
                        <Menu mode="inline" inlineCollapsed={collapsed} style={{ height: 'auto' }} items={menu} />
                        <div className={styles['menu-fold']}>
                            <MenuFoldOutlined />
                        </div>
                    </Sider>


                    <div className={styles['menu-out-view']}>
                        <Row>
                            <Breadcrumb items={overviewBreadcrumb} />
                        </Row>
                        <div className={styles['menu-view']}>
                            <Content style={{ padding: '0 16px', minHeight: 280 }}>
                                <Card>
                                    <Outlet />
                                </Card>
                            </Content>
                        </div>
                    </div>
                </Layout>
            </Content>
        </Layout>
    );
}
