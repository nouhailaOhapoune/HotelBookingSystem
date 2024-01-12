import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import Button from 'react-bootstrap/Button';
import "./Clients management.css";
import axios from "axios";

function ClientsTable({ clients, setClients }) {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('update');
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        // Fetch clients data from the backend API using Axios
        fetchClients().then(r => 'ERROR!');
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/client/allclients");
            const data = response.data; // Assuming the API response has the list of clients in the 'data' property
            setClients(data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const handleUpdate = async (values) => {
        try {
            // Make a POST request to update the client data
            await axios.post(`http://localhost:8090/api/client/update/${selectedClient.id}`, values);
            message.success('Client updated successfully!');
            // After handling create/update logic, close the modal
            setModalVisible(false);
            // Fetch updated clients data
            fetchClients();
        } catch (error) {
            console.error('Error updating client:', error);
            message.error('Failed to update client. Please try again.');
        }
    };


    const showUpdateModal = (record) => {
        setModalMode('update');
        setSelectedClient(record);
        setModalVisible(true);
        // Set initial form values
        form.setFieldsValue(record);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to the backend to delete the client
            await axios.delete(`http://localhost:8090/api/client/delete/${id}`);

            // Update the clients state by removing the deleted client
            setClients((prevClients) => prevClients.filter((client) => client.id !== id));

            message.success('Client deleted successfully!');
            console.log("Deleting client with id:", id);
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };


    const columns = [
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'CIN',
            dataIndex: 'cin',
            key: 'cin',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" >
                    <Button variant="primary" onClick={() => showUpdateModal(record)}>
                        Update
                    </Button>
                    <Popconfirm
                        title={`Are you sure you want to delete ${record.fullName}?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button variant="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black', color: "white", textAlign: "center" }}>{props.children}</th>,
        },
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={clients}
                components={components}
                pagination={{ pageSize: 4 }}
            />

            <Modal
                visible={modalVisible}
                title="Update the Client"
                onCancel={handleCancel}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" name="clientForm" onFinish={handleUpdate}>
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
        </>
    );
}

export default ClientsTable;
