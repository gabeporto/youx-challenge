package com.example.youxchallenge.client;

public record ClientUpdateDTO(
        String name,
        String cnpj,
        String uf,
        String phone,
        String email,
        double latitude,
        double longitude
) {};

