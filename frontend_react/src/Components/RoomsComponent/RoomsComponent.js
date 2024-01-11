import React, {useState} from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import "../ClientsComponent/Clients management.css";
import {Button, Form, Input, InputNumber, message, Modal, Switch} from "antd";
import RoomsTable from "./RoomsTable";
import {HomeOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";

function RoomsComponent() {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
    const [rooms, setRooms] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);

    const addRoom = async (roomData) => {
        try {
            const response = await axios.post('http://localhost:8081/api/room/add', roomData);
            const newRoom = response.data;

            // Update the clients state with the new client
            setRooms((prevRooms) => [...prevRooms, newRoom]);

            // Close the modal and reset the form
            message.success('Room added successfully!');
            form.resetFields();
            handleCancel();
        } catch (error) {
            message.error('Failed to add room. Please try again.');
            console.error('Error adding room:', error);
        }
    };

    const showPopUp = () => {
        setModalVisible(true);
    }

    const handleCreate = () => {
        form.validateFields().then((roomData) => {
            addRoom(roomData);
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };
    const handleSwitchChange = (isAvailable) => {
        setIsAvailable(isAvailable);
    };



    return (
        <div className="component">
            <MenuComponent/>
            <div>
                <h1 className="ttt">Rooms Management <HomeOutlined /></h1>
                <Button variant="dark" className="client-room-btn" onClick={showPopUp}>
                    <PlusOutlined style={{position:"absolute",top:13,left:15}}/> Add room
                </Button>
            </div>
            <div style={{marginTop:100 , width:980}} className="sd">
                <RoomsTable/>
            </div>

            <Modal
                visible={modalVisible}
                title="Create a Room"
                onCancel={handleCancel}
                onOk={handleCreate}
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
                        initialValue={true}
                        style={{ textAlign: 'center' }}
                    >
                        <Switch
                            checked={isAvailable}
                            checkedChildren={<span style={{ fontSize: '15px' }}>Available</span>}
                            unCheckedChildren={<span style={{ fontSize: '15px' }}>Not Available</span>}
                            onChange={handleSwitchChange}
                            style={{ height: 24, width: 150 }}
                        />
                    </Form.Item>
                    {!isAvailable && (
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
        </div>
    );
}

export default RoomsComponent;