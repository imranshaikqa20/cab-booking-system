package com.cabbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsDTO {

    private long totalUsers;
    private long totalDrivers;
    private long totalRides;
    private double totalRevenue;

}