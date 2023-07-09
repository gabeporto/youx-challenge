package com.example.youxchallenge.controller;

import com.example.youxchallenge.dto.sale.SaleRequestDTO;
import com.example.youxchallenge.dto.sale.SaleResponseDTO;
import com.example.youxchallenge.dto.sale.SaleUpdateDTO;
import com.example.youxchallenge.model.Client;
import com.example.youxchallenge.repository.ClientRepository;
import com.example.youxchallenge.model.Sale;
import com.example.youxchallenge.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sale")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ClientRepository clientRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void addSale(@RequestBody SaleRequestDTO data) {
        Long clientId = data.clientId();
        Client client = clientRepository.findById(clientId).orElseThrow(() -> new IllegalArgumentException("Client not found"));

        Sale sale = new Sale(data, client);
        saleRepository.save(sale);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<SaleResponseDTO> getAllSales() {

        List<SaleResponseDTO> saleList = saleRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream().map(SaleResponseDTO::new).toList();
        return saleList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> getSaleById(@PathVariable Long id) {
        Optional<Sale> saleOptional = saleRepository.findById(id);
        if (saleOptional.isPresent()) {
            SaleResponseDTO responseDTO = new SaleResponseDTO(saleOptional.get());
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public void updateSale(@PathVariable Long id, @RequestBody SaleUpdateDTO data) {
        Optional<Sale> optionalSale = saleRepository.findById(id);
        Client client = clientRepository.findById(data.clientId())
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));
        if (optionalSale.isPresent()) {
            Sale sale = optionalSale.get();
            sale.updateFromDTO(data, client);
            saleRepository.save(sale);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id) {
        saleRepository.deleteById(id);
    }

}
