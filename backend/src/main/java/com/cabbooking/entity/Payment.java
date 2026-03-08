package com.cabbooking.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Payment {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private Double amount;
 private String paymentStatus;

 @OneToOne
 private Ride ride;
}
