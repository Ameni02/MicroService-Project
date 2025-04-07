package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.TranslationResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TranslationService {
    private static final String API_VERSION = "3.0";
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${azure.translator.key}")
    private String translatorKey;

    @Value("${azure.translator.endpoint}")
    private String translatorEndpoint;

    @Value("${azure.translator.region}")
    private String translatorRegion;

    public TranslationResult translateText(String text, String targetLanguage) throws IOException {
        if (text == null || text.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Text cannot be empty");
        }

        if (targetLanguage == null || targetLanguage.isEmpty()) {
            targetLanguage = "en";
        } else if (targetLanguage.length() != 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Target language must be a 2-letter code");
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            String url = String.format("%s/translate?api-version=%s&to=%s",
                    translatorEndpoint, API_VERSION, targetLanguage);

            HttpPost request = new HttpPost(url);
            request.setHeader("Content-Type", "application/json");
            request.setHeader("Ocp-Apim-Subscription-Key", translatorKey);
            request.setHeader("Ocp-Apim-Subscription-Region", translatorRegion);

            String requestBody = String.format("[{\"Text\":\"%s\"}]",
                    text.replace("\"", "\\\""));
            request.setEntity(new StringEntity(requestBody));

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                HttpEntity entity = response.getEntity();
                String responseString = EntityUtils.toString(entity);

                JsonNode root = objectMapper.readTree(responseString);
                JsonNode translation = root.get(0).get("translations").get(0);

                TranslationResult result = new TranslationResult();
                result.setOriginalText(text);
                result.setTranslatedText(translation.get("text").asText());
                result.setSourceLanguage("auto"); // Azure doesn't return detected language in basic response
                result.setTargetLanguage(targetLanguage);

                return result;
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Translation service error", e);
        }
    }

    public String detectLanguage(String text) throws IOException {
        if (text == null || text.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Text cannot be empty");
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            String url = String.format("%s/detect?api-version=%s",
                    translatorEndpoint, API_VERSION);

            HttpPost request = new HttpPost(url);
            request.setHeader("Content-Type", "application/json");
            request.setHeader("Ocp-Apim-Subscription-Key", translatorKey);
            request.setHeader("Ocp-Apim-Subscription-Region", translatorRegion);

            String requestBody = String.format("[{\"Text\":\"%s\"}]",
                    text.replace("\"", "\\\""));
            request.setEntity(new StringEntity(requestBody));

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                HttpEntity entity = response.getEntity();
                String responseString = EntityUtils.toString(entity);

                JsonNode root = objectMapper.readTree(responseString);
                return root.get(0).get("language").asText();
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Language detection error", e);
        }
    }
}