package com.cabbooking.service;

import com.cabbooking.entity.Review;

import java.util.List;

public interface ReviewService {

    /**
     * Submit review for a completed and paid ride.
     * After review submission, ride status will be updated to REVIEWED.
     */
    Review submitReview(Long rideId, int rating, String comment, String riderEmail);

    /**
     * Get all reviews for a specific driver.
     */
    List<Review> getDriverReviews(Long driverId);

}