package com.example.youxchallenge.dto.sale;

import com.example.youxchallenge.model.Sale;

public record SaleResponseDTO(
        Long id,
        String client,
        Long clientId,
        String date,
        String status,
        double value) {

    public SaleResponseDTO(Sale sale) {
        this(sale.getId(), sale.getClient().getName(), sale.getClient().getId(), sale.getDate().toString(), sale.getStatus(), sale.getValue());
    }
}

