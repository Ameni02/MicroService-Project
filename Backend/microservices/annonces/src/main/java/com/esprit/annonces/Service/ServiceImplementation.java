package com.esprit.annonces.Service;

import com.esprit.annonces.Models.Annonce;
import com.esprit.annonces.Models.Category;
import com.esprit.annonces.Models.StatutAnnonce;
import com.esprit.annonces.Repo.AnnonceRepo;
import com.esprit.annonces.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceImplementation implements ServiceInterface {

    @Autowired
    private AnnonceRepo annonceRepository;
    @Autowired
    private  ModerationService moderationService;
    @Autowired
    private CategoryRepo categorieRepository;
    @Autowired
    private EmailService emailService;


    // CRUD Annonce
    @Override
    public Annonce ajouterAnnonce(Annonce annonce) {
        // Combine fields to analyze the full text
        String fullText = annonce.getTitre() + " " + annonce.getDescription();

        // Call moderation service to check if the annonce is bad
        boolean isBad = moderationService.isBadAnnonce(fullText);

        // If flagged as bad, reject the annonce
        if (isBad) {
            System.out.println("❌ Annonce rejected due to inappropriate content.");
            return null; // Or throw an exception if you prefer
        }

        // Set initial status to EN_ATTENTE (pending)
        annonce.setStatut(StatutAnnonce.EN_ATTENTE);

        // Save and return the annonce
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
    public Annonce validerAnnonce(Long id) {
        Optional<Annonce> annonceOpt = annonceRepository.findById(id);
        if (annonceOpt.isPresent()) {
            Annonce annonce = annonceOpt.get();
            annonce.setStatut(StatutAnnonce.APPROUVEE);
            annonceRepository.save(annonce);

            // Envoie d'email à l'utilisateur
            String destinataire = annonce.getUser().getEmail(); // Assure-toi que l'utilisateur a un champ email
            String sujet = "Annonce Validée";
            String message = "Félicitations ! Votre annonce intitulée '" + annonce.getTitre() + "' a été validée.";

            emailService.envoyerEmail(destinataire, sujet, message);

            return annonce;
        }
        return null; // Retourner null ou gérer l'exception si l'annonce n'est pas trouvée
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
    public List<Annonce> rechercherAnnonces(String titre, Long categoryId, StatutAnnonce statut) {
        return annonceRepository.findByFiltres(titre, categoryId, statut);
    }
    public List<Annonce> getAnnoncesAujourdhui() {
        LocalDate today = LocalDate.now();
        return annonceRepository.findByDatePublication(today);
    }

    public List<Annonce> getAnnoncesCetteSemaine() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(java.time.DayOfWeek.SUNDAY);
        return annonceRepository.findAnnoncesThisWeek(startOfWeek, endOfWeek);
    }

}
