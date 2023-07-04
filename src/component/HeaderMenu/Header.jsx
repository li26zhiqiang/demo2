/* eslint-disable prettier/prettier */
import React from 'react';
import { Outlet } from 'react-router';
import { Affix } from 'antd';
import '../styles/topbar.css';

export default function Header() {
    const curUser = localStorage.getItem('curUser');

    function linkToPage(url) {
        window.location.href = url;
    }

    return (
        <>
            <Affix offsetTop={0}>
                <div className="site-topbar" id="topbar">
                    <div id="container">
                        <ul className="list1">
                            <li>
                                <a href="/">小米商城</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">MIUI</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">loT</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">云服务</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">金融</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">有品</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">小爱开发平台</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">政企服务</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">下载app</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">Select Region</a>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="/">概览</a>
                            </li>
                            <div className="clear" />
                        </ul>
                        <ul className="list2">
                            {curUser === null ? (
                                <li>
                                    <span onClick={() => linkToPage('/login')}>登录</span>
                                    <span>|</span>
                                </li>
                            ) : (
                                <li>
                                    <span onClick={() => linkToPage('/personal')}>{curUser}</span>
                                    <span>|</span>
                                </li>
                            )}
                            <li>
                                <span onClick={() => linkToPage('/register')}>注册</span>
                                <span>|</span>
                            </li>
                            <li>
                                <span onClick={() => linkToPage('/login')}>消息通知</span>
                            </li>
                            {/*<li className='cart'><Link to="/cart">购物车</Link></li>*/}
                            <li className="cart">
                                <span onClick={() => linkToPage(curUser !== null ? '/cart' : '/login')}>购物车</span>
                            </li>
                            <div className="clear" />
                        </ul>
                        <div className="clear" />
                    </div>
                </div>
            </Affix>
            <Outlet />
        </>
    );
}
