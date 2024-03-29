package com.example.youxchallenge.dto.client;

import com.example.youxchallenge.model.Client;

public record ClientResponseDTO(
        Long id,
        String name,
        String cnpj,
        String uf,
        String phone,
        String email,
        double latitude,
        double longitude,
        Long personId) {

    public ClientResponseDTO(Client client) {
        this(client.getId(), client.getName(), client.getCnpj(), client.getUf(), client.getPhone(), client.getEmail(),
                client.getLatitude(), client.getLongitude(), client.getPerson().getId());
    }
}
