package com.techforb.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techforb.backend.models.User;
import com.techforb.backend.models.DTOs.AuthResponse;
import com.techforb.backend.models.DTOs.UserLogin;
import com.techforb.backend.models.DTOs.UserRegister;
import com.techforb.backend.repository.UserRepository;
import com.techforb.backend.services.jwt.IJwtService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {
  private final UserRepository _userRepository;
  @Autowired
  private final IJwtService _jwtService;
  private final PasswordEncoder _passwordEncoder;
  private final AuthenticationManager _authenticationManager;

  public AuthResponse login(UserLogin request) {
    _authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    User user = _userRepository.findByEmail(request.getEmail()).orElseThrow();
    String token = _jwtService.getToken(user);
    return AuthResponse.builder()
        .token(token)
        .fullName(user.getFirstname() + " " + user.getLastname())
        .build();
  }

  public AuthResponse register(UserRegister request) {
    User user = User.builder()
        .email(request.getEmail())
        .password(_passwordEncoder.encode(request.getPassword()))
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .build();

    _userRepository.save(user);

    return AuthResponse.builder()
        .token(_jwtService.getToken(user))
        .fullName(user.getFirstname() + " " + user.getLastname())
        .build();
  }
}
