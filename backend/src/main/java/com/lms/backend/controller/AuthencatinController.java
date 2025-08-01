package com.lms.backend.controller;

import com.lms.backend.config.JwtUtil;
import com.lms.backend.model.User;
import com.lms.backend.model.Role;
import com.lms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174", "http://localhost:3000" }, allowCredentials = "true")
public class AuthencatinController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // JWT-based login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginData loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            boolean passwordMatches = false;
            
            // Check if password is BCrypt encoded (starts with $2a$, $2b$, or $2y$)
            if (user.getPassword().startsWith("$2")) {
                // Use BCrypt verification for encoded passwords
                passwordMatches = passwordEncoder.matches(loginData.password, user.getPassword());
            } else {
                // Direct comparison for plain text passwords (legacy users)
                passwordMatches = loginData.password.equals(user.getPassword());
                
                // Optionally upgrade to BCrypt for future logins
                if (passwordMatches) {
                    user.setPassword(passwordEncoder.encode(loginData.password));
                    userRepository.save(user);
                }
            }
            
            if (passwordMatches) {
                // Generate JWT token
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString(), user.getId());
                return ResponseEntity.ok(new LoginResponse(user, token));
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // JWT-based register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterData registerData) {
        // Check if email already exists
        if (userRepository.findByEmail(registerData.email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Create new user with encrypted password
        User user = new User();
        user.setName(registerData.name);
        user.setEmail(registerData.email);
        user.setPassword(passwordEncoder.encode(registerData.password));
        user.setRole(Role.USER); // Default role
        user.setUsername(registerData.name.toLowerCase().replace(" ", "_"));

        User savedUser = userRepository.save(user);
        
        // Generate JWT token for immediate login
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().toString(), savedUser.getId());
        return ResponseEntity.ok(new LoginResponse(savedUser, token));
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

    public static class LoginResponse {
        public UserResponse user;
        public String token;
        public String tokenType = "Bearer";

        public LoginResponse(User user, String token) {
            this.user = new UserResponse(user);
            this.token = token;
        }
    }
}