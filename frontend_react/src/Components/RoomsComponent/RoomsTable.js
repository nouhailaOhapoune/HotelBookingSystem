import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Popconfirm, Space, Switch, Table} from 'antd';
import Button from 'react-bootstrap/Button';
import "../ClientsComponent/Clients management.css";
import RoomsModal from "./RoomsModal";
import axios from "axios";


function RoomsTable ({ rooms,setRooms}) {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('update');
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
    // Fetch rooms data from the backend API using Axios
    fetchRooms().then(r => 'ERROR!');
}, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/room/allrooms");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setRooms(data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const handleUpdate = async (values) => {
        try {
            // Make a POST request to update the client data
            await axios.post(`http://localhost:8081/api/room/update/${selectedRoom.id}`, values);
            message.success('Room updated successfully!');
            // After handling create/update logic, close the modal
            setModalVisible(false);
            // Fetch updated clients data
            fetchRooms();
        } catch (error) {
            console.error('Error updating room:', error);
            message.error('Failed to update room. Please try again.');
        }
    };

    const showUpdateModal = (record) => {
        setModalMode('update');
        setSelectedRoom(record);
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
            await axios.delete(`http://localhost:8081/api/room/delete/${id}`);

            // Update the clients state by removing the deleted client
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));

            message.success('Room deleted successfully!');
            console.log("Deleting room with id:", id);
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };



    const columns = [
        {
            title: 'Room number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
        },
        {
            title: 'number of beds',
            dataIndex: 'bedsNumber',
            key: 'bedsNumber',
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            render: (availability) => (
                <span style={{ color: availability ? 'green' : 'red' }}>
          {availability ? 'Available' : 'Not Available'}
                </span>
            ),
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
                        title={`Are you sure you want to delete the ${record.roomNumber} room?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button  variant="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black',color:"white",textAlign:"center" }}>{props.children}</th>,
        },
    };

    return(
        <>
            <Table
                columns={columns}
                dataSource={rooms}
                components={components}
                pagination={{ pageSize: 4 }}
            />
            <Modal
                visible={modalVisible}
                title="Update the Room"
                onCancel={handleCancel}
                onOk={() => form.submit()}
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
                        initialValue={selectedRoom?.availability || true}
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
        </>
    );
}
export default RoomsTable;