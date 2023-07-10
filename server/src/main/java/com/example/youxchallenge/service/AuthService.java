package com.example.youxchallenge.service;

import com.example.youxchallenge.dto.auth.AuthResponseDTO;
import com.example.youxchallenge.dto.person.PersonRequestDTO;
import com.example.youxchallenge.model.Person;
import com.example.youxchallenge.repository.PersonRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PersonRepository personRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public AuthResponseDTO login(PersonRequestDTO data) {
        Optional<Person> optionalPerson = personRepository.findByEmail(data.email());
        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            if (person.getPassword().equals(data.password())) {
                String token = generateToken(person);
                return new AuthResponseDTO(true, token, person.getEmail(), person.getName(), person.getRole());
            }
        }
        return new AuthResponseDTO(false, "Credenciais inválidas.");
    }

    private String generateToken(Person person) {
        byte[] secretKeyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
        String secretKey = Base64.getEncoder().encodeToString(secretKeyBytes);

        Date expirationDate = new Date(System.currentTimeMillis() + 3600000); // 1 hora

        String token = Jwts.builder()
                .setSubject(person.getEmail())
                .claim("name", person.getName())
                .claim("role", person.getRole())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return token;
    }
}

