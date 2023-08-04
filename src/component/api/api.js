import api from './index';
import urls from './urls';

function getPipeLineView(parameter) {
    const url = urls.pipleLineView;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

function addPipeLine(parameter) {
    const url = urls.addPipeLine;
    return api.fetchPipeLineView({ url, method: 'POST', parameter });
}

function deletePipeLine(parameter) {
    const url = urls.deletePipeLine;
    return api.fetchPipeLineView({ url, method: 'POST', parameter });
}

function runPipeline(parameter) {
    const url = urls.runPipeline;
    return api.fetchPipeLineView({ url, method: 'POST', parameter });
}

function getPipeLineList(parameter) {
    const url = urls.getPipeLineList;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

function getDescribe(parameter) {
    const url = urls.getDescribe;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

function getSince(parameter) {
    const url = urls.getSince;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

//  获取pipeline的一些基本信息
function pipelineInfo() {
    const url = urls.pipelineInfo;
    return api.fetchPipeLineView({ url, method: 'GET' });
}

//  获取product 商品，规格，描述
function getProductInfo(parameter) {
    const url = urls.getProductInfo;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

//  获取执行记录
function getRunningLog(parameter) {
    const url = urls.getRunningLog;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

//  暂停流水线
function stopPipeLine(parameter) {
    const url = urls.stopPipeLine;
    return api.fetchPipeLineView({ url, method: 'POST', parameter });
}

//
function stopLastBuild(parameter) {
    const url = urls.stopLastBuild;
    return api.fetchPipeLineView({ url, method: 'POST', parameter });
}

function isInQueue(parameter) {
    const url = urls.queue;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

function getLogView(parameter) {
    const url = urls.logView;
    return api.fetchPipeLineView({ url, method: 'GET', parameter });
}

//  获取用户信息和菜单
function getUserInfo() {
    const url = urls.getUserInfo;
    return api.fetchPipeLineView({ url, method: 'GET' });
}

export {
    getLogView,
    isInQueue,
    stopPipeLine,
    getRunningLog,
    getPipeLineView,
    addPipeLine,
    deletePipeLine,
    runPipeline,
    getPipeLineList,
    getDescribe,
    getSince,
    pipelineInfo,
    getProductInfo,
    stopLastBuild,
    getUserInfo
};
