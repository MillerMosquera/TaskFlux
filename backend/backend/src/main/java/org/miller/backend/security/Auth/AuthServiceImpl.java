package org.miller.backend.security.Auth;


import lombok.RequiredArgsConstructor;
import org.miller.backend.model.User;
import org.miller.backend.repository.UserRepository;
import org.miller.backend.security.Payload.JwtResponse;
import org.miller.backend.security.Payload.LoginRequest;
import org.miller.backend.security.Payload.RegisterRequest;
import org.miller.backend.security.jwt.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtResponse register(RegisterRequest request) {
        if (request.getPasswordHash() == null || request.getPasswordHash().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPasswordHash()))
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.getToken(user);
        return JwtResponse.builder().token(jwtToken).build();
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), request.getPasswordHash())
        );

        var jwtToken = jwtService.getToken(user);
        return JwtResponse.builder().token(jwtToken).build();
    }


}
