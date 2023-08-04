import queryString from 'query-string';

function getPipelineName() {
    const { name } = queryString.parse(window.location.search);
    return name || '';
}

function getPipelineId() {
    const { id } = queryString.parse(window.location.search);
    return id || '';
}

function getRouter() {
    return queryString.parse(window.location.search);
}

export default { getPipelineName, getPipelineId, getRouter };
