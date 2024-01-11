package org.sid.msclient.models;

import lombok.Data;
import org.sid.msclient.entities.Client;

import java.util.List;

@Data
public class ClientResponseWithRooms {
    private Long id;
    private String fullName;
    private String cin;
    private String phoneNumber;
    private List<RoomResponse> roomResponses;

    public ClientResponseWithRooms(Client client, List<RoomResponse> roomResponses) {
        id = client.getId();
        fullName = client.getFullName();
        cin = client.getCin();
        phoneNumber = client.getPhoneNumber();
        this.roomResponses = roomResponses;
    }
}
