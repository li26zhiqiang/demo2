/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Layout, Menu, Row, theme, Card } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import BreadcrumbComp from './BreadcrumbComp';
import config from './config';
import styles from './index.less';

const { Content, Sider } = Layout;

export default function HeaderMenu() {
    const { menu } = config({ linkToPage: (path) => linkToPage(path) });
    const [collapsed, setCollapsed] = useState(false);
    const [menuTitle, setMenuTitle] = useState(true);
    const [openKeys, setOpenKeys] = useState(getOpenKeys());
    const navigate = useNavigate();

    function linkToPage(path) {
        navigate(path);
    }

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    function getOpenKeys() {
        try {
            const { pathname } = useLocation();
            const pathKey = pathname.split('/')[1] || 'mypipeline';

            return [pathKey];
        } catch (err) {
            return ['myPipeline'];
        }
    }

    function onSelect({ keyPath}) {
        const path = keyPath.reverse();
        navigate(`/${path.join('/')}`);
    }

    function getSelectedKeys() {
        try {
            const { pathname } = useLocation();
            const selectList = pathname.split('/');

            return selectList[selectList.length - 1] || 'overview';
        } catch (err) {
            return 'overview';
        }
    }

    function onOpenChange(openKeyList) {
        if (openKeyList.length === 0) {
            setOpenKeys([]);
        } else {
            setOpenKeys([openKeyList[openKeyList.length - 1]]);
        }
    }

    const selectedKeys = getSelectedKeys();

    return (
        <Layout>
            <Content>
                <Layout className={styles['menu-layout']} style={{ background: '#ebeef5' }}>
                    <Sider
                        style={{ background: colorBgContainer }}
                        collapsible={true}
                        onCollapse={(value) => {
                            setMenuTitle(!value);
                            setCollapsed(value);
                        }}
                        collapsedWidth={36}
                        width={200}
                        collapsed={collapsed}
                        className={styles['menu-sider']}
                    >
                        <div style={{
                            paddingInline: `calc(13% + ${menuTitle ? '0px': '4px'})`
                        }} className={styles['menu-logo-vertical']}>
                            <GlobalOutlined style={{ display: 'inline-block' }} />
                            <span
                                style={{ display: menuTitle ? 'inline-block': 'none' }}
                                className={styles['menu-title-vertical']}>无人流水线</span>
                        </div>
                        <Menu
                            className={styles['menu-instance']}
                            mode="inline"
                            inlineCollapsed={collapsed}
                            style={{ height: 'auto' }}
                            items={menu}
                            onSelect={onSelect}
                            openKeys={openKeys}
                            selectedKeys={selectedKeys}
                            onOpenChange={onOpenChange}
                        />
                    </Sider>


                    <div className={styles['menu-out-view']}>
                        <Row>
                            <BreadcrumbComp />
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
