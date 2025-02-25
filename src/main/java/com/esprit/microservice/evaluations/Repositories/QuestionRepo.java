package com.esprit.microservice.evaluations.Repositories;

import com.esprit.microservice.evaluations.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface QuestionRepo extends JpaRepository<Question, Long> {
    List<Question> findByQuizId(Long quizId);
    Optional<Question> findByText(String text);
}
