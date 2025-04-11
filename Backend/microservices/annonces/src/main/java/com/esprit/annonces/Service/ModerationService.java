package com.esprit.annonces.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import org.springframework.web.client.HttpClientErrorException;
@Service
public class ModerationService {

    private final String OPENAI_API_KEY = "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"; // Your real key
    private static final int MAX_RETRIES = 5;

    public boolean isBadAnnonce(String text) {
        String url = "https://api.openai.com/v1/moderations";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        Map<String, Object> body = new HashMap<>();
        body.put("input", text);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        int retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    // Log the entire response for debugging
                    System.out.println("API Response: " + response.getBody());

                    // Extract the "results" list from the response body
                    List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

                    // Check if results are not empty and get the flagged value
                    if (results != null && !results.isEmpty()) {
                        Boolean flagged = (Boolean) results.get(0).get("flagged");
                        System.out.println("Flagged: " + flagged);

                        // Return true if flagged is true (i.e., bad content)
                        return flagged != null && flagged;
                    }
                }
                return false; // If the response doesn't match expectations, treat as safe
            } catch (HttpClientErrorException.TooManyRequests e) {
                retries++;
                System.out.println("Quota exceeded, retry attempt " + retries + " of " + MAX_RETRIES);
                try {
                    // Exponential backoff (waiting 2^retries seconds before retrying)
                    TimeUnit.SECONDS.sleep((long) Math.pow(2, retries));
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            } catch (Exception e) {
                System.out.println("An error occurred: " + e.getMessage());
                break;  // Break on any other exception
            }
        }

        // Instead of treating it as safe, you can log or handle it differently:
        System.out.println("Max retries reached. Manual review required for content.");
        return false; // If retries exhausted or an error occurs, treat as safe
    }

}
