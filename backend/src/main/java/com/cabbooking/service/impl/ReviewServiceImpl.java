package com.cabbooking.service.impl;

import com.cabbooking.entity.Review;
import com.cabbooking.entity.Ride;
import com.cabbooking.entity.User;
import com.cabbooking.repository.ReviewRepository;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;
import com.cabbooking.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    @Override
    public Review submitReview(Long rideId, int rating, String comment, String riderEmail) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        User rider = userRepository.findByEmail(riderEmail)
                .orElseThrow(() -> new RuntimeException("Rider not found"));

        // 🚫 Prevent duplicate review
        if (reviewRepository.existsByRideId(rideId)) {
            throw new RuntimeException("Review already submitted for this ride");
        }

        // Create review
        Review review = Review.builder()
                .rating(rating)
                .comment(comment)
                .ride(ride)
                .driver(ride.getDriver())
                .rider(rider)
                .createdAt(LocalDateTime.now())
                .build();

        Review savedReview = reviewRepository.save(review);

        // ⭐ Update ride status after review
        ride.setStatus("REVIEWED");
        rideRepository.save(ride);

        return savedReview;
    }

    @Override
    public List<Review> getDriverReviews(Long driverId) {
        return reviewRepository.findByDriverId(driverId);
    }
}