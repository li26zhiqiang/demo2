const urls = {
    pipleLineView: '/tytech-pipeline/pipeline/job',
    addPipeLine: '/tytech-pipeline/pipeline/createItem',
    deletePipeLine: '/tytech-pipeline/pipeline/doDelete',
    runPipeline: '/tytech-pipeline/pipeline/job/{name}/build',
    getPipeLineList: '/tytech-pipeline/pipeline/job/{name}/stage',
    getPipeLineStage: '/tytech-pipeline/pipeline/job/{name}/runs',
    getSince: '/tytech-pipeline/pipeline/job/{name}/build',
    getDescribe: '/tytech-pipeline/pipeline/job/{name}/{displayName}/describe',
    pipelineInfo: '/tytech-pipeline/pipeline/info',
    getProductInfo: '/tytech-pipeline/pipeline/job/{name}/{runId}/goods',
    getRunningLog: '/tytech-pipeline/pipeline/job/{name}/runs',
    stopPipeLine: '/tytech-pipeline/pipeline/job/{name}/{runId}/stopBuild',
    stopLastBuild: '/tytech-pipeline/pipeline/job/{name}/stopLastBuild',
    queue: '/tytech-pipeline/pipeline/job/{name}/queue/isInQueue',
    logView: '/tytech-pipeline/pipeline/job/{name}/runs/{runId}/nodes/{stageId}/log',
    getUserInfo: '/tytech-account/account/info'
};

export default urls;
