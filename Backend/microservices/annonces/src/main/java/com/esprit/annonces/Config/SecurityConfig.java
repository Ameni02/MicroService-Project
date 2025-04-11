package com.esprit.annonces.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final String issuerUri = "http://localhost:8080/realms/CodingFactory"; // Replace with your issuer URI

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**",
                                "/v2/api-docs", "/v3/api-docs/**", "/swagger-resources/**",
                                "/configuration/ui", "/configuration/security",
                                "/swagger-ui/**", "/webjars/**", "/swagger-ui.html")
                        .permitAll() // Allow swagger/public endpoints
                        .requestMatchers("/uploads/**").permitAll() // Public access to uploads
                        .requestMatchers("/annonces/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN") // Users can view annonces
                        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN") // Only accessible by ADMIN
                        .anyRequest().authenticated() // Secure all other endpoints
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless sessions (no session persistence)
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults()) // Enable OAuth2 JWT Resource Server
                );

        return http.build();
    }

    // Configure the JWT Decoder
    @Bean
    public JwtDecoder jwtDecoder() {
        return JwtDecoders.fromIssuerLocation(issuerUri); // Specify the issuer location for JWT validation
    }
}
