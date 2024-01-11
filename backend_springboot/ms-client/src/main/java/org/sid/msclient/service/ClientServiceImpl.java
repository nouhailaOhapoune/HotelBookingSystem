package org.sid.msclient.service;

import jakarta.persistence.EntityNotFoundException;
import org.sid.msclient.entities.Client;
import org.sid.msclient.mappers.ClientMapper;
import org.sid.msclient.models.ClientRequest;
import org.sid.msclient.models.ClientResponse;
import org.sid.msclient.models.ClientResponseWithRooms;
import org.sid.msclient.models.RoomResponse;
import org.sid.msclient.repositories.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;


@Service
public class ClientServiceImpl implements ClientService{
    @Autowired
    ClientRepo clientRepo;

    @Autowired
    ClientMapper clientMapper;

    @Autowired
    private WebClient webClient;

    @Autowired
    public ClientServiceImpl(ClientRepo clientRepo){
        this.clientRepo = clientRepo;
    }

    @Override
    public ClientResponse addClient(ClientRequest clientRequest) {
        Client client = clientMapper.fromClientRequest(clientRequest);
        clientRepo.save(client);
        return clientMapper.fromClient(client);
    }

    @Override
    public List<ClientResponse> getAllClients() {
        List<ClientResponse> clientResponses = new ArrayList<>();
        List<Client> clients = clientRepo.findAll();

        for (Client c : clients) {
            ClientResponse clientResponse = clientMapper.fromClient(c);
            clientResponses.add(clientResponse);
        }

        return clientResponses;
    }

    @Override
    public ClientResponse getOneClient(Long id) {
        Optional<Client> optionalClient = clientRepo.findById(id);
        if(optionalClient.isPresent()){
            return clientMapper.fromClient(optionalClient.get());
        }else{
            throw new EntityNotFoundException("Client with id=" + id + " is not found");
        }
    }

    @Override
    public ClientResponse updateClient(Long id, ClientRequest updatedClient) {
        Optional<Client> optionalClient = clientRepo.findById(id);

        if(optionalClient.isPresent()){
            Client existClient = optionalClient.get();
            existClient.setFullName(updatedClient.getFullName());
            existClient.setCin(updatedClient.getCin());
            existClient.setPhoneNumber(updatedClient.getPhoneNumber());

            clientRepo.save(existClient);

            return clientMapper.fromClient(existClient);

        }else{
            throw new EntityNotFoundException("Client with id=" + id + " is not found");
        }
    }

    @Override
    public void deleteClient(Long id) {
        boolean existClient = clientRepo.existsById(id);

        if(!existClient){
            throw new EntityNotFoundException("404, client with id: "+ id + " is not found");
        }
        else{
            clientRepo.deleteById(id);
        }
    }

    @Override
    public ClientResponseWithRooms getOneClientWithRooms(Long id) {
        Optional<Client> client = clientRepo.findById(id);
        if(client.isPresent()){
            Mono<RoomResponse[]> roomResponsesMono = webClient.get()
                    .uri("http://localhost:8081/api/room/rooms/client/"+id)
                    .retrieve()
                    .bodyToMono(RoomResponse[].class);

            RoomResponse[] roomResponses = roomResponsesMono.share().block();
            ClientResponseWithRooms clientResponseWithRooms = new ClientResponseWithRooms(client.get(), Arrays.asList(roomResponses));

            return clientResponseWithRooms;
        }
        else {
            throw new EntityNotFoundException("The client with id: "  +id+ " is not Found");
        }
    }
}
