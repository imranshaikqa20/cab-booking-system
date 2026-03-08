package com.cabbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cabbooking.entity.Ride;
import com.cabbooking.entity.User;

import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    // ================= RIDER =================
    List<Ride> findByRider(User rider);

    List<Ride> findByRiderEmail(String email);

    List<Ride> findByRiderEmailAndStatus(String email, String status);

    // ================= DRIVER =================
    List<Ride> findByDriver(User driver);

    List<Ride> findByDriverEmail(String email);

    // ================= AVAILABLE RIDES =================
    // Only rides not yet assigned to any driver
    List<Ride> findByStatusAndDriverIsNull(String status);

    // ================= STATUS =================
    List<Ride> findByStatus(String status);

    // ================= ADMIN ANALYTICS =================
    // Calculate total revenue from completed paid rides
    @Query("SELECT COALESCE(SUM(r.fare),0) FROM Ride r WHERE r.status='PAID' OR r.status='REVIEWED'")
    Double getTotalRevenue();

}