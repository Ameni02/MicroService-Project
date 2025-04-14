package com.esprit.microservice.feedbacks.Repositories;

import com.esprit.microservice.feedbacks.Entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findByFeedbackId(Long feedbackId);

}
