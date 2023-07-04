import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import actions from './actions';
import { ROOT_PATH } from './utils/constant';
import './index.css';

let rootNode = null;

function getSubRootContainer(container) {
    return container ? container.querySelector('#root_pipeline') : document.querySelector('#root_pipeline');
}

function renderApp(props) {
    const { container } = props;
    rootNode = ReactDOM.createRoot(getSubRootContainer(container));

    console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);
    rootNode.render(
        <ConfigProvider theme={{ token: { colorPrimary: '#409EFF' } }}>
            <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/console/pipeline' : '/pipeline'}>
                <App {...props} />
            </BrowserRouter>
        </ConfigProvider>
    );
}

function render(props) {
    if (process.env.NODE_ENV === 'production') {
        if (!window.location.pathname.startsWith(ROOT_PATH)) {
            const newPath = ROOT_PATH + window.location.pathname;
            const url = window.location.href.replace(window.location.pathname, newPath);

            window.location.href = url;
        } else {
            renderApp(props);
        }
    } else {
        renderApp(props);
    }
}

function storeTest(props) {
    if (props) {
        actions.setAction(props);
        actions.onGlobalStateChange(
            (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
            true
        );
    }
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {}

export async function mount(props) {
    storeTest(props);
    render(props);
}

export async function unmount() {
    rootNode?.unmount();
    rootNode = null;
}
