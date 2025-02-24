package com.esprit.annonces.Repo;

import com.esprit.annonces.Models.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnonceRepo extends JpaRepository<Annonce,Long> {
}
