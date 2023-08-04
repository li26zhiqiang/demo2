/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Alert, Form, Card } from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import { SyncOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Header from './Header';
import PipeLineView from './PipeLineView';
import PipeLineHeader from './SvgCompontent';
import config from './config';
import utils from '../utils/getUrlParameter';
import { getPipeLineList, getDescribe, getSince, getProductInfo, isInQueue } from '../api/api';
import styles from './index.less';
import BreadcrumbComp from '../HeaderMenu/BreadcrumbComp';

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
    let pipelineGoods = null;

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
        try {
            const parameter = {
                ...{name: pipelineName},
                ...{runId: type !== 'create' && pipelineId ? pipelineId: 0}
            };

            const resp = await getSince(parameter);
            if (resp) {
                const { displayName, building } = resp.data;

                const id = displayName ? displayName.split('#')[1] : 0;

                if (!building || checkoutIsThisPage()) {
                    clearInterval(sinceTimer);
                    sinceTimer = null;
                }
                //  获取一共有多少
                pipeLines({ id });
                setSince(id);
                setPipelineRecord(resp.data);

                if (!pipelineGoods) {
                    getProductGoods(id);
                }
            } else {
                clearInterval(sinceTimer);
                sinceTimer = null;
            }
        } catch (err) {
            clearInterval(sinceTimer);
            sinceTimer = null;
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
                    status: stageObj?.status || 'NOT_BUILT',
                    id: stageObj?.id
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
    async function getProductGoods(id) {
        const param = {
            name: pipelineName,
            runId: id
        };
        const resp = await getProductInfo(param);

        if (resp && resp.data) {
            const {goods, goodsDesc, goodsFlavor} = resp.data;

            const goodsVal = {
                goods: goods || '',
                goodsDesc: goodsDesc || '',
                goodsFlavor: goodsFlavor || ''
            };
            setGoodsInfo(goodsVal);
            pipelineGoods = true;
        }
    }

    //  判断是否当前页
    function checkoutIsThisPage() {
        return window.location.pathname !== '/console/pipeline/detail';
    }

    //  判断是否在队列中
    async function getIsInQueue({ type }) {
        try {
            const resp = await isInQueue({ name: pipelineName });

            if (resp) {
            //  如果是true表明在队列中
                if (resp.data) {
                    setIsInQueueVal(true);
                    setPipelineRecord(false);
                    setStage([]);

                    if (checkoutIsThisPage()) {
                        clearInterval(queueTimer);
                        queueTimer = null;
                    }
                } else if (!resp.data) {
                //  如果是false表明不在队列中
                    setIsInQueueVal(false);
                    clearInterval(queueTimer);
                    queueTimer = null;
                    setNewSince({ type });
                }
            } else {
                clearInterval(queueTimer);
                queueTimer = null;
            }
        } catch (err) {
            clearInterval(queueTimer);
            queueTimer = null;
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
        <>
            <BreadcrumbComp {...{ item: pipeLineBreadcrumb }}/>
            <div className={styles['pipeline-view']}>

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
                                <div
                                    className={styles['pipeline-continue-body']}
                                    style={{ width: `${pipes.length * 260}px` }}>
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
        </>

    );
}
