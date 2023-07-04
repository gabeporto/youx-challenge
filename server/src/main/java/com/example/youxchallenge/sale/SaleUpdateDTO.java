package com.example.youxchallenge.sale;

import com.example.youxchallenge.client.Client;

import java.util.Date;

public record SaleUpdateDTO(
        Long clientId,
        Date date,
        String status,
        double value
) {
}
