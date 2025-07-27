package com.lms.backend.service;

import com.lms.backend.model.User;
import com.lms.backend.payload.RegisterRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(RegisterRequest request);
    User loginUser(String email, String password);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUserRole(Long id, String role);
    void deleteUser(Long id);
}
