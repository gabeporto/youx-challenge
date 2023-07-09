package com.example.youxchallenge.dto.person;

import com.example.youxchallenge.model.Person;

public record PersonResponseDTO(
        Long id,
        String name,
        String email,
        String role,
        String password
) {
    public PersonResponseDTO(Person person) {
        this(person.getId(), person.getName(), person.getEmail(), person.getRole(), person.getPassword());
    }
}
