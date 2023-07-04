/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import config from './config';
import Header from './Header';

const { Content, Sider } = Layout;

export default function HeaderMenu() {
    const { menu } = config();

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu theme="dark" items={[{ label: 'PipeLine', key: '1' }]} />
            </Header>

            <Content>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        width: '100%',
                        overflow: 'auto'
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer
                        }}
                        width={200}
                    >
                        <Menu mode="inline" style={{ height: '100%' }} items={menu} />
                    </Sider>
                    <Content style={{ padding: '0 16px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}
