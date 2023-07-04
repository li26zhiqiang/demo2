const urls = {
    pipleLineView: 'http://192.168.2.160:8769/view/pipeline/job',
    addPipeLine: 'http://192.168.2.160:8769/view/pipeline/createItem',
    deletePipeLine: 'http://192.168.2.160:8769/view/pipeline/doDelete',
    runPipeline: 'http://192.168.2.160:8769/view/pipeline/job/{name}/build',
    getPipeLineList: 'http://192.168.2.160:8769/view/pipeline/job/{name}/stage',
    getPipeLineStage: 'http://192.168.2.160:8769/view/pipeline/job/{name}/runs',
    // getSince: 'http://192.168.2.160:8769/view/pipeline/job/{name}/lastBuild',
    getSince: 'http://192.168.2.160:8769/view/pipeline/job/{name}/build',
    getDescribe: 'http://192.168.2.160:8769/view/pipeline/job/{name}/{displayName}/describe',
    pipelineInfo: 'http://192.168.2.160:8769/view/pipeline/info',
    getProductInfo: 'http://192.168.2.160:8769/view/pipeline/job/{name}/goods',
    getRunningLog: 'http://192.168.2.160:8769/view/pipeline/job/{name}/runs',
    stopPipeLine: 'http://192.168.2.160:8769/view/pipeline/job/{name}/{runId}/stopBuild',
    stopLastBuild: 'http://192.168.2.160:8769/view/pipeline/job/{name}/stopLastBuild',
    queue: 'http://192.168.2.160:8769/view/pipeline/job/{name}/queue/isInQueue'

    // pipleLineView: "/view/pipeline/job",
    // addPipeLine: "/view/pipeline/createItem",
    // deletePipeLine: "/view/pipeline/doDelete"
};

export default urls;
