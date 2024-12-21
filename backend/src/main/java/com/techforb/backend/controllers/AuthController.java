package com.techforb.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techforb.backend.models.DTOs.AuthResponse;
import com.techforb.backend.models.DTOs.UserLogin;
import com.techforb.backend.models.DTOs.UserRegister;
import com.techforb.backend.services.IAuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private IAuthService _authService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody UserLogin request) {
    return ResponseEntity.ok(_authService.login(request));
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody UserRegister request) {
    return ResponseEntity.ok(_authService.register(request));
  }
}
