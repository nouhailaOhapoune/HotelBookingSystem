import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Button, Row, Col } from 'antd';

const RoomModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState(!!initialValues);

    // If initialValues are provided, set the form values for update
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                onSubmit(values, isUpdate);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            visible={visible}
            title={isUpdate ? 'Update the room' : 'Create a room'}
            onCancel={onCancel}
            onOk={handleOk}
            centered
        >
            <Form form={form} layout="vertical" name="roomForm"  style={{ textAlign: 'center', marginTop:30 }}>
                <Form.Item
                    name="roomNumber"
                    label="Room Number"
                    rules={[{ required: true, message: 'Please enter the room number' }]}
                    style={{ textAlign: 'center' }}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name="bedsNumber"
                    label="Beds Number"
                    rules={[{ required: true, message: 'Please enter the beds number' }]}
                    style={{ textAlign: 'center' }}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name="availability"
                    label="Availability"
                    valuePropName="checked"
                    initialValue={initialValues?.availability || true}
                    style={{ textAlign: 'center' }}
                >
                    <Switch checkedChildren={<span style={{ fontSize: '15px' }}>Available</span>}
                            unCheckedChildren={<span style={{ fontSize: '15px' }}>Not Available</span>}
                            style={{height:24 , width:150 }} />
                </Form.Item>
                {form.getFieldValue('availability') === false && (
                    <Form.Item
                        name="reservedForClient"
                        label="Reserved for the client"
                        rules={[{ required: true, message: 'Please enter the client name' }]}
                        style={{ textAlign: 'center' }}
                    >
                        <Input />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default RoomModal;
