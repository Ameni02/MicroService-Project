package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedbackSearchService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackSearchService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Transactional(readOnly = true)
    public Page<Feedback> advancedSearch(
            String searchTerm,
            Integer minRating,
            Integer maxRating,
            String status,
            Boolean archived,
            Long categoryId,
            int page,
            int size,
            String sortBy,
            String sortDirection) {

        // Validate rating range
        if (minRating != null && maxRating != null && minRating > maxRating) {
            throw new IllegalArgumentException("minRating cannot be greater than maxRating");
        }

        // Normalize pagination parameters
        page = Math.max(page, 0);
        size = size <= 0 ? 10 : Math.min(size, 100);

        // Create Pageable with sorting
        Sort sort = Sort.by(
                "desc".equalsIgnoreCase(sortDirection) ?
                        Sort.Direction.DESC : Sort.Direction.ASC,
                sortBy
        );
        Pageable pageable = PageRequest.of(page, size, sort);

        return feedbackRepository.advancedSearch(
                searchTerm,
                minRating,
                maxRating,
                status,
                archived,
                categoryId,
                pageable
        );
    }
}