package com.example.youxchallenge.person;

public record PersonUpdateDTO(
        String name,
        String email,
        String role,
        String password
) {
}
