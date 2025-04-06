package com.esprit.annonces.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Annonce> annonces;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public List<Annonce> getAnnonces() {
        return annonces;
    }

    public void setAnnonces(List<Annonce> annonces) {
        this.annonces = annonces;
    }
}
