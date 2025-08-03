package org.miller.backend.security.Auth;


import org.miller.backend.security.Payload.JwtResponse;
import org.miller.backend.security.Payload.LoginRequest;
import org.miller.backend.security.Payload.RegisterRequest;

public interface AuthService {

    JwtResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);
}
