import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import routerConfig from './routerConfig';
import { getUserInfo } from './component/api/api';
import { Provider } from './utils/commonContext';

export default function App() {
    const [menu, setMenu] = useState([]);
    const route = routerConfig();
    const routeList = getRouterConfig(route, menu);

    const routeView = routeList.map((item, key) => {
        const parameter = {
            path: item.path,
            element: item.element,
            index: item.index
        };

        if (!item.children) {
            return <Route key={key} {...parameter}></Route>;
        }

        return (
            <Route key={key} {...parameter}>
                {item.children.map((child, childKey) => {
                    const childParameter = {
                        path: child.path,
                        element: child.element,
                        index: child.index
                    };
                    return <Route key={childKey} {...childParameter}></Route>;
                })}
            </Route>
        );
    });

    async function userInfo() {
        console.log('11111');
        const res = await getUserInfo();

        if (res && res.code === 200) {
            setMenu(res?.data?.menus || []);
        }
    }

    useEffect(() => {
        userInfo();
    }, []);

    return (
        <Provider value={menu}>
            <Routes>{routeView}</Routes>
        </Provider>
    );
}

//  过滤路由
function getRouterConfig(route, consumer) {
    const allowKeyList = consumer.map((item) => item.name);
    const arr = route
        .map((item) => {
            if (item.children) {
                item.children = item.children
                    .map((child) => {
                        if (!child.name || (child.name && allowKeyList.includes(child.name))) {
                            return child;
                        } else if (child.name && !allowKeyList.includes(child.name)) {
                            return false;
                        }

                        return false;
                    })
                    .filter((child) => child);
            }

            if (allowKeyList.includes(item.name)) {
                return item;
            }

            return false;
        })
        .filter((item) => item);

    return arr;
}
