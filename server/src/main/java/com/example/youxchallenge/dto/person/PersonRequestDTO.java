package com.example.youxchallenge.dto.person;

public record PersonRequestDTO(
        String name,
        String email,
        String role,
        String password)
{
};
