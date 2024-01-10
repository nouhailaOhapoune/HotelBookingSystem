package org.sid.msroom.repositories;

import org.sid.msroom.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room,Long> {
    Room findByRoomId(Long roomId);
    List<Room> findByClientId(Long id);
}
