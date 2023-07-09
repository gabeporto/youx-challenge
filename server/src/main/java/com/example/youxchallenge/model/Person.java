package com.example.youxchallenge.model;

import com.example.youxchallenge.dto.person.PersonRequestDTO;
import com.example.youxchallenge.dto.person.PersonUpdateDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "person")
@Entity(name = "person")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "role")
    private String role;
    @Column(name = "password")
    private String password;
    @JsonIgnore
    @JsonBackReference
    @OneToMany(mappedBy = "person")
    private List<Client> clients;

    public Person(PersonRequestDTO data) {
        this.name = data.name();
        this.email = data.email();
        this.role = data.role();
        this.password = data.password();
    }

    public void updateFromDTO(PersonUpdateDTO dto) {
        this.name = dto.name();
        this.email = dto.email();
        this.role = dto.role();
        this.password = dto.password();
    }
}

