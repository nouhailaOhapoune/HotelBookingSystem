import React, { useState } from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import "./Clients management.css";
import { Button, Form, Input, message, Modal } from "antd";
import ClientsTable from "./ClientsTable";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import axios from "axios";

function ClientsComponent() {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [clients, setClients] = useState([]);

    const addClient = async (clientData) => {
        try {
            const response = await axios.post('http://localhost:8090/api/client/add', clientData);
            const newClient = response.data;

            // Update the clients state with the new client
            setClients((prevClients) => [...prevClients, newClient]);

            // Close the modal and reset the form
            message.success('Client added successfully!');
            form.resetFields();
            handleCancel();
        } catch (error) {
            message.error('Failed to add client. Please try again.');
            console.error('Error adding client:', error);
        }
    };

    const showPopUp = () => {
        setModalVisible(true);
    }

    const handleCreate = () => {
        form.validateFields().then((clientData) => {
            addClient(clientData);
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    return (
        <div className="component">
            <MenuComponent />
            <div>
                <h1 className="ttt">Clients Management <TeamOutlined /></h1>
                <Button variant="dark" className="client-room-btn" onClick={showPopUp}>
                    <PlusOutlined style={{ position: "absolute", top: 13, left: 15 }} /> Add Client
                </Button>
            </div>
            <div style={{ marginTop: 100, width: 980 }} className="sd">
                <ClientsTable clients={clients} setClients={setClients} />
            </div>

            <Modal
                visible={modalVisible}
                title="Create a Client"
                onCancel={handleCancel}
                onOk={handleCreate}
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

        </div>
    );
};

export default ClientsComponent;
