package com.cabbooking.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RideRequest;
import com.cabbooking.entity.Ride;
import com.cabbooking.entity.User;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;
import com.cabbooking.service.RideService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    // ================= BOOK RIDE =================
    @Override
    public Ride bookRide(RideRequest request, String riderEmail) {

        User rider = userRepository.findByEmail(riderEmail)
                .orElseThrow(() -> new RuntimeException("Rider not found"));

        // Generate 4-digit OTP
        String otp = String.valueOf((int) (Math.random() * 9000) + 1000);

        Ride ride = Ride.builder()
                .pickupLocation(request.getPickupLocation())
                .dropLocation(request.getDropLocation())
                .pickupLatitude(request.getPickupLatitude())
                .pickupLongitude(request.getPickupLongitude())
                .dropLatitude(request.getDropLatitude())
                .dropLongitude(request.getDropLongitude())
                .fare(calculateFare(request))
                .status("REQUESTED")
                .otp(otp)
                .bookedAt(LocalDateTime.now())
                .rider(rider)
                .build();

        return rideRepository.save(ride);
    }

    // ================= AUTO FARE CALCULATION =================
    private Double calculateFare(RideRequest request) {

        double latDistance = request.getDropLatitude() - request.getPickupLatitude();
        double lngDistance = request.getDropLongitude() - request.getPickupLongitude();

        double distance = Math.sqrt(latDistance * latDistance + lngDistance * lngDistance) * 111;

        double fare = distance * 10; // ₹10 per KM

        return Math.round(fare * 100.0) / 100.0;
    }

    // ================= RIDER RIDES =================
    @Override
    public List<Ride> getRidesByRiderEmail(String email) {
        return rideRepository.findByRiderEmail(email);
    }

    // ================= DRIVER ASSIGNED RIDES =================
    @Override
    public List<Ride> getRidesByDriverEmail(String email) {
        return rideRepository.findByDriverEmail(email);
    }

    // ================= AVAILABLE RIDES =================
    @Override
    public List<Ride> getAvailableRides() {
        return rideRepository.findByStatusAndDriverIsNull("REQUESTED");
    }

    // ================= ACCEPT RIDE =================
    @Override
    public Ride acceptRide(Long rideId, String driverEmail) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!"REQUESTED".equals(ride.getStatus())) {
            throw new RuntimeException("Ride cannot be accepted");
        }

        User driver = userRepository.findByEmail(driverEmail)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        ride.setDriver(driver);
        ride.setStatus("ACCEPTED");

        return rideRepository.save(ride);
    }

    // ================= START RIDE =================
    @Override
    public Ride startRide(Long rideId, String driverEmail, String otp) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getDriver() == null ||
                !ride.getDriver().getEmail().equals(driverEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

        if (!"ACCEPTED".equals(ride.getStatus())) {
            throw new RuntimeException("Ride cannot be started");
        }

        if (!ride.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        ride.setStatus("IN_PROGRESS");
        ride.setStartedAt(LocalDateTime.now());

        return rideRepository.save(ride);
    }

    // ================= COMPLETE RIDE =================
    @Override
    public Ride completeRide(Long rideId, String driverEmail) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getDriver() == null ||
                !ride.getDriver().getEmail().equals(driverEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

        if (!"IN_PROGRESS".equals(ride.getStatus())) {
            throw new RuntimeException("Ride cannot be completed");
        }

        ride.setStatus("COMPLETED");
        ride.setCompletedAt(LocalDateTime.now());

        return rideRepository.save(ride);
    }

    // ================= CASH PAYMENT =================
    @Override
    public Ride markCashPayment(Long rideId, String riderEmail) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getRider().getEmail().equals(riderEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

        if (!"COMPLETED".equals(ride.getStatus())) {
            throw new RuntimeException("Ride not completed yet");
        }

        ride.setStatus("PAID");
        ride.setPaymentMode("CASH");
        ride.setPaidAt(LocalDateTime.now());

        return rideRepository.save(ride);
    }

    // ================= CANCEL RIDE =================
    @Override
    public Ride cancelRide(Long rideId, String riderEmail) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getRider().getEmail().equals(riderEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

        if (!"REQUESTED".equals(ride.getStatus())) {
            throw new RuntimeException("Ride cannot be cancelled");
        }

        ride.setStatus("CANCELLED");

        return rideRepository.save(ride);
    }
}