package com.cabbooking.repository;

import com.cabbooking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Get all reviews for a specific driver
    List<Review> findByDriverId(Long driverId);

    // Check if review already exists for a ride
    boolean existsByRideId(Long rideId);

}