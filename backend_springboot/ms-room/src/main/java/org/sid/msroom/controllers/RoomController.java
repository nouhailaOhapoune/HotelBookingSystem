package org.sid.msroom.controllers;

import org.sid.msroom.models.ClientResponse;
import org.sid.msroom.models.RoomRequest;
import org.sid.msroom.models.RoomResponse;
import org.sid.msroom.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public RoomResponse addRoomWeb(@RequestBody RoomRequest roomRequest){
        return roomService.addRoom(roomRequest);
    }
    //----------------------------
    @GetMapping("/{id}")
    public RoomResponse getRoomWeb(@PathVariable("id") Long id){
        return roomService.getOneRoom(id);
    }
    //----------------------------
    @PostMapping("/update/{id}")
    public RoomResponse updateRoomWeb(@PathVariable("id") Long id, @RequestBody RoomRequest roomRequest) {
        return roomService.updateRoom(id, roomRequest);
    }
    //----------------------------
    @DeleteMapping("/delete/{id}")
    public void deleteRoomWeb(@PathVariable("id") Long id) {
        roomService.deleteRoom(id);
    }
    //----------------------------
    @GetMapping("/allrooms")
    public List<RoomResponse> getAllRoomsWeb(){
        return roomService.getAllRooms();
    }

    @GetMapping("/rooms/client/{id}")
    public List<RoomResponse> roomsOfClientWeb(@PathVariable("id") Long id){
        return roomService.getRoomsOfClient(id);
    }

    @GetMapping("/rooms/client")
    public List<RoomResponse> getRoomAndClientWeb(){
        return roomService.getRoomAndClient();
    }
}
