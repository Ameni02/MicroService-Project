package com.esprit.annonces.Service;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;
import com.esprit.annonces.Models.StatutAnnonce;
import com.esprit.annonces.Repo.AnnonceRepo;
import com.esprit.annonces.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceImplementation implements ServiceInterface {

    @Autowired
    private AnnonceRepo annonceRepository;

    @Autowired
    private CategoryRepo categorieRepository;

    // CRUD Annonce
    @Override
    public Annonce ajouterAnnonce(Annonce annonce) {
        annonce.setStatut(StatutAnnonce.EN_ATTENTE);
        return annonceRepository.save(annonce);
    }

    @Override
    public Annonce modifierAnnonce(Long id, Annonce annonce) {
        if (annonceRepository.existsById(id)) {
            annonce.setId(id);
            return annonceRepository.save(annonce);
        }
        return null;
    }

    @Override
    public void supprimerAnnonce(Long id) {
        annonceRepository.deleteById(id);
    }

    @Override
    public Optional<Annonce> obtenirAnnonceParId(Long id) {
        return annonceRepository.findById(id);
    }

    @Override
    public List<Annonce> obtenirToutesLesAnnonces() {
        return annonceRepository.findAll();
    }
    @Override
    public Annonce validerAnnonce(Long id) {
        Optional<Annonce> annonceOptional = annonceRepository.findById(id);
        if (annonceOptional.isPresent()) {
            Annonce annonce = annonceOptional.get();
            annonce.setStatut(StatutAnnonce.APPROUVEE);
            return annonceRepository.save(annonce);
        }
        throw new RuntimeException("Annonce non trouvée !");
    }

    @Override
    public Annonce rejeterAnnonce(Long id) {
        Optional<Annonce> annonceOptional = annonceRepository.findById(id);
        if (annonceOptional.isPresent()) {
            Annonce annonce = annonceOptional.get();
            annonce.setStatut(StatutAnnonce.REJETEE);
            return annonceRepository.save(annonce);
        }
        throw new RuntimeException("Annonce non trouvée !");
    }



    // CRUD Categorie
    @Override
    public Category ajouterCategorie(Category categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public Category modifierCategorie(Long id, Category categorie) {
        if (categorieRepository.existsById(id)) {
            categorie.setId(id);
            return categorieRepository.save(categorie);
        }
        return null;
    }

    @Override
    public void supprimerCategorie(Long id) {
        categorieRepository.deleteById(id);
    }

    @Override
    public Optional<Category> obtenirCategorieParId(Long id) {
        return categorieRepository.findById(id);
    }

    @Override
    public List<Category> obtenirToutesLesCategories() {
        return categorieRepository.findAll();
    }

}
