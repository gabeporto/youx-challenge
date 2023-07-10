package com.example.youxchallenge.controller;

import com.example.youxchallenge.dto.sale.SaleRequestDTO;
import com.example.youxchallenge.model.Client;
import com.example.youxchallenge.repository.ClientRepository;
import com.example.youxchallenge.model.Sale;
import com.example.youxchallenge.repository.SaleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class SaleControllerTest {

    @Mock
    private SaleRepository saleRepository;

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private SaleController saleController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddSale() {
        // Criar o objeto SaleRequestDTO para o teste
        SaleRequestDTO saleRequestDTO = new SaleRequestDTO(
                1L, // clientId
                new Date(), // date
                "completed", // status
                100.0 // value
        );

        // Criar o objeto Client para simular o retorno do repositório de clientes
        Client client = new Client();

        // Configurar o comportamento do mock do clientRepository
        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));

        // Chamar o método addSale no SaleController
        saleController.addSale(saleRequestDTO);

        // Verificar se o método save do saleRepository foi chamado
        verify(saleRepository, times(1)).save(any(Sale.class));
    }


    @Test
    public void testGetSaleByIdNotFound() {
        // Configurar o comportamento do mock do saleRepository para retornar vazio
        when(saleRepository.findById(1L)).thenReturn(Optional.empty());

        // Chamar o método getSaleById no SaleController
        ResponseEntity<?> responseEntity = saleController.getSaleById(1L);

        // Verificar o status code da resposta
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    // Adicione mais testes para os outros métodos do SaleController

}
