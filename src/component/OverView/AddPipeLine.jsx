/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, Button, Form, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { addPipeLine } from '../api/api';
import styles from './index.less';
import config from './config';

const { Option } = Select;
const { TextArea } = Input;

export default function AddPipeLine(props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [children, setChildren] = useState([]);
    const { modal1Data } = config(props);

    function linkToPipeLine() {
        setVisible(true);
    }

    function cancel() {
        setVisible(false);
        setChildren([]);
        form.resetFields();
    }

    function changeSelect(e) {
        if (e === '1') {
            setChildren(modal1Data);
        }
    }

    async function submit() {
        const values = await form.getFieldValue();

        if (values) {
            setLoading(true);
            const resp = await addPipeLine(values);
            setLoading(false);

            if (resp) {
                Modal.success({
                    title: '创建成功',
                    content: '是否跳转到流水线详情',
                    onOk: () => {
                        navigate('/detail?name=' + values.pipelineName);
                    },
                    okText: '跳转',
                    closable: true
                });
                props.getPipeLineList();
                cancel();
            }
        }
    }

    return (
        <>
            <Button className={styles['add-pipeline']} type={'primary'} onClick={() => linkToPipeLine()}>
                {'新增流水线'}
            </Button>

            <Modal
                open={visible}
                onCancel={cancel}
                title="新增流水线"
                onOk={submit}
                form={form}
                confirmLoading={loading}
                okText="确认"
                cancelText="取消"
            >
                <Form form={form}>
                    <Form.Item name="pipelineName" label="名称" rules={[{ required: true }]}>
                        <Input autoComplete={'off'} />
                    </Form.Item>
                    {/* <Form.Item name="pipelineLable" label="别名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="pipelineTemplate" label="模版" rules={[{ required: true }]}>
                        <Select placeholder="请选择" allowClear onChange={changeSelect}>
                            <Option value="1" >模版1</Option>
                        </Select>
                    </Form.Item>

                    {children.map((item, index) => {
                        const inputType =
                        item.type === 'input' ? <Input autoComplete={'off'} /> : <TextArea rows={3} />;

                        return (
                            <Form.Item key={index} name={item.name} label={item.label} rules={[{ required: true }]}>
                                {inputType}
                            </Form.Item>
                        );
                    })}
                </Form>
            </Modal>
        </>
    );
}
