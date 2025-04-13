package com.esprit.annonces.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:http://localhost:8080/realms/CodingFactory1}")
    private String issuerUri;

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withIssuerLocation(issuerUri).build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthConverter jwtAuthConverter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-ui/index.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        // -- YOUR OTHER ROUTES --
                        .requestMatchers("/api/annonces").hasAnyRole("client_user", "client_admin")
                        .requestMatchers("/api/annonces/{id}").hasAnyRole("client_user", "client_admin")
                        .requestMatchers("/api/annonces/**").hasRole("client_admin")

                        .requestMatchers("/api/categories").hasRole("client_admin")
                        .requestMatchers("/api/categories/{id}").hasAnyRole("client_user", "client_admin")
                        .requestMatchers("/api/categories/**").hasRole("client_admin")

                        .requestMatchers("/api/annonces/rechercher").hasAnyRole("client_user", "client_admin")
                        .requestMatchers("/api/annonces/aujourdhui").hasAnyRole("client_user", "client_admin")
                        .requestMatchers("/api/annonces/semaines").hasAnyRole("client_user", "client_admin")

                        .requestMatchers("/api/test").hasRole("client_admin")

                        .anyRequest().authenticated()
                )

                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthConverter) // utilise directement ton Converter
                        )
                );

        return http.build();
    }
}
