package com.esprit.microservice.feedbacks.Controller;

import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Services.FeedbackSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackSearchController {

    private final FeedbackSearchService feedbackSearchService;

    @Autowired
    public FeedbackSearchController(FeedbackSearchService feedbackSearchService) {
        this.feedbackSearchService = feedbackSearchService;
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Feedback>> advancedSearch(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) Integer maxRating,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Boolean archived,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "submissionDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {

        Page<Feedback> result = feedbackSearchService.advancedSearch(
                searchTerm,
                minRating,
                maxRating,
                status,
                archived,
                categoryId,
                page,
                size,
                sortBy,
                sortDirection
        );
        return ResponseEntity.ok(result);
    }
}