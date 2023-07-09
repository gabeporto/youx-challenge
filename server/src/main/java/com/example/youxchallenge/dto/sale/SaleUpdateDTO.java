package com.example.youxchallenge.dto.sale;

import java.util.Date;

public record SaleUpdateDTO(
        Long clientId,
        Date date,
        String status,
        double value
) {
}
