package com.cabbooking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= LOCATIONS =================

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private String dropLocation;

    // ================= COORDINATES =================

    @Column(nullable = false)
    private Double pickupLatitude;

    @Column(nullable = false)
    private Double pickupLongitude;

    @Column(nullable = false)
    private Double dropLatitude;

    @Column(nullable = false)
    private Double dropLongitude;

    // ================= FARE =================

    @Column(nullable = false)
    private Double fare;

    // ================= STATUS =================
    /*
        REQUESTED  -> Rider booked ride
        ACCEPTED   -> Driver accepted ride
        IN_PROGRESS-> Ride started
        COMPLETED  -> Ride finished
        PAID       -> Payment done
        REVIEWED   -> Rider submitted review
        CANCELLED  -> Ride cancelled
    */
    @Column(nullable = false)
    private String status;

    // ================= PAYMENT MODE =================
    /*
        CARD
        UPI
        CASH
    */
    @Column
    private String paymentMode;

    // ================= OTP =================

    @Column(length = 4)
    private String otp;

    // ================= TIMESTAMPS =================

    private LocalDateTime bookedAt;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    private LocalDateTime paidAt;

    // ================= RELATIONSHIPS =================

    @ManyToOne
    @JoinColumn(name = "rider_id", nullable = false)
    private User rider;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
}