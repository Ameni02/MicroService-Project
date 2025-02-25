package com.esprit.microservice.evaluations.Repositories;

import com.esprit.microservice.evaluations.Entities.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface OptionsRepo extends JpaRepository<Options, Long> {
    List<Options> findByQuestionId(Long questionId);
    Optional<Options> findByText(String text);
}
