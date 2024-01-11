package org.sid.msclient.service;

import org.sid.msclient.entities.Client;
import org.sid.msclient.models.ClientRequest;
import org.sid.msclient.models.ClientResponse;
import org.sid.msclient.models.ClientResponseWithRooms;

import java.util.List;

public interface ClientService {
    ClientResponse addClient(ClientRequest clientRequest);
    List<ClientResponse> getAllClients();
    ClientResponse getOneClient(Long id);
    ClientResponse updateClient(Long id, ClientRequest updatedClient);
    void deleteClient(Long id);

    ClientResponseWithRooms getOneClientWithRooms(Long id);

    List<Long> getClientIds();

    List<String> getClientsNames();
}
