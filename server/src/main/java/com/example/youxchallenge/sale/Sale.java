package com.example.youxchallenge.sale;

import com.example.youxchallenge.client.Client;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "sale")
@Entity(name = "sale")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "client_id")
    private Client client;
    @Column(name = "date")
    private Date date;
    @Column(name = "status")
    private String status;
    @Column(name = "value")
    private double value;


    public Sale(SaleRequestDTO data, Client client) {
        this.client = client;
        this.date = data.date();
        this.status = data.status();
        this.value = data.value();
    }

    public void updateFromDTO(SaleUpdateDTO dto, Client client) {
        this.client = client;
        this.date = dto.date();
        this.status = dto.status();
        this.value = dto.value();
    }
}
