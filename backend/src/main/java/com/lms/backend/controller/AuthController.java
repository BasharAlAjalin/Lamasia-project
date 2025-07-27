package com.lms.backend.controller;

import com.lms.backend.model.User;
import com.lms.backend.payload.AuthRequest;
import com.lms.backend.payload.AuthResponse;
import com.lms.backend.payload.RegisterRequest;
import com.lms.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" }, allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request);

            AuthResponse response = new AuthResponse(
                    "simple-token", // Simple token for frontend compatibility
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole().toString(),
                    user.getUsername());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            User user = userService.loginUser(request.getEmail(), request.getPassword());

            if (user != null) {
                AuthResponse response = new AuthResponse(
                        "simple-token", // Simple token for frontend compatibility
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().toString(),
                        user.getUsername());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
