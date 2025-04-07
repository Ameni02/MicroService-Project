package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.Translation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

@Service
public class TranslationService {
    private static final Logger logger = LoggerFactory.getLogger(TranslationService.class);
    private static final String MYMEMORY_API = "https://api.mymemory.translated.net/get";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Translation translateText(String text, String targetLanguage) {
        if (text == null || text.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Text cannot be empty");
        }

        if (targetLanguage == null || targetLanguage.isEmpty()) {
            targetLanguage = "en";
        } else if (targetLanguage.length() != 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Target language must be a 2-letter code");
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            URI uri = new URIBuilder(MYMEMORY_API)
                    .addParameter("q", text)
                    .addParameter("langpair", "auto|" + targetLanguage)
                    .build();

            logger.debug("Calling translation API: {}", uri.toString());

            HttpGet request = new HttpGet(uri);
            request.setHeader("Accept", "application/json");

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                HttpEntity entity = response.getEntity();
                String responseString = EntityUtils.toString(entity);

                JsonNode root = objectMapper.readTree(responseString);

                if (root.has("responseStatus") && root.get("responseStatus").asInt() != 200) {
                    String error = root.has("responseDetails")
                            ? root.get("responseDetails").asText()
                            : "Unknown translation error";
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, error);
                }

                JsonNode responseData = root.get("responseData");
                String translatedText = responseData.get("translatedText").asText();
                String detectedLanguage = "auto";
                if (responseData.has("detectedLanguage")) {
                    detectedLanguage = responseData.get("detectedLanguage").get("language").asText();
                }

                Translation translation = new Translation();
                translation.setOriginalText(text);
                translation.setTranslatedText(translatedText);
                translation.setSourceLanguage(detectedLanguage);
                translation.setTargetLanguage(targetLanguage);

                return translation;
            }
        } catch (URISyntaxException e) {
            logger.error("Invalid API URL", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid API configuration");
        } catch (Exception e) {
            logger.error("Translation failed", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Translation service error");
        }
    }

    public String detectLanguage(String text) {
        try {
            Translation translation = translateText(text, "en");
            return translation.getSourceLanguage();
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Language detection failed", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Language detection failed");
        }
    }
}