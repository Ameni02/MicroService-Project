package com.esprit.microservice.feedbacks.Controller;

import com.esprit.microservice.feedbacks.Entities.Translation;
import com.esprit.microservice.feedbacks.Services.TranslationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/translations")
@Tag(name = "Translation Management", description = "APIs for text translation and language detection")
public class TranslationController {

    private static final Logger logger = LoggerFactory.getLogger(TranslationController.class);
    private final TranslationService translationService;

    @Autowired
    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/translate")
    @Operation(summary = "Translate text to target language", description = "Translates the given text to the specified target language")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Translation successful"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Translation service error")
    })
    public ResponseEntity<Translation> translateText(
            @Parameter(description = "Text to translate", required = true)
            @RequestParam String text,
            @Parameter(description = "Target language code (2 letters)", required = false)
            @RequestParam(defaultValue = "en") String targetLanguage) {

        logger.info("Translation request - Text: {}, Target Language: {}", text, targetLanguage);

        try {
            Translation translation = translationService.translateText(text, targetLanguage);
            return ResponseEntity.ok(translation);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Translation failed: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Translation service error", e);
        }
    }

    @PostMapping("/detect")
    @Operation(summary = "Detect language of text", description = "Detects the language of the given text")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Language detection successful"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Detection service error")
    })
    public ResponseEntity<String> detectLanguage(
            @Parameter(description = "Text to detect language", required = true)
            @RequestParam String text) {

        logger.info("Language detection request - Text: {}", text);

        try {
            String language = translationService.detectLanguage(text);
            return ResponseEntity.ok(language);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Language detection failed: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Language detection service error", e);
        }
    }
}