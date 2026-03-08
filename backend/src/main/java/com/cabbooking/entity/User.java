package com.cabbooking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= BASIC INFO =================

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // ================= ROLE =================

    /*
        RIDER
        DRIVER
        ADMIN
    */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // ================= ACCOUNT STATUS =================

    /*
        ACTIVE
        SUSPENDED
    */
    @Column(nullable = false)
    private String status = "ACTIVE";

}