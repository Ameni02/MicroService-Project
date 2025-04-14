package com.esprit.microservice.feedbacks.Controller;

import com.esprit.microservice.feedbacks.Entities.TranslationResult;
import com.esprit.microservice.feedbacks.Services.TranslationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/api/translations", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Translation Management", description = "APIs for text translation and language detection")
public class TranslationController {

    private static final Logger logger = LoggerFactory.getLogger(TranslationController.class);
    private final TranslationService translationService;

    @Autowired
    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/translate")
    @Operation(
            summary = "Translate text to target language",
            description = "Translates the given text to the specified target language using Azure Cognitive Services",
            parameters = {
                    @Parameter(
                            name = "text",
                            description = "Text to translate",
                            required = true,
                            example = "Hello world"
                    ),
                    @Parameter(
                            name = "targetLanguage",
                            description = "Target language code (ISO 639-1)",
                            required = false,
                            example = "fr"
                    )
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful translation",
                            content = @Content(
                                    schema = @Schema(implementation = TranslationResult.class),
                                    examples = @ExampleObject(
                                            value = "{\"originalText\":\"Hello world\",\"translatedText\":\"Bonjour le monde\",\"sourceLanguage\":\"en\",\"targetLanguage\":\"fr\"}"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input parameters",
                            content = @Content(
                                    examples = @ExampleObject(
                                            value = "{\"status\":400,\"message\":\"Text cannot be empty\"}"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500",
                            description = "Internal server error or Azure service failure",
                            content = @Content(
                                    examples = @ExampleObject(
                                            value = "{\"status\":500,\"message\":\"Translation service unavailable\"}"
                                    )
                            )
                    )
            }
    )
    public ResponseEntity<TranslationResult> translateText(
            @RequestParam String text,
            @RequestParam(defaultValue = "en") String targetLanguage) {

        logger.debug("Received translation request - Text: {}, Target Language: {}", text, targetLanguage);

        try {
            TranslationResult result = translationService.translateText(text, targetLanguage);
            logger.info("Successfully translated text from {} to {}", result.getSourceLanguage(), targetLanguage);
            return ResponseEntity.ok(result);
        } catch (ResponseStatusException e) {
            logger.warn("Translation failed with status {}: {}", e.getStatusCode(), e.getReason());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected translation error for text '{}': {}", text, e.getMessage(), e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Translation service error",
                    e
            );
        }
    }

    @PostMapping("/detect")
    @Operation(
            summary = "Detect language of text",
            description = "Detects the language of the given text using Azure Cognitive Services",
            parameters = {
                    @Parameter(
                            name = "text",
                            description = "Text to analyze",
                            required = true,
                            example = "Bonjour le monde"
                    )
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful language detection",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject(value = "\"fr\"")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input parameters",
                            content = @Content(
                                    examples = @ExampleObject(
                                            value = "{\"status\":400,\"message\":\"Text cannot be empty\"}"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500",
                            description = "Internal server error or Azure service failure",
                            content = @Content(
                                    examples = @ExampleObject(
                                            value = "{\"status\":500,\"message\":\"Language detection service unavailable\"}"
                                    )
                            )
                    )
            }
    )
    public ResponseEntity<String> detectLanguage(@RequestParam String text) {
        logger.debug("Received language detection request - Text: {}", text);

        try {
            String languageCode = translationService.detectLanguage(text);
            logger.info("Successfully detected language: {} for text: {}", languageCode, text);
            return ResponseEntity.ok(languageCode);
        } catch (ResponseStatusException e) {
            logger.warn("Language detection failed with status {}: {}", e.getStatusCode(), e.getReason());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected language detection error for text '{}': {}", text, e.getMessage(), e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Language detection service error",
                    e
            );
        }
    }
}