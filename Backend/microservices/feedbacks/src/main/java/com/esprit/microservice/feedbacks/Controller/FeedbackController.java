package com.esprit.microservice.feedbacks.Controller;

import com.esprit.microservice.feedbacks.Entities.Category;
import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Entities.Response;
import com.esprit.microservice.feedbacks.Repositories.CategoryRepository;
import com.esprit.microservice.feedbacks.Repositories.FeedbackRepository;
import com.esprit.microservice.feedbacks.Repositories.ResponseRepository;
import com.esprit.microservice.feedbacks.Services.FeedbackService;
import com.esprit.microservice.feedbacks.dtos.AnonymousFeedbackDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "http://localhost:4200")
@RefreshScope
@Tag(name = "Feedback Management", description = "APIs for managing feedbacks, responses, and categories")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @Value("${welcome.message}")
    private String welcomeMessage;

    @GetMapping("/hello")
    public String sayHello() {
        return welcomeMessage;
    }

    // Feedback Endpoints
    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{feedbackId}")
    public Feedback getFeedbackById(@PathVariable Long feedbackId) {
        return feedbackService.getFeedbackById(feedbackId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Feedback createFeedback(@Valid @RequestBody Feedback feedback) {
        return feedbackService.createFeedback(feedback);
    }

    @PutMapping("/{feedbackId}")
    public Feedback updateFeedback(@PathVariable Long feedbackId,
                                   @Valid @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(feedbackId, feedback);
    }

    @DeleteMapping("/{feedbackId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
    }

    // Statistics Endpoints
    @GetMapping("/stats/status-count")
    public Map<String, Long> getFeedbackCountByStatus() {
        return feedbackService.getFeedbackCountByStatus();
    }

    @GetMapping("/stats/average-rating")
    public Double getAverageRating() {
        return feedbackService.getAverageRating();
    }

    // Response Endpoints
    @GetMapping("/{feedbackId}/responses")
    public List<Response> getResponsesForFeedback(@PathVariable Long feedbackId) {
        return feedbackService.getResponsesForFeedback(feedbackId);
    }

    @PostMapping("/{feedbackId}/responses")
    @ResponseStatus(HttpStatus.CREATED)
    public Response addResponseToFeedback(@PathVariable Long feedbackId,
                                          @Valid @RequestBody Response response) {
        return feedbackService.addResponseToFeedback(feedbackId, response);
    }

    @DeleteMapping("/responses/{responseId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResponse(@PathVariable Long responseId) {
        feedbackService.deleteResponse(responseId);
    }

    // Category Endpoints
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return feedbackService.getAllCategories();
    }

    @PostMapping("/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@Valid @RequestBody Category category) {
        return feedbackService.createCategory(category);
    }

    @DeleteMapping("/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable Long categoryId) {
        feedbackService.deleteCategory(categoryId);
    }

    @PostMapping("/{feedbackId}/archive")
    public Feedback archiveFeedback(@PathVariable Long feedbackId) {
        return feedbackService.archiveFeedback(feedbackId);
    }

    @PostMapping("/{feedbackId}/unarchive")
    public Feedback unarchiveFeedback(@PathVariable Long feedbackId) {
        return feedbackService.unarchiveFeedback(feedbackId);
    }

    @GetMapping("/archived")
    public List<Feedback> getArchivedFeedbacks() {
        return feedbackService.getArchivedFeedbacks();
    }

    @GetMapping("/active")
    public List<Feedback> getActiveFeedbacks() {
        return feedbackService.getActiveFeedbacks();
    }


    @PostMapping("/anonymous")
    public ResponseEntity<Feedback> submitAnonymousFeedback(
            @Valid @RequestBody AnonymousFeedbackDTO feedbackDTO) {
        Feedback savedFeedback = feedbackService.submitAnonymousFeedback(feedbackDTO);
        return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
    }









    // Exception Handling
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}