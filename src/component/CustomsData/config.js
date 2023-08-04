/* eslint-disable prettier/prettier */
function customsConfig() {
    return {
        columns: [
            {
                title: '产品描述',
                dataIndex: 'describe',
                key: 'describe'
            }, {
                title: '采购商',
                dataIndex: 'purchasingAgent',
                key: 'purchasingAgent'
            }, {
                title: '供应商',
                dataIndex: 'provider',
                key: 'provider'
            }
        ]
    };
}

export { customsConfig };
