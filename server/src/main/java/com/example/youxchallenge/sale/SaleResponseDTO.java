package com.example.youxchallenge.sale;

import java.util.Date;

public record SaleResponseDTO(
        Long id,
        String client,
        Long clientId,
        Date date,
        String status,
        double value) {

    public SaleResponseDTO(Sale sale) {
        this(sale.getId(), sale.getClient().getName(), sale.getClient().getId(), sale.getDate(), sale.getStatus(), sale.getValue());
    }
}

