package com.example.youxchallenge.repository;

import com.example.youxchallenge.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("SELECT COUNT(p) > 0 FROM person p WHERE p.email = :email")
    boolean existsByEmail(String email);

    @Query("SELECT p FROM person p WHERE p.email = :email")
    Optional<Person> findByEmail(@Param("email") String email);
}
