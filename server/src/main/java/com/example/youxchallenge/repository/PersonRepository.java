package com.example.youxchallenge.repository;

import com.example.youxchallenge.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
