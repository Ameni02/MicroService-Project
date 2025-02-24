package com.esprit.annonces.Repo;

import com.esprit.annonces.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Long> {
}
