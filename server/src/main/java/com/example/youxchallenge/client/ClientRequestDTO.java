package com.example.youxchallenge.client;

import com.example.youxchallenge.person.Person;

public record ClientRequestDTO(String name, String cnpj, String email, String phone, String uf, double latitude, double longitude, Person person) {
}
