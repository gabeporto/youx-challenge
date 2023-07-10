package com.example.youxchallenge.controller;

import com.example.youxchallenge.dto.auth.AuthResponseDTO;
import com.example.youxchallenge.dto.person.PersonRequestDTO;
import com.example.youxchallenge.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    private AuthService authService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<AuthResponseDTO> login(@RequestBody PersonRequestDTO data) {
        AuthResponseDTO response = authService.login(data);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
