import React, {useState} from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import "./Clients management.css";
import {Button, Form, message} from "antd";
import ClientsTable from "./ClientsTable";
import ClientModal from "./ClientsModal";
import {PlusOutlined, TeamOutlined} from "@ant-design/icons";
import axios from "axios";

function ClientsComponent(){
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
    const [selectedClient, setSelectedClient] = useState(null);

    const addClient = async (clientData) => {
        // Make a POST request to add a new employee
        axios.post('http://localhost:8080/api/client/add',clientData)
            .then((response) => {
                message.success('Employee added successfully!');
                form.resetFields();
                handleCancel();
            })
            .catch((error) => {
                message.error('Failed to add client. Please try again.');
                console.error('Error adding client:', error);
            });
    };
    const handleCreate = () => {
        setModalMode('create');
        setSelectedClient(null);
        form.validateFields().then((clientData) => {
            addClient(clientData);
        });
    }
    const Create = (values) => {
        // Handle create or update logic here based on modalMode
        console.log('Form values:', values);
        // You can make API calls, update state, etc.
        setModalVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    return (
        <div className="component">
            <MenuComponent/>
            <div>
                <h1 className="ttt">Clients Management <TeamOutlined /></h1>
                <Button variant="dark" className="client-room-btn" onClick={handleCreate}>
                    <PlusOutlined style={{position:"absolute",top:13,left:15}}/> Add Client
                </Button>
            </div>
            <div style={{marginTop:100 , width:980}} className="sd">
                <ClientsTable/>
            </div>

            <ClientModal
                visible={modalVisible}
                onCancel={handleCancel}
                onCreate={Create}
                initialValues={selectedClient}
                mode={modalMode}
            />

        </div>
    );
};

export default ClientsComponent;