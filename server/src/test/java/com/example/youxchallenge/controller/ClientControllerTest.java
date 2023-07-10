package com.example.youxchallenge.controller;

import com.example.youxchallenge.controller.ClientController;
import com.example.youxchallenge.dto.client.ClientRequestDTO;
import com.example.youxchallenge.dto.client.ClientResponseDTO;
import com.example.youxchallenge.dto.client.ClientUpdateDTO;
import com.example.youxchallenge.model.Client;
import com.example.youxchallenge.model.Person;
import com.example.youxchallenge.repository.ClientRepository;
import com.example.youxchallenge.repository.PersonRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ClientControllerTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private ClientController clientController;

    public ClientControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addClient_shouldSaveClient() {
        // Arrange
        ClientRequestDTO requestDTO = new ClientRequestDTO("John Doe", "123456789", "john@example.com", "1234567890", "CA", 37.7749, -122.4194, 1L);
        Person person = new Person();
        when(personRepository.findById(1L)).thenReturn(Optional.of(person));

        // Act
        clientController.addClient(requestDTO);

        // Assert
        verify(clientRepository, times(1)).save(any(Client.class));
    }

    @Test
    void getClientById_shouldReturnNotFoundIfClientDoesNotExist() {
        // Arrange
        Long clientId = 1L;
        when(clientRepository.findById(clientId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ClientResponseDTO> result = clientController.getClientById(clientId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    @Test
    void updateClient_shouldUpdateClientIfClientExists() {
        // Arrange
        Long clientId = 1L;
        ClientUpdateDTO updateDTO = new ClientUpdateDTO(
                "John Doe",
                "123456789",
                "CA",
                "1234567890",
                "john@example.com",
                37.7749,
                -122.4194,
                1L
        );
        Person person = new Person();
        when(personRepository.findById(1L)).thenReturn(Optional.of(person));
        when(clientRepository.findById(clientId)).thenReturn(Optional.of(new Client()));

        // Act
        clientController.updateClient(clientId, updateDTO);

        // Assert
        verify(clientRepository, times(1)).save(any(Client.class));
    }

    @Test
    void deleteClient_shouldDeleteClient() {
        // Arrange
        Long clientId = 1L;

        // Act
        clientController.deleteClient(clientId);

        // Assert
        verify(clientRepository, times(1)).deleteById(clientId);
    }
}
