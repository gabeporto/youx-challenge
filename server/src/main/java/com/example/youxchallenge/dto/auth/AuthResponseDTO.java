package com.example.youxchallenge.dto.auth;

public class AuthResponseDTO {
    private boolean success;
    private Long id;
    private String token;
    private String email;
    private String name;
    private String role;
    private String message;

    public AuthResponseDTO(boolean success, String token, String email, String name, String role) {
        this.success = success;
        this.token = token;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public AuthResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponseDTO() {}

    public Long getId() {
        return id;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
