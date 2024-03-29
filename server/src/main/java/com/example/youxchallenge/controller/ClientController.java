package com.example.youxchallenge.controller;

import com.example.youxchallenge.dto.client.ClientRequestDTO;
import com.example.youxchallenge.dto.client.ClientResponseDTO;
import com.example.youxchallenge.dto.client.ClientUpdateDTO;
import com.example.youxchallenge.model.Client;
import com.example.youxchallenge.model.Person;
import com.example.youxchallenge.repository.ClientRepository;
import com.example.youxchallenge.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("client")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PersonRepository personRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void addClient(@RequestBody ClientRequestDTO data) {
        Long personId = data.personId();
        Person person = personRepository.findById(personId).orElseThrow(() -> new IllegalArgumentException("Person not found"));

        Client client = new Client(data, person);
        clientRepository.save(client);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ClientResponseDTO> getAllClients(@RequestParam("id") Long id) {

        Optional<Person> person = personRepository.findById(id);

        List<ClientResponseDTO> clientList = clientRepository.findByPersonId(person.orElseThrow().getId(), Sort.by(Sort.Direction.ASC, "id"))
                .stream()
                .map(ClientResponseDTO::new)
                .toList();

        return clientList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> getClientById(@PathVariable Long id) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        if (clientOptional.isPresent()) {
            ClientResponseDTO responseDTO = new ClientResponseDTO(clientOptional.get());
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public void updateClient(@PathVariable Long id, @RequestBody ClientUpdateDTO data) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        Person person = personRepository.findById(data.personId())
                .orElseThrow(() -> new IllegalArgumentException("Person not found"));
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.updateFromDTO(data, person);
            clientRepository.save(client);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
    }
}
