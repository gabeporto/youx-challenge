package com.example.youxchallenge.sale;

import java.util.Date;

public record SaleUpdateDTO(
        Long clientId,
        Date date,
        String status,
        double value
) {
}
