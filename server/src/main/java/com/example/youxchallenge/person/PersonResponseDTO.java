package com.example.youxchallenge.person;

import java.util.List;

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
