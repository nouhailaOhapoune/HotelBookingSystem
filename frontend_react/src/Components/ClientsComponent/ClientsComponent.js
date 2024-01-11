import React, {useState} from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import "./Clients management.css";
import {Button} from "antd";
import ClientsTable from "./ClientsTable";
import ClientModal from "./ClientsModal";
import {PlusOutlined, TeamOutlined} from "@ant-design/icons";

function ClientsComponent(){
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
    const [selectedClient, setSelectedClient] = useState(null);

    const handleCreate = () => {
        setModalMode('create');
        setSelectedClient(null);
        setModalVisible(true);
    }
    const Create = (values) => {
        // Handle create or update logic here based on modalMode
        console.log('Form values:', values);
        // You can make API calls, update state, etc.
        setModalVisible(false);
    };

    const handleCancel = () => {
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