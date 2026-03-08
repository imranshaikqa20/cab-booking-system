package com.cabbooking.service;

import com.cabbooking.dto.RideRequest;
import com.cabbooking.entity.Ride;

import java.util.List;

public interface RideService {

    // ================= BOOK RIDE (RIDER) =================
    Ride bookRide(RideRequest request, String riderEmail);

    // ================= RIDER RIDES =================
    List<Ride> getRidesByRiderEmail(String email);

    // ================= DRIVER ASSIGNED RIDES =================
    List<Ride> getRidesByDriverEmail(String email);

    // ================= AVAILABLE RIDES (FOR DRIVER) =================
    List<Ride> getAvailableRides();

    // ================= ACCEPT RIDE =================
    Ride acceptRide(Long rideId, String driverEmail);

    // ================= START RIDE (OTP VERIFICATION) =================
    Ride startRide(Long rideId, String driverEmail, String otp);

    // ================= COMPLETE RIDE =================
    Ride completeRide(Long rideId, String driverEmail);

    // ================= CASH PAYMENT =================
    Ride markCashPayment(Long rideId, String riderEmail);

    // ================= CANCEL RIDE =================
    Ride cancelRide(Long rideId, String riderEmail);
}