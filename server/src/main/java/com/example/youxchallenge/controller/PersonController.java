package com.example.youxchallenge.controller;

import com.example.youxchallenge.dto.person.PersonRequestDTO;
import com.example.youxchallenge.dto.person.PersonResponseDTO;
import com.example.youxchallenge.dto.person.PersonUpdateDTO;
import com.example.youxchallenge.exception.PersonSameEmailException;
import com.example.youxchallenge.model.Person;
import com.example.youxchallenge.repository.PersonRepository;
import com.example.youxchallenge.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("person")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonService personService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> addPerson(@RequestBody PersonRequestDTO data) {

        if (personService.checkWithHaveSameEmail(data.email())) {
            throw new PersonSameEmailException("Usuário com o email fornecido já existe");
        } else {
            Person person = new Person(data);
            personRepository.save(person);
            return ResponseEntity.ok("Usuário cadastrado com sucesso");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<Person> getAllPerson() {
        List<Person> personList = personRepository.findAll();

        return personList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<PersonResponseDTO> getPersonById(@PathVariable Long id) {
        Optional<Person> personOptional = personRepository.findById(id);
        if (personOptional.isPresent()) {
            PersonResponseDTO responseDTO = new PersonResponseDTO(personOptional.get());
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public void updatePerson(@PathVariable Long id, @RequestBody PersonUpdateDTO data) {
        Optional<Person> optionalPerson = personRepository.findById(id);
        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            person.updateFromDTO(data);
            personRepository.save(person);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Long id) {
        personRepository.deleteById(id);
    }
}
