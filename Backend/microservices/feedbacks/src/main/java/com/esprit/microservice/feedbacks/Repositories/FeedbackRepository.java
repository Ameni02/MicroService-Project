package com.esprit.microservice.feedbacks.Repositories;

import com.esprit.microservice.feedbacks.Entities.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByStatus(String status);

    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.status = :status")
    long countByStatus(String status);

    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageRating();

    List<Feedback> findByCategoryId(Long categoryId);

    List<Feedback> findByArchivedTrue();
    List<Feedback> findByArchivedFalse();

    @Query("SELECT f FROM Feedback f WHERE " +
            "(COALESCE(:searchTerm, '') = '' OR LOWER(f.comment) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
            "(:minRating IS NULL OR f.rating >= :minRating) AND " +
            "(:maxRating IS NULL OR f.rating <= :maxRating) AND " +
            "(:status IS NULL OR f.status = :status) AND " +
            "(:archived IS NULL OR f.archived = :archived) AND " +
            "(:categoryId IS NULL OR f.category.id = :categoryId)")
    Page<Feedback> advancedSearch(
            @Param("searchTerm") String searchTerm,
            @Param("minRating") Integer minRating,
            @Param("maxRating") Integer maxRating,
            @Param("status") String status,
            @Param("archived") Boolean archived,
            @Param("categoryId") Long categoryId,
            Pageable pageable  // Changed from java.awt.print.Pageable to org.springframework.data.domain.Pageable
    );
}
