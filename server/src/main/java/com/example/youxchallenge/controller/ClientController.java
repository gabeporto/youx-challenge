package com.example.youxchallenge.controller;

import com.example.youxchallenge.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.youxchallenge.client.ClientRepository;

import java.util.List;

@RestController
@RequestMapping("client")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> getAllClients() {

        List<Client> clientList = clientRepository.findAll();
        System.out.println(clientList);
        return clientList;
    }
}
