import React, {useEffect, useState} from 'react';
import {Popconfirm, Space, Table} from 'antd';
import Button from 'react-bootstrap/Button';
import "../ClientsComponent/Clients management.css";
import ClientModal from "../ClientsComponent/ClientsModal";
import RoomsModal from "./RoomsModal";


function RoomsTable () {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('update');
    const [selectedRoom, setSelectedRoom] = useState(null);

//     useEffect(() => {
//     // Fetch rooms data from the backend API using Axios
//     fetchRooms().then(r => 'ERROR!');
// }, []);

    const fetchClients = async () => {
        // try {
        //     const response = await axios.get("http://localhost:8888/EMPLOYEE-SERVICE/employees");
        //     const data = response.data; // Assuming the API response has the list of employees in the 'data' property
        //     setRooms(data);
        // } catch (error) {
        //     console.error("Error fetching rooms:", error);
        // }
    };

    const Update = (values, isUpdate) => {
        // Handle create or update logic here
        console.log('Form values:', values);
        console.log('Is Update:', isUpdate);

        // After handling create/update logic, close the modal
        setModalVisible(false);
    };
    const handleUpdate = (record) => {
        setModalMode('update');
        setSelectedRoom(record);
        setModalVisible(true);
    };

    const handleDelete =async (id) => {
        // try {
        //     // Make a DELETE request to the backend to delete the employee
        //     await axios.delete(`http://localhost:8888/EMPLOYEE-SERVICE/employees/${id}`);
        //     setEmployees((prevDataSource) =>
        //         prevDataSource.filter((record) => record.key !== id)
        //     );
        //     message.success('Employee deleted successfully!');
        //     console.log("Deleting employee with key:", id);
        // } catch (error) {
        //     console.error("Error deleting employee:", error);
        // }
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
                    <Button variant="primary" onClick={() => handleUpdate(record)}>
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

    const clients = [
        {
            key: '1',
            roomNumber: 11,
            bedsNumber: 2,
            availability: true
        },
        {
            key: '2',
            roomNumber: 11,
            bedsNumber: 2,
            availability: false
        },
        {
            key: '3',
            roomNumber: 11,
            bedsNumber: 2,
            availability: false
        },
    ];
    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black',color:"white",textAlign:"center" }}>{props.children}</th>,
        },
    };

    return(
        <>
            <Table columns={columns} dataSource={clients} components={components}/>
            <RoomsModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSubmit={Update}
                initialValues={selectedRoom}
                mode={modalMode}
            />
        </>
    );
}
export default RoomsTable;