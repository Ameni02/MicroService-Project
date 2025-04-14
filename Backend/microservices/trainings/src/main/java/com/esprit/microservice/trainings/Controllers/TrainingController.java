package com.esprit.microservice.trainings.Controllers;

import com.esprit.microservice.trainings.Entities.Training;
import com.esprit.microservice.trainings.Services.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainings")
public class TrainingController {
    @Autowired
    private TrainingService trainingService;

    // Ajouter une formation
    @PostMapping
    public Training addTraining(@RequestBody Training training) {
        return trainingService.addTraining(training);
    }

    // Récupérer toutes les formations
    @GetMapping
    public List<Training> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    // Récupérer une formation par ID
    @GetMapping("/{id}")
    public Optional<Training> getTrainingById(@PathVariable Long id) {
        return trainingService.getTrainingById(id);
    }

    // Mettre à jour une formation
    @PutMapping("/{id}")
    public Training updateTraining(@PathVariable Long id, @RequestBody Training training) {
        return trainingService.updateTraining(id, training);
    }

    // Supprimer une formation
    @DeleteMapping("/{id}")
    public void deleteTraining(@PathVariable Long id) {
        trainingService.deleteTraining(id);
    }
    @GetMapping("/search")
    public List<Training> searchTrainings(@RequestParam String keyword) {
        return trainingService.searchTrainings(keyword);
    }
    @GetMapping("/sort")
    public List<Training> sortTrainings(@RequestParam(defaultValue = "asc") String order) {
        return trainingService.sortTrainingsByPrice(order);
    }
    }
