package com.esprit.annonces.Service;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;

import java.util.List;
import java.util.Optional;

public interface ServiceInterface {

    // CRUD pour Annonce
    Annonce ajouterAnnonce(Annonce annonce);
    Annonce modifierAnnonce(Long id, Annonce annonce);
    void supprimerAnnonce(Long id);
    Optional<Annonce> obtenirAnnonceParId(Long id);
    List<Annonce> obtenirToutesLesAnnonces();

    // CRUD pour Categorie
    Category ajouterCategorie(Category categorie);
    Category modifierCategorie(Long id, Category categorie);
    void supprimerCategorie(Long id);
    Optional<Category> obtenirCategorieParId(Long id);
    List<Category> obtenirToutesLesCategories();
    // 🔥 Méthodes pour la validation
    Annonce validerAnnonce(Long id);
    Annonce rejeterAnnonce(Long id);
}
