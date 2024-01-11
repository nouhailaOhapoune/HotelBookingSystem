package org.sid.msroom.mappers;

import org.sid.msroom.entities.Room;
import org.sid.msroom.models.RoomRequest;
import org.sid.msroom.models.RoomResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class RoomMapper {
    public RoomResponse fromRoom (Room room){
        RoomResponse roomResponse = new RoomResponse();
        BeanUtils.copyProperties(room, roomResponse);
        return roomResponse;
    }

    public Room fromRoomRequest(RoomRequest roomRequest){
        Room room = new Room();
        BeanUtils.copyProperties(roomRequest, room);
        return room;
    }
}
