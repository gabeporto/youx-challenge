package com.example.youxchallenge.controller;

import com.example.youxchallenge.client.ClientRepository;
import com.example.youxchallenge.person.Person;
import com.example.youxchallenge.person.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("person")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public List<Person> getAllPerson() {
        List<Person> personList = personRepository.findAll();

        return personList;
    }
}
