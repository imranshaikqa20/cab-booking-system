package com.cabbooking.service;

import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.dto.LoginRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);
}