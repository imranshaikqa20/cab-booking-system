package com.cabbooking.controller;

import com.cabbooking.entity.Review;
import com.cabbooking.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/submit/{rideId}")
    public Review submitReview(
            @PathVariable Long rideId,
            @RequestParam int rating,
            @RequestParam String comment,
            Authentication authentication) {

        return reviewService.submitReview(
                rideId,
                rating,
                comment,
                authentication.getName()
        );
    }

    @GetMapping("/driver/{driverId}")
    public List<Review> getDriverReviews(@PathVariable Long driverId) {
        return reviewService.getDriverReviews(driverId);
    }
}