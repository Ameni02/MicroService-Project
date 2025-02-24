package com.esprit.annonces.Controller;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;
import com.esprit.annonces.Service.ServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*") // Permet les requêtes CORS de n'importe quelle origine (utile pour Angular/React)
public class RestApi {

    @Autowired
    private ServiceImplementation service;

    // ---------------- Annonces ----------------

    @PostMapping("/annonces")
    public Annonce ajouterAnnonce(@RequestBody Annonce annonce) {
        return service.ajouterAnnonce(annonce);
    }

    @PutMapping("/annonces/{id}")
    public Annonce modifierAnnonce(@PathVariable Long id, @RequestBody Annonce annonce) {
        return service.modifierAnnonce(id, annonce);
    }

    @DeleteMapping("/annonces/{id}")
    public void supprimerAnnonce(@PathVariable Long id) {
        service.supprimerAnnonce(id);
    }

    @GetMapping("/annonces/{id}")
    public Optional<Annonce> obtenirAnnonceParId(@PathVariable Long id) {
        return service.obtenirAnnonceParId(id);
    }

    @PutMapping("/annonces/{id}/valider")
    public Annonce validerAnnonce(@PathVariable Long id) {
        return service.validerAnnonce(id);
    }

    @PutMapping("/annonces/{id}/rejeter")
    public Annonce rejeterAnnonce(@PathVariable Long id) {
        return service.rejeterAnnonce(id);
    }
    // ---------------- Categories ----------------

    @PostMapping("/categories")
    public Category ajouterCategory(@RequestBody Category category) {
        return service.ajouterCategorie(category);
    }

    @PutMapping("/categories/{id}")
    public Category modifierCategory(@PathVariable Long id, @RequestBody Category category) {
        return service.modifierCategorie(id, category);
    }

    @DeleteMapping("/categories/{id}")
    public void supprimerCategory(@PathVariable Long id) {
        service.supprimerCategorie(id);
    }

    @GetMapping("/categories/{id}")
    public Optional<Category> obtenirCategoryParId(@PathVariable Long id) {
        return service.obtenirCategorieParId(id);
    }

    @GetMapping("/categories")
    public List<Category> obtenirToutesLesCategories() {
        return service.obtenirToutesLesCategories();
    }
}
