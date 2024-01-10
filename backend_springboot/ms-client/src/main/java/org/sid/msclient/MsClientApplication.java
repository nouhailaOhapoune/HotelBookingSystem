package org.sid.msclient;

import org.sid.msclient.entities.Client;
import org.sid.msclient.repositories.ClientRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@SpringBootApplication
public class MsClientApplication {

    @Bean
    WebClient webClient(){
        return WebClient.builder().build();
    }

    public static void main(String[] args) {
        SpringApplication.run(MsClientApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ClientRepo clientRepo){
        return args -> {
            ArrayList<String> listFullName = new ArrayList<>(Arrays.asList("Véronique Deschamps", "Jeremy James", "Michael Oliver", "François Melon"));
            ArrayList<String> listCin = new ArrayList<>(Arrays.asList("356P34G", "M90KZ34", "UH3G894", "45GJN6"));
            ArrayList<String> listPhoneNumber = new ArrayList<>(Arrays.asList("+1438654973", "+448874584", "+336098740", "+347997786"));

            for(int i=1;i<=10; i++){
                Random random = new Random();
                int indexFullName = random.nextInt(0,4);
                int indexCin = random.nextInt(0,4);
                int indexPhoneNumber = random.nextInt(0,4);
                Client client = Client.builder()
                        .fullName(listFullName.get(indexFullName))
                        .cin(listCin.get(indexCin))
                        .phoneNumber(listPhoneNumber.get(indexPhoneNumber))
                        .build();
                clientRepo.save(client);
            }

        };
    }
}

