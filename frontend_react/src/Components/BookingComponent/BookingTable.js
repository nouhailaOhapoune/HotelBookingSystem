import React, {useEffect, useState} from 'react';
import {Popconfirm, Space, Table} from 'antd';
import "../ClientsComponent/Clients management.css";


function BookingTable () {


    const columns = [
        {
            title: 'Room number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
        },
        {
            title: 'Full name of the client',
            dataIndex: 'fullName',
            key: 'fullName',
        },
    ];

    const booking = [
        {
            key: '1',
            roomNumber: 11,
            fullName: 'John Brown'

        },
        {
            key: '2',
            roomNumber: 11,
            fullName: 'Jim Green'

        },
        {
            key: '3',
            roomNumber: 11,
            fullName: 'Jim Green'
        },
    ];

    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black',color:"white",textAlign:"center" }}>{props.children}</th>,
        },
    };

    return(
        <>
            <Table columns={columns} dataSource={booking} components={components}/>
        </>
    );
}
export default BookingTable;