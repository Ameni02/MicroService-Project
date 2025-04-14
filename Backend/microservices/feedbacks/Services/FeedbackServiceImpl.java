package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.Category;
import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Entities.Response;
import com.esprit.microservice.feedbacks.Entities.TranslationResult;
import com.esprit.microservice.feedbacks.Repositories.CategoryRepository;
import com.esprit.microservice.feedbacks.Repositories.FeedbackRepository;
import com.esprit.microservice.feedbacks.Repositories.ResponseRepository;
import com.esprit.microservice.feedbacks.dtos.AnonymousFeedbackDTO;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {
    private static final Logger logger = LoggerFactory.getLogger(FeedbackServiceImpl.class);
    private final FeedbackRepository feedbackRepository;
    private final ResponseRepository responseRepository;
    private final CategoryRepository categoryRepository;
    private final TranslationService translationService;


    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                               ResponseRepository responseRepository,
                               CategoryRepository categoryRepository,
                               TranslationService translationService) {
        this.feedbackRepository = feedbackRepository;
        this.responseRepository = responseRepository;
        this.categoryRepository = categoryRepository;
        this.translationService = translationService;

    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findByArchivedFalse();
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Feedback not found with id: " + id));
    }


    @Override
    public Feedback createFeedback(Feedback feedback) {
        if (feedback == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Feedback cannot be null");
        }

        feedback.setSubmissionDate(LocalDateTime.now());

        if (feedback.getStatus() == null) {
            feedback.setStatus("Pending");
        }

        try {
            // Save feedback first to get ID
            Feedback savedFeedback = feedbackRepository.save(feedback);

            // Create translation
            TranslationResult translation = translationService.translateText(
                    feedback.getComment(),
                    "en" // Default to English
            );
            translation.setFeedback(savedFeedback);

            // Add to feedback's translations
            savedFeedback.getTranslations().add(translation);

            return feedbackRepository.save(savedFeedback);

        } catch (Exception e) {
            logger.error("Failed to create feedback with translation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to create feedback", e);
        }
    }
    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {
        if (feedback == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Feedback cannot be null");
        }

        Feedback existingFeedback = getFeedbackById(id);
        
        existingFeedback.setComment(feedback.getComment());
        existingFeedback.setRating(feedback.getRating());
        existingFeedback.setStatus(feedback.getStatus());
        existingFeedback.setAnonymous(feedback.isAnonymous());
        existingFeedback.setArchived(feedback.isArchived());
        existingFeedback.setCategory(feedback.getCategory());
        
        if (!existingFeedback.getComment().equals(feedback.getComment())) {
            try {
                existingFeedback.getTranslations().clear();
                
                TranslationResult translationResult = translationService.translateText(feedback.getComment(), "en");
                translationResult.setFeedback(existingFeedback);
                existingFeedback.getTranslations().add(translationResult);
            } catch (Exception e) {
                // Log the translation error but continue with the update
                // You might want to add proper logging here
            }
        }
        
        return feedbackRepository.save(existingFeedback);
    }

    @Override
    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Feedback not found with id: " + id);
        }
        feedbackRepository.deleteById(id);
    }

    @Override
    public List<Response> getResponsesForFeedback(Long feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Feedback not found with id: " + feedbackId);
        }
        return responseRepository.findByFeedbackId(feedbackId);
    }

    @Override
    public Response addResponseToFeedback(Long feedbackId, Response response) {
        if (response == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Response cannot be null");
        }

        Feedback feedback = getFeedbackById(feedbackId);
        response.setFeedback(feedback);
        response.setResponseDate(LocalDateTime.now());
        return responseRepository.save(response);
    }

    @Override
    public void deleteResponse(Long responseId) {
        if (!responseRepository.existsById(responseId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Response not found with id: " + responseId);
        }
        responseRepository.deleteById(responseId);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category cannot be null");
        }
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Category not found with id: " + categoryId);
        }
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Map<String, Long> getFeedbackCountByStatus() {
        return feedbackRepository.findAll().stream()
                .collect(Collectors.groupingBy(Feedback::getStatus, Collectors.counting()));
    }

    @Override
    public Double getAverageRating() {
        return feedbackRepository.findAll().stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0.0);
    }

    @Override
    public Feedback archiveFeedback(Long id) {
        Feedback feedback = getFeedbackById(id);
        feedback.setArchived(true);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback unarchiveFeedback(Long id) {
        Feedback feedback = getFeedbackById(id);
        feedback.setArchived(false);
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getArchivedFeedbacks() {
        return feedbackRepository.findByArchivedTrue();
    }

    @Override
    public List<Feedback> getActiveFeedbacks() {
        return feedbackRepository.findByArchivedFalse();
    }

    @Override
    public Feedback submitAnonymousFeedback(AnonymousFeedbackDTO feedbackDTO) {
        if (feedbackDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Feedback DTO cannot be null");
        }

        // Get the category from the ID
        Category category = categoryRepository.findById(feedbackDTO.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found with id: " + feedbackDTO.getCategoryId()));

        Feedback feedback = new Feedback();
        feedback.setComment(feedbackDTO.getComment());
        feedback.setRating(feedbackDTO.getRating());
        feedback.setAnonymous(true);
        feedback.setCategory(category);
        return createFeedback(feedback);
    }
}
