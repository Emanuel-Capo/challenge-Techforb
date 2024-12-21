package com.techforb.backend.services;

import com.techforb.backend.models.DTOs.AuthResponse;
import com.techforb.backend.models.DTOs.UserLogin;
import com.techforb.backend.models.DTOs.UserRegister;

public interface IAuthService {
  AuthResponse login(UserLogin request);

  AuthResponse register(UserRegister request);
}
