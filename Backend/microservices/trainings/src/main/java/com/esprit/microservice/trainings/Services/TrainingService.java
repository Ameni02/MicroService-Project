package com.esprit.microservice.trainings.Services;

import com.esprit.microservice.trainings.Entities.Training;
import com.esprit.microservice.trainings.REpository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {
    @Autowired
    private TrainingRepository trainingRepository;

    // Ajouter une formation
    public Training addTraining(Training training) {
        return trainingRepository.save(training);
    }

    // Récupérer toutes les formations
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    // Récupérer une formation par ID
    public Optional<Training> getTrainingById(Long id) {
        return trainingRepository.findById(id);
    }

    // Mettre à jour une formation
    public Training updateTraining(Long id, Training trainingDetails) {
        return trainingRepository.findById(id).map(training -> {
            training.setTitle(trainingDetails.getTitle());
            training.setDescription(trainingDetails.getDescription());
            training.setPrice(trainingDetails.getPrice());
            return trainingRepository.save(training);
        }).orElseThrow(() -> new RuntimeException("Training not found"));
    }

    // Supprimer une formation
    public void deleteTraining(Long id) {
        trainingRepository.deleteById(id);
    }

    public List<Training> searchTrainings(String keyword) {
        return trainingRepository.searchByKeyword(keyword);
    }
    public List<Training> sortTrainingsByPrice(String order) {
        if ("desc".equalsIgnoreCase(order)) {
            return trainingRepository.findAllByOrderByPriceDesc();
        }
        return trainingRepository.findAllByOrderByPriceAsc();
    }

}
