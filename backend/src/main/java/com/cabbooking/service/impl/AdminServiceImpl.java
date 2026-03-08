package com.cabbooking.service.impl;

import com.cabbooking.dto.AdminStatsDTO;
import com.cabbooking.entity.Role;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;
import com.cabbooking.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;

    @Override
    public AdminStatsDTO getStats() {

        long totalUsers = userRepository.count();
        long totalDrivers = userRepository.countByRole(Role.DRIVER);
        long totalRides = rideRepository.count();
        double revenue = rideRepository.getTotalRevenue();

        return new AdminStatsDTO(
                totalUsers,
                totalDrivers,
                totalRides,
                revenue
        );
    }
}