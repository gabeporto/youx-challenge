package com.example.youxchallenge.dto.client;


public record ClientUpdateDTO(
        String name,
        String cnpj,
        String uf,
        String phone,
        String email,
        double latitude,
        double longitude,

        Long personId
) {};

