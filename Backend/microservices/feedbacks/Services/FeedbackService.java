package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.Category;
import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Entities.Response;
import com.esprit.microservice.feedbacks.dtos.AnonymousFeedbackDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface FeedbackService {
    // Feedback operations
    List<Feedback> getAllFeedbacks();
    Feedback getFeedbackById(Long id);
    Feedback createFeedback(Feedback feedback);
    Feedback updateFeedback(Long id, Feedback feedback);
    void deleteFeedback(Long id);

    // Response operations
    List<Response> getResponsesForFeedback(Long feedbackId);
    Response addResponseToFeedback(Long feedbackId, Response response);
    void deleteResponse(Long responseId);

    // Category operations
    List<Category> getAllCategories();
    Category createCategory(Category category);
    void deleteCategory(Long categoryId);

    // Statistics
    Map<String, Long> getFeedbackCountByStatus();
    Double getAverageRating();


    //archiveFeedback
    Feedback archiveFeedback(Long id);
    Feedback unarchiveFeedback(Long id);
    List<Feedback> getArchivedFeedbacks();
    List<Feedback> getActiveFeedbacks();


    Feedback submitAnonymousFeedback(AnonymousFeedbackDTO feedbackDTO);
}