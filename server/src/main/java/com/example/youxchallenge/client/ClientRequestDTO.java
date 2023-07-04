package com.example.youxchallenge.client;


public record ClientRequestDTO(
        String name,
        String cnpj,
        String email,
        String phone,
        String uf,
        double latitude,
        double longitude,
        Long personId
) {
};
