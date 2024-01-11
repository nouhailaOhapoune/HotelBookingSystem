import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ClientsModal = ({ visible, onCancel, onCreate, initialValues }) => {
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState(!!initialValues);

    // If initialValues are provided, set the form values for update
    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values, isUpdate);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            visible={visible}
            title={isUpdate ? 'Update Client' : 'Create Client'}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical" name="clientForm">
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter the full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="cin"
                    label="CIN"
                    rules={[{ required: true, message: 'Please enter the CIN' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClientsModal;
