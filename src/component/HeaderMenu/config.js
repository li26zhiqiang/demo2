import React, { useContext } from 'react';
import { HomeOutlined, AppstoreOutlined, LaptopOutlined, AimOutlined } from '@ant-design/icons';
import commonContext from '../../utils/commonContext';

export default function config() {
    const myPipeline = {
        title: '我的流水线',
        key: 'mypipeline'
    };

    const pipelineMarket = {
        title: '流水线市场',
        key: 'pipelinemarket'
    };

    const pipelineSchool = {
        title: '流水线学堂',
        key: 'pipelineschool'
    };

    const trialManufacturePipeline = {
        title: '流水线试制',
        key: 'trialmanufacturepipeline'
    };

    const menu = [
        {
            key: 'mypipeline',
            label: '我的流水线',
            icon: <HomeOutlined />,
            name: 'myPipeline',
            children: [
                {
                    key: 'overview',
                    label: '拉新流水线',
                    name: 'overview',
                    breadcrumb: [
                        myPipeline,
                        {
                            title: '拉新流水线',
                            key: 'pipelinename'
                        }
                    ]
                },
                {
                    key: 'promotionpipeline',
                    label: '热促流水线',
                    name: 'promotionPipeline',
                    breadcrumb: [
                        myPipeline,
                        {
                            title: '热促流水线',
                            key: 'promotionpipeline'
                        }
                    ]
                },
                {
                    key: 'businesspipeline',
                    label: '商谈流水线',
                    name: 'businessPipeline',
                    breadcrumb: [
                        myPipeline,
                        {
                            title: '商谈流水线',
                            key: 'businesspipeline'
                        }
                    ]
                },
                {
                    key: 'discoverpipeline',
                    label: '挖客流水线',
                    name: 'discoverPipeline',
                    breadcrumb: [
                        myPipeline,
                        {
                            title: '挖客流水线',
                            key: 'discoverpipeline'
                        }
                    ]
                }
            ]
        },
        {
            key: 'pipelinemarket',
            label: '流水线市场',
            name: 'pipelineMarket',
            icon: <AppstoreOutlined />,
            children: [
                {
                    key: 'fbpipeline',
                    label: 'FB拉新流水线',
                    name: 'FBPipeline',
                    breadcrumb: [
                        pipelineMarket,
                        {
                            title: 'FB拉新流水线',
                            key: 'fbpipeline'
                        }
                    ]
                },
                {
                    key: 'internationalpipeline',
                    label: '国际站运营流水线',
                    name: 'internationalPipeline',
                    breadcrumb: [
                        pipelineMarket,
                        {
                            title: '国际站运营流水线',
                            key: 'internationalpipeline'
                        }
                    ]
                },
                {
                    key: 'tradeanalysepipeline',
                    label: '外贸分析流水线',
                    name: 'tradeAnalysePipeline',
                    breadcrumb: [
                        pipelineMarket,
                        {
                            title: '外贸分析流水线',
                            key: 'tradeanalysepipeline'
                        }
                    ]
                }
            ]
        },
        {
            key: 'pipelineschool',
            label: '流水线学堂',
            name: 'pipelineSchool',
            icon: <LaptopOutlined />,
            children: [
                {
                    key: 'practice',
                    label: '优秀实践',
                    name: 'practice',
                    breadcrumb: [
                        pipelineSchool,
                        {
                            title: '优秀实践',
                            key: 'practice'
                        }
                    ]
                },
                {
                    key: 'dailylesson',
                    label: '每日一课',
                    name: 'dailyLesson',
                    breadcrumb: [
                        pipelineSchool,
                        {
                            title: '每日一课',
                            key: 'dailylesson'
                        }
                    ]
                },
                {
                    key: 'experienceforum',
                    label: '心得论坛',
                    name: 'experienceForum',
                    breadcrumb: [
                        pipelineSchool,
                        {
                            title: '心得论坛',
                            key: 'experienceforum'
                        }
                    ]
                }
            ]
        },
        {
            key: 'trialmanufacturepipeline',
            label: '流水线试制',
            name: 'trialManufacturePipeline',
            icon: <AimOutlined />,
            children: [
                {
                    key: 'taskarrange',
                    label: '试验编排',
                    name: 'taskArrange',
                    breadcrumb: [
                        trialManufacturePipeline,
                        {
                            title: '试验编排',
                            key: 'taskarrange'
                        }
                    ]
                },
                {
                    key: 'myshare',
                    label: '我的分享',
                    name: 'myShare',
                    breadcrumb: [
                        trialManufacturePipeline,
                        {
                            title: '我的分享',
                            key: 'myshare'
                        }
                    ]
                }
            ]
        }
    ];

    return {
        menu: checkoutMenu(menu)
    };
}

function checkoutMenu(menu) {
    const consumer = useContext(commonContext);
    const consumerKeyList = consumer.map((item) => item.name);

    const menuArr = menu.filter((item) => {
        if (consumerKeyList.includes(item.name)) {
            if (item.children) {
                item.children = item.children.filter((child) => {
                    return consumerKeyList.includes(child.name);
                });
            }

            return true;
        }
        return false;
    });

    return menuArr;
}
