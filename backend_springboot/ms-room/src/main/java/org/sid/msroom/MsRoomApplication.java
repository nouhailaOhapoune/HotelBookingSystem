package org.sid.msroom;

import org.sid.msroom.entities.Room;
import org.sid.msroom.repositories.RoomRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
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
    CommandLineRunner commandLineRunner(RoomRepo roomRepo){
        return args -> {
            Set<Integer> usedRoomNumbers = new HashSet<>();

            for(int i=1;i<=15; i++){
                Random random = new Random();
                int indexRoomNumber = random.nextInt(1, 30);
                do {
                    indexRoomNumber = random.nextInt(1, 30);
                } while (usedRoomNumbers.contains(indexRoomNumber));
                usedRoomNumbers.add(indexRoomNumber);

                int indexBedsNumber = random.nextInt(1, 4);
                Long indexClientId = (long) random.nextInt(1, 15);
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
