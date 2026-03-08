package com.cabbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entity.User;
import com.cabbooking.entity.Role;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ================= FIND USER =================
    Optional<User> findByEmail(String email);

    // ================= ADMIN ANALYTICS =================

    // Count users by role
    long countByRole(Role role);

    // Count users by status (ACTIVE / SUSPENDED)
    long countByStatus(String status);

}