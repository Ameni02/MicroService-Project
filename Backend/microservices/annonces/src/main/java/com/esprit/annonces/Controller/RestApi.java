package com.esprit.annonces.Controller;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;
import com.esprit.annonces.Models.StatutAnnonce;
import com.esprit.annonces.Service.ServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RestApi {

    @Autowired
    private ServiceImplementation service;

    // ---------------- Annonces ----------------

    @PostMapping("/annonces/new")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public Annonce ajouterAnnonce(@RequestBody Annonce annonce) {
        return service.ajouterAnnonce(annonce);
    }
    @GetMapping("/annonces")
    @PreAuthorize("hasRole('client_admin')or hasRole('client_user')")
    public List<Annonce> obtenirToutesLesAnnonces() {
        return service.obtenirToutesLesAnnonces();
    }
    @PutMapping("/annonces/{id}")
    @PreAuthorize(" hasRole('client_admin')")
    public Annonce modifierAnnonce(@PathVariable Long id, @RequestBody Annonce annonce) {
        return service.modifierAnnonce(id, annonce);
    }

    @DeleteMapping("/annonces/{id}")
    @PreAuthorize("hasRole('client_admin')")
    public void supprimerAnnonce(@PathVariable Long id) {
        service.supprimerAnnonce(id);
    }

    @GetMapping("/annonces/{id}")
    @PreAuthorize("hasRole('client_admin')")
    public Optional<Annonce> obtenirAnnonceParId(@PathVariable Long id) {
        return service.obtenirAnnonceParId(id);
    }

    @PutMapping("/annonces/{id}/valider")
    @PreAuthorize("hasRole('client_admin')")
    public Annonce validerAnnonce(@PathVariable Long id) {
        return service.validerAnnonce(id);
    }

    @PutMapping("/annonces/{id}/rejeter")
    @PreAuthorize("hasRole('client_admin')")
    public Annonce rejeterAnnonce(@PathVariable Long id) {
        return service.rejeterAnnonce(id);
    }

    // ---------------- Categories ----------------

    @PostMapping("/categories")
    @PreAuthorize("hasRole('client_admin')")
    public Category ajouterCategory(@RequestBody Category category) {
        return service.ajouterCategorie(category);
    }

    @PutMapping("/categories/{id}")
    @PreAuthorize("hasRole('client_admin')")
    public Category modifierCategory(@PathVariable Long id, @RequestBody Category category) {
        return service.modifierCategorie(id, category);
    }

    @DeleteMapping("/categories/{id}")
    @PreAuthorize("hasRole('client_admin')")
    public void supprimerCategory(@PathVariable Long id) {
        service.supprimerCategorie(id);
    }

    @GetMapping("/categories/{id}")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public Optional<Category> obtenirCategoryParId(@PathVariable Long id) {
        return service.obtenirCategorieParId(id);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public List<Category> obtenirToutesLesCategories() {
        return service.obtenirToutesLesCategories();
    }

    // ---------------- Recherche Annonces ----------------

    @GetMapping("/annonces/rechercher")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public List<Annonce> rechercherAnnonces(
            @RequestParam(required = false) String titre,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) StatutAnnonce statut) {
        return service.rechercherAnnonces(titre, categoryId, statut);
    }

    @GetMapping("/annonces/aujourdhui")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public List<Annonce> getAnnoncesAujourdhui() {
        return service.getAnnoncesAujourdhui();
    }

    @GetMapping("/annonces/semaines")
    @PreAuthorize("hasRole('client_user') or hasRole('client_admin')")
    public List<Annonce> getAnnoncesCetteSemaine() {
        return service.getAnnoncesCetteSemaine();
    }

    @GetMapping("/test")
    @PreAuthorize("hasRole('client_admin')")
    public String testAdmin() {
        return "Admin access granted!";
    }
}
