package org.sid.msclient.mappers;

import org.sid.msclient.entities.Client;
import org.sid.msclient.models.ClientRequest;
import org.sid.msclient.models.ClientResponse;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ClientMapper {
    public ClientResponse fromClient (Client client){
        ClientResponse clientResponse = new ClientResponse();
        BeanUtils.copyProperties(client, clientResponse);
        return clientResponse;
    }

    public Client fromClientRequest(ClientRequest clientRequest){
        Client client = new Client();
        BeanUtils.copyProperties(clientRequest,client);
        return client;
    }
}
