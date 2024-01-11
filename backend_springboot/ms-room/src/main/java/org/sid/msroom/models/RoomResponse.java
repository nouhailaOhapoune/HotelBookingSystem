package org.sid.msroom.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.msroom.entities.Room;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RoomResponse {
    private Long roomId;
    private int roomNumber;
    private int bedsNumber;
    private boolean availability;
    private ClientResponse clientResponse;

    public RoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.bedsNumber = room.getBedsNumber();
        this.roomNumber = room.getRoomNumber();
        this.availability = room.isAvailability();
    }

    public RoomResponse(Room room, ClientResponse clientResponse) {
        this.roomId = room.getRoomId();
        this.bedsNumber = room.getBedsNumber();
        this.roomNumber = room.getRoomNumber();
        this.availability = room.isAvailability();
        this.clientResponse = clientResponse;
    }
}
