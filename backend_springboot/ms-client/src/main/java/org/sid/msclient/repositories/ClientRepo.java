package org.sid.msclient.repositories;

import org.sid.msclient.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepo extends JpaRepository<Client,Long> {

}
