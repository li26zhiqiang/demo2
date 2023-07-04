/* eslint-disable prettier/prettier */
import React from 'react';
import { Row } from 'antd';
import Product from './Product';
import PipeLineItem from './PipeLineItem';

export default function PipeLineView(props) {
    const { pipeLineList, form, goodsInfo } = props;
    return (
        <>
            <Row>
                {pipeLineList.map((item, index) => {
                    const parm = {
                        form,
                        ...item,
                        goodsInfo
                    };
                    if (index === 0) {
                        return <Product {...parm} key={index} />;
                    } else {
                        return <PipeLineItem {...item} key={index} />;
                    }
                })}
            </Row>
        </>
    );
}
