package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideRequest {

    private String pickupLocation;
    private String dropLocation;

    // Required for maps & routing
    private Double pickupLatitude;
    private Double pickupLongitude;

    private Double dropLatitude;
    private Double dropLongitude;
}