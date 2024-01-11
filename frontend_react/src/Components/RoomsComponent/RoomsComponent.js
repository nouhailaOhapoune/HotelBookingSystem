import React, {useState} from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import "../ClientsComponent/Clients management.css";
import {Button} from "antd";
import ClientModal from "../ClientsComponent/ClientsModal";
import RoomsTable from "./RoomsTable";
import RoomsModal from "./RoomsModal";
import {HomeOutlined, PlusOutlined} from "@ant-design/icons";

function RoomsComponent() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleCreate = () => {
        setModalMode('create');
        setSelectedRoom(null);
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
                <h1 className="ttt">Rooms Management <HomeOutlined /></h1>
                <Button variant="dark" className="client-room-btn" onClick={handleCreate}>
                    <PlusOutlined style={{position:"absolute",top:13,left:15}}/> Add room
                </Button>
            </div>
            <div style={{marginTop:100 , width:980}} className="sd">
                <RoomsTable/>
            </div>

            <RoomsModal
                visible={modalVisible}
                onCancel={handleCancel}
                onSubmit={Create}
                initialValues={selectedRoom}
                mode={modalMode}
            />

        </div>
    );
}

export default RoomsComponent;