package com.esprit.microservice.feedbacks.Repositories;

import com.esprit.microservice.feedbacks.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
