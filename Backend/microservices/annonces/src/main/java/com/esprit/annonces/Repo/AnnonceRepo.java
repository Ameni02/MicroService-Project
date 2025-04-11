package com.esprit.annonces.Repo;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.StatutAnnonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AnnonceRepo extends JpaRepository<Annonce,Long> {
    @Query("SELECT a FROM Annonce a WHERE " +
            "(:titre IS NULL OR a.titre LIKE %:titre%) AND " +
            "(:categoryId IS NULL OR a.category.id = :categoryId) AND " +
            "(:statut IS NULL OR a.statut = :statut)")
    List<Annonce> findByFiltres(@Param("titre") String titre,
                                @Param("categoryId") Long categoryId,
                                @Param("statut") StatutAnnonce statut);
    List<Annonce> findByDatePublication(LocalDate date); // Annonces d'aujourd'hui

    @Query("SELECT a FROM Annonce a WHERE a.datePublication BETWEEN :startOfWeek AND :endOfWeek")
    List<Annonce> findAnnoncesThisWeek(@Param("startOfWeek") LocalDate startOfWeek,
                                       @Param("endOfWeek") LocalDate endOfWeek);
}

