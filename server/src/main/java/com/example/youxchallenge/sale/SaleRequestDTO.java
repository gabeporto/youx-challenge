package com.example.youxchallenge.sale;

import java.util.Date;

public record SaleRequestDTO(
        Long clientId,
        Date date,
        String status,
        double value
) {
}
