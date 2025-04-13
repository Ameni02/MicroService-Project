package com.example.keycloack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final KeycloakUserService keycloakUserService;
    private final KeycloakAuthService keycloakAuthService;

    public AuthController(KeycloakUserService keycloakUserService, KeycloakAuthService keycloakAuthService) {
        this.keycloakUserService = keycloakUserService;
        this.keycloakAuthService = keycloakAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegistrationRequest request) {
        try {
            String userId = keycloakUserService.createUser(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword(),
                    request.getFirstname(),
                    request.getLastname()
            );
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "userId", userId,
                    "message", "User registered successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "error",
                            "error", "User registration failed",
                            "message", e.getMessage()
                    ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        try {
            String accessToken = keycloakAuthService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "accessToken", accessToken,
                    "message", "Login successful"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "status", "error",
                            "message", "Login failed: " + e.getMessage()
                    ));
        }
    }
}
