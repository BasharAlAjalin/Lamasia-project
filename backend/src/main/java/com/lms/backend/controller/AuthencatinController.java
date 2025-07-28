package com.lms.backend.controller;

import com.lms.backend.model.User;
import com.lms.backend.model.Role;
import com.lms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" }, allowCredentials = "true")
public class AuthencatinController {

    @Autowired
    private UserRepository userRepository;

    // Simple login - just email and password
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginData loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginData.password)) {
                // Return user info (no complex token system)
                return ResponseEntity.ok(new UserResponse(user));
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Simple register - just the basics
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterData registerData) {
        // Check if email already exists
        if (userRepository.findByEmail(registerData.email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setName(registerData.name);
        user.setEmail(registerData.email);
        user.setPassword(registerData.password);
        user.setRole(Role.USER); // Default role
        user.setUsername(registerData.name.toLowerCase().replace(" ", "_"));

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(new UserResponse(savedUser));
    }

    // Simple data classes inside the controller (no separate files needed!)
    public static class LoginData {
        public String email;
        public String password;
    }

    public static class RegisterData {
        public String name;
        public String email;
        public String password;
    }

    public static class UserResponse {
        public Long id;
        public String name;
        public String email;
        public String role;
        public String username;

        public UserResponse(User user) {
            this.id = user.getId();
            this.name = user.getName();
            this.email = user.getEmail();
            this.role = user.getRole().toString();
            this.username = user.getUsername();
        }
    }
}