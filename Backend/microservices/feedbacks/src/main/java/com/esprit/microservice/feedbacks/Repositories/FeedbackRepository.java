package com.esprit.microservice.feedbacks.Repositories;

import com.esprit.microservice.feedbacks.Entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
