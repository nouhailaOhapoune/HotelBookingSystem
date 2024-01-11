package org.sid.msclient.controllers;

import org.sid.msclient.models.ClientRequest;
import org.sid.msclient.models.ClientResponse;
import org.sid.msclient.models.ClientResponseWithRooms;
import org.sid.msclient.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping("/add")
    public ClientResponse addClientWeb(@RequestBody ClientRequest clientRequest){
        return clientService.addClient(clientRequest);
    }
    //----------------------------
    @GetMapping("/{id}")
    public ClientResponse getClientWeb(@PathVariable("id") Long id){
        return clientService.getOneClient(id);
    }
    //----------------------------
    @PostMapping("/update/{id}")
    public ClientResponse updateClientWeb(@PathVariable("id") Long id, @RequestBody ClientRequest clientRequest) {
        return clientService.updateClient(id, clientRequest);
    }
    //----------------------------
    @DeleteMapping("/delete/{id}")
    public void deleteClientWeb(@PathVariable("id") Long id) {
        clientService.deleteClient(id);
    }
    //----------------------------
    @GetMapping("/allclients")
    public List<ClientResponse> getAllClientsWeb(){
        return clientService.getAllClients();
    }
    //----------------------------
    @GetMapping("/rooms/{id}")
    public ClientResponseWithRooms getOneClientWithRoomsWeb(@PathVariable("id") Long id){
        return clientService.getOneClientWithRooms(id);
    }

    @GetMapping("/ids")
    public List<Long> getClientsIdsWeb(){
        return clientService.getClientIds();
    }

    @GetMapping("/names")
    public List<String> getClientsNamesWeb(){
        return clientService.getClientsNames();
    }

}
