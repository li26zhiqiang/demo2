/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Card, Form, Input } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

export default function Product(props) {
    const { itemList, form, goodsInfo } = props;

    useEffect(() => {
        form.setFieldsValue({
            ...goodsInfo
        });
    }, [goodsInfo]);

    return (
        <>
            <Card hoverable bordered={false} className={styles['pipeline-product-view']}>
                <Form form={form} layout="vertical">
                    {itemList.map((item, index) => {
                        const inputType = item.type === 'input' ? <Input autoComplete={'off'} /> : <TextArea rows={3} />;

                        return (
                            <Form.Item key={index} name={item.name} label={item.label} rules={[{ required: true }]}>
                                {inputType}
                            </Form.Item>
                        );
                    })}
                </Form>
            </Card>
        </>
    );
}
