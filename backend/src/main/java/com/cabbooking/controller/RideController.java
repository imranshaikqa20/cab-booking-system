package com.cabbooking.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.cabbooking.dto.RideRequest;
import com.cabbooking.entity.Ride;
import com.cabbooking.service.RideService;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RideController {

    private final RideService rideService;

    // ================= BOOK RIDE (RIDER) =================
    @PostMapping("/book")
    public ResponseEntity<Ride> bookRide(@RequestBody RideRequest request,
                                         Authentication authentication) {

        String riderEmail = authentication.getName();
        Ride savedRide = rideService.bookRide(request, riderEmail);

        return ResponseEntity.ok(savedRide);
    }

    // ================= GET MY RIDES (RIDER) =================
    @GetMapping("/my-rides")
    public ResponseEntity<List<Ride>> getMyRides(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.getRidesByRiderEmail(email)
        );
    }

    // ================= GET AVAILABLE RIDES (DRIVER) =================
    @GetMapping("/available")
    public ResponseEntity<List<Ride>> getAvailableRides() {

        return ResponseEntity.ok(
                rideService.getAvailableRides()
        );
    }

    // ================= GET DRIVER ASSIGNED RIDES =================
    @GetMapping("/driver-rides")
    public ResponseEntity<List<Ride>> getDriverRides(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.getRidesByDriverEmail(email)
        );
    }

    // ================= ACCEPT RIDE (DRIVER) =================
    @PutMapping("/accept/{rideId}")
    public ResponseEntity<Ride> acceptRide(@PathVariable Long rideId,
                                           Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.acceptRide(rideId, email)
        );
    }

    // ================= START RIDE (OTP VERIFICATION) =================
    @PutMapping("/start/{rideId}")
    public ResponseEntity<Ride> startRide(@PathVariable Long rideId,
                                          @RequestParam String otp,
                                          Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.startRide(rideId, email, otp)
        );
    }

    // ================= COMPLETE RIDE (DRIVER) =================
    @PutMapping("/complete/{rideId}")
    public ResponseEntity<Ride> completeRide(@PathVariable Long rideId,
                                             Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.completeRide(rideId, email)
        );
    }

    // ================= CASH PAYMENT (RIDER) =================
    @PutMapping("/pay-cash/{rideId}")
    public ResponseEntity<Ride> payCash(@PathVariable Long rideId,
                                        Authentication authentication) {

        String riderEmail = authentication.getName();

        return ResponseEntity.ok(
                rideService.markCashPayment(rideId, riderEmail)
        );
    }

    // ================= CANCEL RIDE (RIDER) =================
    @PutMapping("/cancel/{rideId}")
    public ResponseEntity<Ride> cancelRide(@PathVariable Long rideId,
                                           Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                rideService.cancelRide(rideId, email)
        );
    }
}