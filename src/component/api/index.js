import { cloneDeep } from 'lodash';
import { message } from 'antd';
import querystring from 'querystring';

async function fetchPipeLineView({ url, method, parameter }) {
    let requestUrl = cloneDeep(url);
    let bodyParm = getBody(parameter);

    let fetchParameter = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method !== 'GET') {
        const { replaceUrl, replaceParm } = replaceParam(requestUrl, bodyParm);
        requestUrl = replaceUrl;
        bodyParm = replaceParm;
        fetchParameter.body = JSON.stringify(bodyParm);
    } else {
        requestUrl = getRequestUrl(requestUrl, bodyParm);
    }

    return await fetch(`${requestUrl}`, {
        ...fetchParameter
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return new Error('请求错误');
            }
        })
        .then((json) => {
            if (json.code === 200 || json.code === 0) {
                return json;
            } else {
                throw new Error(json.msg || json.message || '服务器内部错误');
            }
        })
        .catch((error) => {
            message.error(error.message);
            return;
        });
}

function getBody(parameter) {
    if (parameter && parameter instanceof Object) {
        return {
            ...parameter,
            userName: 'yoke'
        };
    }
    return {};
}

// 替换参数
function replaceParam(url, parameter) {
    const urlParm = cloneDeep(parameter);
    let requestUrl = cloneDeep(url);
    const urlArray = requestUrl.match(/{(.*?)}/g);

    if (urlArray) {
        const array = urlArray.map((param) => param.substring(1, param.length - 1));

        // 使用正则表达式，循环替换占位符数据
        for (let i = 0; i < array.length; i++) {
            if (requestUrl.includes(`{${array[i]}}`)) {
                requestUrl = requestUrl.replace(new RegExp('\\{' + array[i] + '\\}', 'g'), urlParm[array[i]]);
                delete urlParm[array[i]];
            }
        }
    }

    return { replaceUrl: requestUrl, replaceParm: urlParm };
}

function getRequestUrl(url, parameter) {
    const { replaceUrl, replaceParm } = replaceParam(url, parameter);

    return `${replaceUrl}?${querystring.stringify(replaceParm)}`;
}

export default { fetchPipeLineView };
