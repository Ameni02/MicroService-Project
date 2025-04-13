package com.example.keycloack;

import jakarta.annotation.PostConstruct;
import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class KeycloakUserService {
    private static final Logger logger = LoggerFactory.getLogger(KeycloakUserService.class);

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String targetRealm;

    @Value("${keycloak.admin-client-id}")
    private String adminClientId;

    @Value("${keycloak.admin-client-secret}")
    private String adminClientSecret;

    private final String clientId = "codingfactory-rest-api"; // remplace par ton client ID exact

    @PostConstruct
    public void init() {
        testKeycloakConnection();
    }

    public String createUser(String username, String email, String password, String firstname, String lastname) {
        Keycloak keycloak = null;
        try {
            keycloak = getKeycloakInstance();
            UsersResource usersResource = keycloak.realm(targetRealm).users();

            // Check if user exists
            List<UserRepresentation> existingUsers = usersResource.searchByUsername(username, true);
            if (!existingUsers.isEmpty()) {
                logger.warn("User with username '{}' already exists.", username);
                throw new RuntimeException("User already exists");
            }

            // Create user
            UserRepresentation user = new UserRepresentation();
            user.setUsername(username);
            user.setEmail(email);
            user.setFirstName(firstname);
            user.setLastName(lastname);
            user.setEnabled(true);
            user.setEmailVerified(true);

            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(password);
            credential.setTemporary(false);
            user.setCredentials(Collections.singletonList(credential));

            Response response = usersResource.create(user);

            if (response.getStatus() == Response.Status.CREATED.getStatusCode()) {
                String userId = extractUserIdFromResponse(response);
                logger.info("User created successfully with ID: {}", userId);

                // 🔐 Assign client_user role
                RealmResource realmResource = keycloak.realm(targetRealm);
                UserResource userResource = realmResource.users().get(userId);

                String clientUuid = keycloak.realm(targetRealm).clients()
                        .findByClientId(clientId)
                        .get(0)
                        .getId();

                var clientRole = realmResource.clients().get(clientUuid)
                        .roles()
                        .get("client_user")
                        .toRepresentation();

                userResource.roles()
                        .clientLevel(clientUuid)
                        .add(Collections.singletonList(clientRole));

                logger.info("Assigned 'client_user' role to user {}", username);

                return userId;
            } else {
                String errorResponse = response.readEntity(String.class);
                logger.error("Failed to create user. Status: {}. Response: {}",
                        response.getStatus(), errorResponse);
                throw new RuntimeException("Failed to create user: " + errorResponse);
            }
        } catch (Exception e) {
            logger.error("User creation failed", e);
            throw new RuntimeException("User creation failed: " + e.getMessage());
        } finally {
            if (keycloak != null) {
                keycloak.close();
            }
        }
    }

    private String extractUserIdFromResponse(Response response) {
        String location = response.getLocation().getPath();
        return location.substring(location.lastIndexOf('/') + 1);
    }

    public void updateUserPassword(String userId, String newPassword) {
        Keycloak keycloak = null;
        try {
            keycloak = getKeycloakInstance();
            UserResource userResource = keycloak.realm(targetRealm).users().get(userId);

            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(newPassword);
            credential.setTemporary(false);

            userResource.resetPassword(credential);
            logger.info("Password updated for user ID: {}", userId);
        } catch (Exception e) {
            logger.error("Failed to update password for user ID: " + userId, e);
            throw new RuntimeException("Failed to update password", e);
        } finally {
            if (keycloak != null) {
                keycloak.close();
            }
        }
    }

    public void deleteUser(String userId) {
        Keycloak keycloak = null;
        try {
            keycloak = getKeycloakInstance();
            keycloak.realm(targetRealm).users().delete(userId);
            logger.info("User deleted successfully. ID: {}", userId);
        } catch (Exception e) {
            logger.error("Failed to delete user ID: " + userId, e);
            throw new RuntimeException("Failed to delete user", e);
        } finally {
            if (keycloak != null) {
                keycloak.close();
            }
        }
    }

    private Keycloak getKeycloakInstance() {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(targetRealm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(adminClientId)
                .clientSecret(adminClientSecret)
                .build();
    }

    public void testKeycloakConnection() {
        try {
            Keycloak keycloak = getKeycloakInstance();
            keycloak.realms().findAll();
            logger.info("Successfully connected to Keycloak");
        } catch (Exception e) {
            logger.error("Keycloak connection failed: {}", e.getMessage());
            throw new RuntimeException("Keycloak connection failed: " + e.getMessage(), e);
        }
    }
}
