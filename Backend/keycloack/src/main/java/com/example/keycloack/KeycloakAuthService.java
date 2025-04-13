package com.example.keycloack;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class KeycloakAuthService {

    private final String keycloakServerUrl = "http://localhost:8080/realms/CodingFactory1/protocol/openid-connect/token";
    private final String clientId = "codingfactory-rest-api";
    private final String clientSecret = "CbYPwD517sEmWktpuOYLE5Lon1ZgEIUJ";
    private final RestTemplate restTemplate = new RestTemplate();

    public String login(String username, String password) {
        String requestBody = "client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&username=" + username +
                "&password=" + password +
                "&grant_type=password";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                keycloakServerUrl, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(response.getBody());
                return jsonNode.get("access_token").asText();
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse Keycloak response", e);
            }
        } else {
            throw new RuntimeException("Failed to authenticate with Keycloak");
        }
    }
}
