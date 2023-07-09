package com.example.youxchallenge.repository;

import com.example.youxchallenge.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT c.id, c.name, c.latitude, c.longitude FROM client c")
    List<Object[]> getClientCoordinates();
}
