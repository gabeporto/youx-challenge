package com.example.youxchallenge.repository;

import com.example.youxchallenge.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("SELECT COUNT(p) > 0 FROM person p WHERE p.email = :email")
    boolean existsByEmail(String email);
}
