package org.sid.msroom.services;

import jakarta.persistence.EntityNotFoundException;
import org.sid.msroom.entities.Room;
import org.sid.msroom.mappers.RoomMapper;
import org.sid.msroom.models.ClientResponse;
import org.sid.msroom.models.RoomRequest;
import org.sid.msroom.models.RoomResponse;
import org.sid.msroom.repositories.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    RoomRepo roomRepo;

    @Autowired
    RoomMapper roomMapper;

    @Autowired
    private WebClient webClient;

    @Autowired
    public RoomServiceImpl(RoomRepo roomRepo, WebClient webClient) {
        this.roomRepo = roomRepo;
        this.webClient = webClient;
    }
    @Override
    public RoomResponse addRoom(RoomRequest roomRequest) {
        Room room = roomMapper.fromRoomRequest(roomRequest);
        roomRepo.save(room);
        return roomMapper.fromRoom(room);
    }

    @Override
    public List<RoomResponse> getAllRooms() {
        List<RoomResponse> roomResponses = new ArrayList<>();
        List<Room> rooms = roomRepo.findAll();

        for (Room r : rooms) {
            RoomResponse roomResponse = roomMapper.fromRoom(r);
            roomResponses.add(roomResponse);
        }

        return roomResponses;
    }

    @Override
    public RoomResponse getOneRoom(Long id) {
        Optional<Room> optionalRoom = roomRepo.findById(id);
        if(optionalRoom.isPresent()){
            Room room = optionalRoom.get();

            RoomResponse roomResponse = roomMapper.fromRoom(room);

            ClientResponse clientResponse = webClient.get()
                    .uri("http://localhost:8080/api/client/"+room.getClientId())
                    .retrieve()
                    .bodyToMono(ClientResponse.class)
                    .block();

            return roomResponse;
        }else{
            throw new EntityNotFoundException("Room with id=" + id + " is not found");
        }
    }

    @Override
    public RoomResponse updateRoom(Long id, RoomRequest updatedRoom) {
        Optional<Room> optionalRoom = roomRepo.findById(id);

        if(optionalRoom.isPresent()){
            Room existRoom = optionalRoom.get();
            existRoom.setRoomNumber(updatedRoom.getRoomNumber());
            existRoom.setBedsNumber(updatedRoom.getBedsNumber());
            existRoom.setAvailability(updatedRoom.isAvailability());

            roomRepo.save(existRoom);

            return roomMapper.fromRoom(existRoom);

        }else{
            throw new EntityNotFoundException("Room with id=" + id + " is not found");
        }
    }

    @Override
    public void deleteRoom(Long id) {
        boolean existRoom = roomRepo.existsById(id);

        if(!existRoom){
            throw new EntityNotFoundException("Room with id: "+ id + " is not found");
        }
        else{
            roomRepo.deleteById(id);
        }
    }

    @Override
    public List<RoomResponse> getRoomsOfClient(Long id) {
        List<RoomResponse> roomResponses = new ArrayList<>();
        List<Room> rooms = roomRepo.findByClientId(id);
        for (Room r:rooms) {
            roomResponses.add(new RoomResponse(r));
        }
        return roomResponses;
    }

    @Override
    public List<RoomResponse> getRoomAndClient() {
        List<RoomResponse> roomResponses = new ArrayList<>();

        try {
            List<Room> rooms = roomRepo.findAll();

            for (Room room : rooms) {
                String clientFullName = null;
                try {
                    ClientResponse clientResponse = webClient.get()
                            .uri("http://springboot-msclient-container:8080/api/client/" + room.getClientId())
                            .retrieve()
                            .bodyToMono(ClientResponse.class)
                            .block();


                    if (clientResponse != null && clientResponse.getFullName() != null) {
                        clientFullName = clientResponse.getFullName();

                        RoomResponse roomResponse = RoomResponse.builder()
                                .roomId(room.getRoomId())
                                .roomNumber(room.getRoomNumber())
                                .bedsNumber(room.getBedsNumber())
                                .availability(room.isAvailability())
                                .clientFullName(clientFullName)
                                .build();

                        roomResponses.add(roomResponse);
                    }
                } catch (WebClientResponseException.NotFound ex) {
                    ex.printStackTrace();
                    clientFullName = "Client not found";
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }

        return roomResponses;
    }



}
