import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import apiRoom from "../../Connexion/AxiosRoom";

function BookingTable() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await apiRoom.get('/rooms/client');
                console.log(response.data);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching booking data:", error);
            }
        };

        fetchBookings();
    }, []);

    const columns = [
        {
            title: 'Room number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
        },
        {
            title: 'Client full name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
    ];


    const formattedBookings = bookings.map((booking, index) => ({
        key: index,
        roomNumber: booking.roomNumber,
        fullName: booking.clientFullName || 'N/A',
    }));

    const components = {
        header: {
            cell: (props) => <th style={{ background: 'black', color: "white", textAlign: "center" }}>{props.children}</th>,
        },
    };

    return (
        <>
            <Table columns={columns} dataSource={formattedBookings} components={components} pagination={{ pageSize: 4 }}/>
        </>
    );
}

export default BookingTable;