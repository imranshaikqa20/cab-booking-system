package com.cabbooking.controller;

import com.cabbooking.dto.AdminStatsDTO;
import com.cabbooking.entity.Ride;
import com.cabbooking.entity.Role;
import com.cabbooking.entity.User;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;

    // ================= USERS =================

    // View all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Suspend user
    @PutMapping("/suspend/{userId}")
    public User suspendUser(@PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("SUSPENDED");

        return userRepository.save(user);
    }

    // Activate user
    @PutMapping("/activate/{userId}")
    public User activateUser(@PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }

    // ================= RIDES =================

    // View all rides (transactions)
    @GetMapping("/rides")
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    // ================= ADMIN ANALYTICS =================

    @GetMapping("/stats")
    public AdminStatsDTO getAdminStats() {

        long totalUsers = userRepository.count();

        long totalDrivers = userRepository.countByRole(Role.DRIVER);

        long totalRides = rideRepository.count();

        Double revenue = rideRepository.getTotalRevenue();

        if (revenue == null) {
            revenue = 0.0;
        }

        return new AdminStatsDTO(
                totalUsers,
                totalDrivers,
                totalRides,
                revenue
        );
    }
}