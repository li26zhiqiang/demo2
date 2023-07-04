/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { Button, Modal, Form } from 'antd';
import { CaretRightOutlined, SyncOutlined } from '@ant-design/icons';
import { runPipeline } from '../api/api';
import config from './config';

export default function PipeLineStart(props) {
    const { form, pipelineName, isInQueueVal, building, checkoutIsInQueue } = props;
    const { product } = config();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formItemList, setFormItemList] = useState(product?.itemList);

    function showModal() {
        try {
            form.validateFields()
                .then((values) => {
                    const arr = formItemList.map(item => {
                        item.value = values[item.name];

                        return item;
                    });
                    setFormItemList(arr);
                    setVisible(true);
                });

        } catch (err) {
            //
        }
    }

    function cancel() {
        setVisible(false);
    }

    //  提交表单
    function runningPipeline() {
        try {
            form.validateFields()
                .then(async (values) => {

                    const param = {
                        ...values,
                        name: pipelineName
                    };

                    setLoading(true);
                    const resp = await runPipeline(param);
                    setLoading(false);

                    if (resp) {
                    //  刷新流水线状态
                        checkoutIsInQueue();
                        cancel();
                    }
                });
        } catch (err) {
            //
        }

    }

    const layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    };


    return (
        <>
            <Button
                onClick={() => showModal()}
                disabled={isInQueueVal || building }
                icon={isInQueueVal || building ? <SyncOutlined spin /> : <CaretRightOutlined />}
            >
                {status ? '运行中' : '启动'}
            </Button>

            <Modal
                title="将要启动流水线，请确认"
                open={visible}
                onCancel={cancel}
                confirmLoading={loading}
                onOk={runningPipeline}
                okText="确认"
                cancelText="取消"
            >
                <Form {...layout}>

                    {formItemList.map((item) => {
                        return <Form.Item label={item.label} name={item.name} key={item.name}>
                            {item.value || '--'}
                        </Form.Item>;
                    })}
                </Form>
            </Modal>
        </>
    );
}
