package com.quizz.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class QuizAiService {
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    private static final String API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
    private static final String API_KEY = "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";

    public QuizAiService(ObjectMapper objectMapper, RestTemplate restTemplate) {
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
    }

    public String getQuizFromAI(String topic, int numQuestions) {
        String aiResponse = "";

        try {
            // ✅ Ensure at least 1 question is requested
            numQuestions = Math.max(numQuestions, 1);

            // ✅ AI Prompt with dynamic number of questions
            String prompt = String.format(
                    "Generate a JSON quiz about \"%s\" with exactly %d multiple-choice questions. " +
                            "Ensure valid JSON syntax, properly formatted, without extra text.",
                    topic, numQuestions
            );

            // ✅ Create valid JSON request body
            String requestBody = objectMapper.writeValueAsString(Collections.singletonMap("inputs", prompt));

            // ✅ Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + API_KEY);
            headers.set("Content-Type", "application/json");

            // ✅ Make AI request
            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, request, String.class);

            // ✅ Validate response
            if (response.getBody() == null || response.getBody().trim().isEmpty()) {
                throw new RuntimeException("AI response was empty.");
            }

            aiResponse = response.getBody().trim();
            System.out.println("Raw AI Response: " + aiResponse);

            // ✅ Extract and clean JSON
            String cleanedJson = extractJsonFromResponse(aiResponse);
            System.out.println("Cleaned JSON: " + cleanedJson);

            return cleanedJson; // ✅ Return JSON as a string for now

        } catch (Exception e) {
            return "{ \"error\": \"Failed to get AI quiz: " + e.getMessage() + "\" }";
        }
    }

    /**
     * ✅ Extracts only the valid JSON part from the AI response.
     */
    private String extractJsonFromResponse(String aiResponse) {
        try {
            // ✅ Step 1: Convert AI response to JSON Node
            JsonNode root = objectMapper.readTree(aiResponse);

            // ✅ Step 2: Get "generated_text" field (ignores extra text)
            if (root.isArray() && root.size() > 0) {
                String generatedText = root.get(0).get("generated_text").asText();

                // ✅ Step 3: Remove backticks (if any) and extract JSON
                if (generatedText.contains("```json")) {
                    generatedText = generatedText.replace("```json", "").replace("```", "").trim();
                }

                // ✅ Step 4: Extract valid JSON using regex
                Pattern pattern = Pattern.compile("\\{.*\\}", Pattern.DOTALL);
                Matcher matcher = pattern.matcher(generatedText);
                if (matcher.find()) {
                    return matcher.group(); // ✅ Extracts the first valid JSON block
                }
            }

            throw new RuntimeException("AI response does not contain valid JSON.");
        } catch (Exception e) {
            return "{ \"error\": \"Failed to extract JSON from AI response: " + e.getMessage() + "\" }";
        }
    }
}
