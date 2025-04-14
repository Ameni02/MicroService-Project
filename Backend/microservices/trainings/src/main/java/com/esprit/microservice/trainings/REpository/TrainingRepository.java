package com.esprit.microservice.trainings.REpository;

import com.esprit.microservice.trainings.Entities.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
    @Query("SELECT t FROM Training t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Training> searchByKeyword(@Param("keyword") String keyword);

    List<Training> findAllByOrderByPriceAsc();
    List<Training> findAllByOrderByPriceDesc();

}


