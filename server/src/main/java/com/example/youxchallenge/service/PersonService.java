package com.example.youxchallenge.service;

import com.example.youxchallenge.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public boolean checkWithHaveSameEmail(String email) {
        return personRepository.existsByEmail(email);
    }

}
