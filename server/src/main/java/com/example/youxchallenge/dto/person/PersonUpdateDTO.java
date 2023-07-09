package com.example.youxchallenge.dto.person;

public record PersonUpdateDTO(
        String name,
        String email,
        String role,
        String password
) {
}
