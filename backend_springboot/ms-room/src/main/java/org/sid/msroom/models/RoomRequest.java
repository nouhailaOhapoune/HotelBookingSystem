package org.sid.msroom.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RoomRequest {
    private int roomNumber;
    private int bedsNumber;
    private boolean availability;
    private Long clientId;
}
