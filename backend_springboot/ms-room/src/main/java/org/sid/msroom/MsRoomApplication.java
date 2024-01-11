package org.sid.msroom;

import org.sid.msroom.entities.Room;
import org.sid.msroom.repositories.RoomRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@SpringBootApplication
public class MsRoomApplication {

    @Bean
    WebClient webClient(){
        return WebClient.builder().build();
    }

    public static void main(String[] args) {
        SpringApplication.run(MsRoomApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(RoomRepo roomRepo, WebClient webClient){
        return args -> {
            Set<Integer> usedRoomNumbers = new HashSet<>();
            Random random = new Random();

            List<Long> clientIds = webClient.get()
                    .uri("http://localhost:8080/api/client/ids")
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Long>>() {})
                    .block();

            for(int i=1;i<=15; i++){
                int indexRoomNumber = random.nextInt(1, 30);
                do {
                    indexRoomNumber = random.nextInt(1, 26);
                } while (usedRoomNumbers.contains(indexRoomNumber));
                usedRoomNumbers.add(indexRoomNumber);

                int indexBedsNumber = random.nextInt(1, 4);
                Long indexClientId = clientIds.get(random.nextInt(clientIds.size()));
                boolean isAvailable = random.nextBoolean();

                Room room = Room.builder()
                        .roomNumber(indexRoomNumber)
                        .bedsNumber(indexBedsNumber)
                        .availability(isAvailable)
                        .clientId(indexClientId)
                        .build();
                roomRepo.save(room);
            }
        };
    }

}
