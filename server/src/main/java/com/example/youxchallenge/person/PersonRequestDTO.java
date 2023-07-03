package com.example.youxchallenge.person;

import com.example.youxchallenge.client.Client;

import java.util.List;

public record PersonRequestDTO(
        String name,
        String email,
        String role,
        String password)
{
};
