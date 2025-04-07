package com.esprit.annonces.Controller;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;
import com.esprit.annonces.Models.StatutAnnonce;
import com.esprit.annonces.Service.ServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize; // For role-based access control
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
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can create an annonce
    public Annonce ajouterAnnonce(@RequestBody Annonce annonce) {
        return service.ajouterAnnonce(annonce);
    }

    @PutMapping("/annonces/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can modify an annonce
    public Annonce modifierAnnonce(@PathVariable Long id, @RequestBody Annonce annonce) {
        return service.modifierAnnonce(id, annonce);
    }

    @DeleteMapping("/annonces/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can delete an annonce
    public void supprimerAnnonce(@PathVariable Long id) {
        service.supprimerAnnonce(id);
    }

    @GetMapping("/annonces/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can view an annonce
    public Optional<Annonce> obtenirAnnonceParId(@PathVariable Long id) {
        return service.obtenirAnnonceParId(id);
    }

    @PutMapping("/annonces/{id}/valider")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can validate an annonce
    public Annonce validerAnnonce(@PathVariable Long id) {
        return service.validerAnnonce(id);
    }

    @PutMapping("/annonces/{id}/rejeter")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can reject an annonce
    public Annonce rejeterAnnonce(@PathVariable Long id) {
        return service.rejeterAnnonce(id);
    }

    // ---------------- Categories ----------------

    @PostMapping("/categories")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can create categories
    public Category ajouterCategory(@RequestBody Category category) {
        return service.ajouterCategorie(category);
    }

    @PutMapping("/categories/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can modify categories
    public Category modifierCategory(@PathVariable Long id, @RequestBody Category category) {
        return service.modifierCategorie(id, category);
    }

    @DeleteMapping("/categories/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Only admin can delete categories
    public void supprimerCategory(@PathVariable Long id) {
        service.supprimerCategorie(id);
    }

    @GetMapping("/categories/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can view categories
    public Optional<Category> obtenirCategoryParId(@PathVariable Long id) {
        return service.obtenirCategorieParId(id);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can view all categories
    public List<Category> obtenirToutesLesCategories() {
        return service.obtenirToutesLesCategories();
    }

    // ---------------- Recherche Annonces ----------------
    @GetMapping("/annonces/rechercher")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can search annonces
    public List<Annonce> rechercherAnnonces(
            @RequestParam(required = false) String titre,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) StatutAnnonce statut) {
        return service.rechercherAnnonces(titre, categoryId, statut);
    }

    @GetMapping("/annonces/aujourdhui")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can see today's annonces
    public List<Annonce> getAnnoncesAujourdhui() {
        return service.getAnnoncesAujourdhui();
    }

    @GetMapping("/annonces/semaines")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // Both user and admin can see this week's annonces
    public List<Annonce> getAnnoncesCetteSemaine() {
        return service.getAnnoncesCetteSemaine();
    }

}
