package org.sid.msclient.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RoomResponse {
    private Long roomId;
    private int roomNumber;
    private int bedsNumber;
    private boolean availability;
}
