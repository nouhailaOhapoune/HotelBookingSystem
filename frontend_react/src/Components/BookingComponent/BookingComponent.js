import React from 'react';
import MenuComponent from "../MenuComponent/MenuComponent";
import BookingTable from "./BookingTable";
import {ScheduleOutlined} from "@ant-design/icons";

function BookingComponent() {
    return (
        <div>
            <MenuComponent/>
            <h1 className="ttt" style={{textAlign:"center"}}><ScheduleOutlined /> Booking list </h1>
            <div style={{marginTop:100 , width:980}} className="sd">
                <BookingTable/>
            </div>
        </div>
    );
};

export default BookingComponent;