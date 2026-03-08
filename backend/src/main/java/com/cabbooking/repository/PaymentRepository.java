package com.cabbooking.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cabbooking.entity.Payment;
public interface PaymentRepository extends JpaRepository<Payment, Long> {}
