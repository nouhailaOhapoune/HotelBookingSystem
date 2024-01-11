import React, {useEffect, useState} from 'react';
import {message, Popconfirm, Space, Table} from 'antd';
import Button from 'react-bootstrap/Button';
import "./Clients management.css";
import ClientsModal from "./ClientsModal";
import axios from "axios";


function ClientsTable () {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('update');
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients, setClients] = useState([]);

    useEffect(() => {
    // Fetch clients data from the backend API using Axios
    fetchClients().then(r => 'ERROR!');
}, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/client/allclients");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setClients(data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
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
        setSelectedClient(record);
        setModalVisible(true);
    };

    const handleDelete =async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8080/api/client/delete/${id}`);
            setClients((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );
            message.success('Employee deleted successfully!');
            console.log("Deleting employee with key:", id);
        } catch (error) {
            console.error("Error deleting employee:", error);
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
                <Button variant="primary" onClick={() => handleUpdate(record)}>
                    Update
                </Button>
                <Popconfirm
                    title={`Are you sure you want to delete ${record.fullName}?`}
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

    // ---------------Test-----------------
    const rooms = [
    {
        key: '1',
        fullName: 'John Brown',
        cin: 'BA2599',
        phoneNumber: '0936484535'
    },
    {
        key: '2',
        fullName: 'Jim Green',
        cin: 'BA2599',
        phoneNumber: '0936484535'
    },
    {
        key: '3',
        fullName: 'Joe Black',
        cin: 'BA2599',
        phoneNumber: '0936484535'
    },
];


    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black',color:"white",textAlign:"center" }}>{props.children}</th>,
        },
    };

    return(
        <>
            <Table columns={columns} dataSource={rooms} components={components} />
            <ClientsModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onCreate={Update}
                initialValues={selectedClient}
                mode={modalMode}
            />
        </>
        );
}
export default ClientsTable;