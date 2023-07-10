package com.example.youxchallenge.exception;

public class PersonSameEmailException extends RuntimeException {
    public PersonSameEmailException(String message) {
        super("E-mail em uso no sistema.");
    }
}