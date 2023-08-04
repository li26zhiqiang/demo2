/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import Menu from './component/HeaderMenu/Menu';
import OverView from './component/OverView';
import PipeLine from './component/PipeLine';
import PromotionPipeline from './component/PromotionPipeline';
import { useNavigate } from 'react-router-dom';

export default function routerConfig() {
    function Redirect({ to }) {
        const navigate = useNavigate();

        useEffect(() => {
            navigate(to, { replace: true });
        });

        return null;
    }

    return [
        {
            key: 'menu',
            path: '',
            element: <Menu />,
            index: false,
            name: 'myPipeline',
            children: [
                {
                    key: 'redirect',
                    path: '',
                    element: <Redirect to="/mypipeline/overview" />,
                    index: true
                },
                //  拉新流水线
                {
                    key: 'overview',
                    name: 'overview',
                    path: '/mypipeline/overview',
                    element: <OverView />,
                    index: false
                },
                //  热促流水线
                {
                    key: 'promotionpipeline',
                    name: 'promotionPipeline',
                    path: '/mypipeline/promotionpipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  商谈流水线
                {
                    key: 'businesspipeline',
                    name: 'businessPipeline',
                    path: '/mypipeline/businesspipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  挖客流水线
                {
                    key: 'discoverpipeline',
                    name: 'discoverPipeline',
                    path: '/mypipeline/discoverpipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  FB拉新流水线
                {
                    key: 'FBPipeline',
                    name: 'FBPipeline',
                    path: '/pipelinemarket/FBPipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  国际站运营流水线
                {
                    key: 'internationalpipeline',
                    name: 'internationalPipeline',
                    path: '/pipelinemarket/internationalpipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  外贸分享流水线
                {
                    key: 'tradeAnalysepipeline',
                    name: 'tradeAnalysePipeline',
                    path: '/pipelinemarket/tradeAnalysepipeline',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  优秀实践
                {
                    key: 'practice',
                    name: 'practice',
                    path: '/pipelineschool/practice',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  每日一课
                {
                    key: 'dailylesson',
                    name: 'dailyLesson',
                    path: '/pipelineschool/dailylesson',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  心得论坛
                {
                    key: 'experienceforum',
                    name: 'experienceForum',
                    path: '/pipelineschool/experienceforum',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  实验编排
                {
                    key: 'taskarrange',
                    name: 'taskArrange',
                    path: '/trialManufacturePipeline/taskarrange',
                    element: <PromotionPipeline />,
                    index: false
                },
                //  我的分享
                {
                    key: 'myshare',
                    name: 'myShare',
                    path: '/trialManufacturePipeline/myshare',
                    element: <PromotionPipeline />,
                    index: false
                }
            ]
        },
        {
            key: 'PipeLine',
            path: '/detail',
            name: 'pipelineDetail',
            element: <PipeLine />,
            index: false
        }
    ];
}
