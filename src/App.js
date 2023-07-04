import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './component/HeaderMenu/Menu';
import OverView from './component/OverView';
import PipeLine from './component/PipeLine';

export default function App() {
    const routeList = [
        {
            key: 'menu',
            path: '/',
            element: <Menu />,
            index: false,
            children: [
                {
                    key: 'overview',
                    path: null,
                    element: <OverView />,
                    index: true
                }
            ]
        },
        {
            key: 'PipeLine',
            path: '/detail',
            element: <PipeLine />,
            index: false
        }
    ];

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

    return <Routes>{routeView}</Routes>;
}
