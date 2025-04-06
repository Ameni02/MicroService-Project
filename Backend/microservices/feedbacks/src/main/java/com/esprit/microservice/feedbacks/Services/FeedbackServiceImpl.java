package com.esprit.microservice.feedbacks.Services;

import com.esprit.microservice.feedbacks.Entities.Category;
import com.esprit.microservice.feedbacks.Entities.Feedback;
import com.esprit.microservice.feedbacks.Entities.Response;
import com.esprit.microservice.feedbacks.Repositories.CategoryRepository;
import com.esprit.microservice.feedbacks.Repositories.FeedbackRepository;
import com.esprit.microservice.feedbacks.Repositories.ResponseRepository;
import com.esprit.microservice.feedbacks.dtos.AnonymousFeedbackDTO;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.hibernate.service.spi.ServiceException;
import org.springdoc.core.converters.models.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.aspectj.lang.reflect.DeclareAnnotation.Kind.Field;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ResponseRepository responseRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                               ResponseRepository responseRepository,
                               CategoryRepository categoryRepository) {
        this.feedbackRepository = feedbackRepository;
        this.responseRepository = responseRepository;
        this.categoryRepository = categoryRepository;
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
        feedback.setSubmissionDate(LocalDateTime.now());
        feedback.setStatus("New");
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Feedback not found with id: " + id));

        feedback.setComment(feedbackDetails.getComment());
        feedback.setRating(feedbackDetails.getRating());
        feedback.setStatus(feedbackDetails.getStatus());
        feedback.setCategory(feedbackDetails.getCategory());
        return feedbackRepository.save(feedback);
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
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Feedback not found with id: " + feedbackId));

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
        Map<String, Long> statusCounts = new HashMap<>();
        statusCounts.put("New", feedbackRepository.countByStatus("New"));
        statusCounts.put("InProgress", feedbackRepository.countByStatus("InProgress"));
        statusCounts.put("Resolved", feedbackRepository.countByStatus("Resolved"));
        return statusCounts;
    }

    @Override
    public Double getAverageRating() {
        return feedbackRepository.getAverageRating();
    }


    //archive

    @Override
    public Feedback archiveFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Feedback not found with id: " + id));

        feedback.setArchived(true);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback unarchiveFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Feedback not found with id: " + id));

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




    public Feedback submitAnonymousFeedback(AnonymousFeedbackDTO dto) {
        Feedback feedback = new Feedback();
        feedback.setComment(dto.getComment());
        feedback.setRating(dto.getRating());
        feedback.setAnonymous(true);
        feedback.setSubmissionDate(LocalDateTime.now());
        feedback.setStatus("New");

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        feedback.setCategory(category);

        return feedbackRepository.save(feedback);
    }

}
