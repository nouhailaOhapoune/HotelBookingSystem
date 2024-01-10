package org.sid.msroom.services;

import org.sid.msroom.models.ClientResponse;
import org.sid.msroom.models.RoomRequest;
import org.sid.msroom.models.RoomResponse;

import java.util.List;

public interface RoomService {
    RoomResponse addRoom(RoomRequest roomRequest);
    List<RoomResponse> getAllRooms();
    RoomResponse getOneRoom(Long id);
    RoomResponse updateRoom(Long id, RoomRequest updatedRoom);
    void deleteRoom(Long id);

    List<RoomResponse> getRoomsOfClient(Long id);
}
