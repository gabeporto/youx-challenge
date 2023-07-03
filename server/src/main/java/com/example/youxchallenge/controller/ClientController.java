package com.example.youxchallenge.controller;

import com.example.youxchallenge.client.Client;
import com.example.youxchallenge.client.ClientRequestDTO;
import com.example.youxchallenge.client.ClientResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import com.example.youxchallenge.client.ClientRepository;

import java.util.List;

@RestController
@RequestMapping("client")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void addClient(@RequestBody ClientRequestDTO data) {
        Client client = new Client(data);
        clientRepository.save(client);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ClientResponseDTO> getAllClients() {

        List<ClientResponseDTO> clientList = clientRepository.findAll().stream().map(ClientResponseDTO::new).toList();
        return clientList;
    }
}
