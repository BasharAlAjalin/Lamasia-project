package com.lms.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;
    private String username;
    
    public AuthResponse(String token) {
        this.token = token;
    }
}
