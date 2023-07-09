package com.example.youxchallenge.model;

import com.example.youxchallenge.dto.client.ClientRequestDTO;
import com.example.youxchallenge.dto.client.ClientUpdateDTO;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "client")
@Entity(name = "client")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Client {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "cnpj", unique = true)
    private String cnpj;
    @Column(name = "uf")
    private String uf;
    @Column(name = "phone")
    private String phone;
    @Column(name = "email")
    private String email;
    @Column(name = "latitude")
    private double latitude;
    @Column(name = "longitude")
    private double longitude;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "person_id")
    private Person person;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sale> sales = new ArrayList<>();

    public Client(ClientRequestDTO data, Person person) {
        this.name = data.name();
        this.cnpj = data.cnpj();
        this.uf = data.uf();
        this.phone = data.phone();
        this.email = data.email();
        this.latitude = data.latitude();
        this.longitude = data.longitude();
        this.person = person;
    }

    public void updateFromDTO(ClientUpdateDTO dto, Person person) {
        this.name = dto.name();
        this.cnpj = dto.cnpj();
        this.uf = dto.uf();
        this.phone = dto.phone();
        this.email = dto.email();
        this.latitude = dto.latitude();
        this.longitude = dto.longitude();
        this.person = person;
    }
}
