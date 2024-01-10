package org.sid.msclient.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ClientResponse {

    private Long id;
    private String fullName;
    private String cin;
    private String phoneNumber;

}
