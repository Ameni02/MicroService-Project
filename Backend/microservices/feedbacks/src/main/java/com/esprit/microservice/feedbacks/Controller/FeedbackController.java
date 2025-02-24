package com.esprit.microservice.feedbacks.Controller;

import com.esprit.microservice.feedbacks.Entities.Category;
import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Entities.Response;
import com.esprit.microservice.feedbacks.Repositories.CategoryRepository;
import com.esprit.microservice.feedbacks.Repositories.FeedbackRepository;
import com.esprit.microservice.feedbacks.Repositories.ResponseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // ==================== Feedback Endpoints ====================

    // Get all feedbacks
    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Get a specific feedback by ID
    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        return feedbackRepository.findById(feedbackId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new feedback
    @PostMapping
    public ResponseEntity<?> createFeedback(@Valid @RequestBody Feedback feedback, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        feedback.setSubmissionDate(LocalDateTime.now());
        feedback.setStatus("New");
        return ResponseEntity.ok(feedbackRepository.save(feedback));
    }

    // Update an existing feedback
    @PutMapping("/{feedbackId}")
    public ResponseEntity<?> updateFeedback(@PathVariable Long feedbackId, @Valid @RequestBody Feedback updatedFeedback, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        return feedbackRepository.findById(feedbackId)
                .map(feedback -> {
                    feedback.setComment(updatedFeedback.getComment());
                    feedback.setRating(updatedFeedback.getRating());
                    feedback.setStatus(updatedFeedback.getStatus());
                    feedback.setCategory(updatedFeedback.getCategory());
                    return ResponseEntity.ok(feedbackRepository.save(feedback));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a feedback
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long feedbackId) {
        if (feedbackRepository.existsById(feedbackId)) {
            feedbackRepository.deleteById(feedbackId);
            return ResponseEntity.ok("Feedback deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback not found with id: " + feedbackId);
        }
    }

    // ==================== Response Endpoints ====================

    // Get all responses for a specific feedback
    @GetMapping("/{feedbackId}/responses")
    public ResponseEntity<?> getResponsesForFeedback(@PathVariable Long feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback not found with id: " + feedbackId);
        }
        return ResponseEntity.ok(responseRepository.findByFeedbackId(feedbackId));
    }

    // Add a response to a specific feedback
    @PostMapping("/{feedbackId}/responses")
    public ResponseEntity<?> addResponseToFeedback(@PathVariable Long feedbackId, @Valid @RequestBody Response response, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        return feedbackRepository.findById(feedbackId)
                .map(feedback -> {
                    response.setFeedback(feedback);
                    response.setResponseDate(LocalDateTime.now());
                    return ResponseEntity.ok(responseRepository.save(response));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a specific response
    @DeleteMapping("/responses/{responseId}")
    public ResponseEntity<String> deleteResponse(@PathVariable Long responseId) {
        if (responseRepository.existsById(responseId)) {
            responseRepository.deleteById(responseId);
            return ResponseEntity.ok("Response deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Response not found with id: " + responseId);
        }
    }

    // ==================== Category Endpoints ====================

    // Get all categories
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Create a new category
    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@Valid @RequestBody Category category, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    // Delete a specific category
    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
            return ResponseEntity.ok("Category deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found with id: " + categoryId);
        }
    }

    // ==================== Helper Methods ====================

    // Helper method to handle validation errors
    private ResponseEntity<?> handleValidationErrors(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}