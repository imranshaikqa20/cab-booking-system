package com.cabbooking.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.dto.LoginRequest;
import com.cabbooking.entity.Role;
import com.cabbooking.entity.User;
import com.cabbooking.repository.UserRepository;
import com.cabbooking.security.JwtUtil;
import com.cabbooking.service.AuthService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ================= REGISTER =================
    @Override
    public String register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        // Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Validate role
        Role role;
        try {
            role = Role.valueOf(request.getRole().trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role. Use RIDER, DRIVER or ADMIN");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .status("ACTIVE")   // default account status
                .build();

        userRepository.save(user);

        return "User Registered Successfully!";
    }

    // ================= LOGIN =================
    @Override
    public String login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid Credentials!"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials!");
        }

        // Block suspended users
        if ("SUSPENDED".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Account suspended by admin");
        }

        // Generate JWT token
        return jwtUtil.generateToken(user);
    }
}