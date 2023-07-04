/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Alert, Form, Card } from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import { SyncOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Header from './Header';
import PipeLineView from './PipeLineView';
import PipeLineHeader from './SvgCompontent';
import config from './config';
import utils from '../utils/getUrlParameter';
import { getPipeLineList, getDescribe, getSince, getProductInfo, isInQueue } from '../api/api';
import styles from './index.less';

export default function PipeLine() {
    const { product, pipeLineBreadcrumb } = config();
    const [form] = Form.useForm();
    const pipelineName = utils.getPipelineName();
    const pipelineId = utils.getPipelineId();
    const [stage, setStage] = useState([]);
    const [pipeLineList, setPipelineList] = useState([]);
    const [since, setSince] = useState(null);
    const [goodsInfo, setGoodsInfo] = useState({});
    const [pipelineRecord, setPipelineRecord] = useState(false);
    const [isInQueueVal, setIsInQueueVal] = useState(false);
    let queueTimer = null;
    let sinceTimer = null;

    async function pipeLineStages() {
        const resp = await getPipeLineList({ name: pipelineName });

        if (resp) {
            setPipelineList(resp?.data);
        }
    }

    async function pipeLines({ id }) {
        const parameter = {
            name: pipelineName,
            displayName: id
        };
        if (!id) {
            return;
        }
        const resp = await getDescribe(parameter);

        if (resp) {
            setStage(resp?.data?.stages || []);
        }
    }

    //  获取since
    async function getNewSince({ type }) {
        const parameter = {
            ...{name: pipelineName},
            ...{runId: type !== 'create' && pipelineId ? pipelineId: 0}
        };

        const resp = await getSince(parameter);

        if (resp && resp?.data) {
            const { displayName, building } = resp.data;
            const id = displayName.split('#')[1];

            if (!building) {
                clearInterval(sinceTimer);
                sinceTimer = null;
            }
            //  获取一共有多少
            pipeLines({ id });
            setSince(id);
            setPipelineRecord(resp.data);
        }
    }

    function getChildrenList(itemKeyList, label, stageList) {
        const arr = itemKeyList
            .filter((item) => item.startsWith(label))
            .map((item) => {
                const title = item.split('_')[1];
                const stageObj = stageList.find((st) => st.name === item) || {};

                return {
                    children: title,
                    status: stageObj?.status || 'NOT_BUILT'
                };
            });

        return arr;
    }

    function getStageTime({ time, item, key }) {
        let resultTime = time;

        if (item[key] && Array.isArray(item[key])) {
            const itemKeyList = item[key];
            itemKeyList.forEach((itemKey) => {
                const step = stage.find((obj) => obj.name === itemKey) || {};
                resultTime += (step.durationMillis || 0);
            });

            return resultTime;
        }
    }

    function getItemList({ item, key }) {
        let arr = [];

        if (item[key] && Array.isArray(item[key])) {
            const itemKeyList = item[key];

            itemKeyList.forEach((e) => {
                const label = e.split('_')[0];
                arr.push(label);
            });

            const itemList = [...new Set(arr)];

            return itemList.map((e) => {
                return {
                    label: e,
                    value: getChildrenList(itemKeyList, e, stage)
                };
            });
        }

        return [];
    }

    function assemblyParameter() {
        if (pipeLineList.length === 0) {
            return [];
        }
        return [
            product,
            ...pipeLineList.map((item) => {
                let pipeLineStage = {};
                const keys = Object.keys(item);

                keys.forEach((key) => {
                    const stVal = stage.find((st) => st.name === key);

                    pipeLineStage = {
                        label: key,
                        status: stVal?.status || 'NOT_BUILT',
                        time: getStageTime({ time: stVal?.durationMillis || 0, item, key }),
                        itemList: getItemList({ item, key })
                    };
                });

                return pipeLineStage;
            })
        ];
    }

    //  获取product 商品，规格，描述
    async function getProductGoods() {
        const param = {
            name: pipelineName
        };
        const resp = await getProductInfo(param);

        if (resp && resp.data && resp.data.length > 0) {
            const {goods, goodsDesc, goodsFlavor} = resp.data[0];

            const goodsVal = {
                goods: goods || '',
                goodsDesc: goodsDesc || '',
                goodsFlavor: goodsFlavor || ''
            };
            setGoodsInfo(goodsVal);
        }
    }

    //  判断是否在队列中
    async function getIsInQueue({ type }) {
        const resp = await isInQueue({ name: pipelineName });

        if (resp) {
            //  如果是true表明在队列中
            if (resp.data) {
                setIsInQueueVal(true);
                setPipelineRecord(false);
                setStage([]);
            } else if (!resp.data) {
                //  如果是false表明不在队列中
                setIsInQueueVal(false);
                clearInterval(queueTimer);
                setNewSince({ type });
            }
        }
    }

    function setNewSince({ type }) {
        getNewSince({ type });
        sinceTimer = setInterval(() => getNewSince({ type }), 3000);
    }

    function checkoutIsInQueue({ type }) {
        getIsInQueue({ type });
        queueTimer = setInterval(() => getIsInQueue({ type }), 3000);
    }

    useEffect(() => {
        checkoutIsInQueue({type: 'query'});
        pipeLineStages();
        getProductGoods();

        return () => {
            clearInterval(sinceTimer);
            clearInterval(queueTimer);
        };
    }, []);

    const pipes = assemblyParameter();

    const parameter = {
        pipeLineList: pipes,
        getNewSince: ({ type }) => setNewSince({ type }),
        checkoutIsInQueue: () => checkoutIsInQueue({ type: 'create' }),
        form,
        stage,
        since,
        goodsInfo,
        pipelineRecord,
        isInQueueVal
    };

    return (
        <div className={styles['pipeline-view']}>
            <Breadcrumb items={pipeLineBreadcrumb} className={styles['pipeline-breadcrumb']}/>
            <Card style={{ height: '100%' }}>
                <div className={styles['pipeline-continue-view']}>
                    <Header {...parameter} />
                    {isInQueueVal && <Alert
                        message={'当前任务正在排队中，请等待...'}
                        type="info"
                        icon={isInQueueVal ? <SyncOutlined spin />: <InfoCircleOutlined />}
                        showIcon
                    />
                    }
                    {pipes.length > 0 ? (
                        <div className={styles['pipeline-continue-body-view']}>
                            <div className={styles['pipeline-continue-body']} style={{ width: `${pipes.length * 260}px` }}>
                                <PipeLineHeader {...parameter} />
                                <PipeLineView {...parameter} />
                            </div>
                        </div>
                    ) : (
                        <ProSkeleton type={'descriptions'} active list={2} />
                    )}
                </div>
            </Card>
        </div>
    );
}
