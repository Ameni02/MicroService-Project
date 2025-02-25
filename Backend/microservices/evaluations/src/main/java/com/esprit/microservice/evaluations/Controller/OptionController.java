package com.esprit.microservice.evaluations.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/options")

public class OptionController {


    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @GetMapping
    public ResponseEntity<List<Options>> getAllOptions() {
        List<Options> options = optionService.getAllOptions();
        return new ResponseEntity<>(options, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Options> getOptionById(@PathVariable Long id) {
        Optional<Options> option = optionService.getOptionById(id);
        return option.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping
    public ResponseEntity<Options> createOption(@RequestBody Options option) {
        if (option == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retourne une erreur si le corps est vide
        }

        Options createdOption = optionService.createOption(option); // Méthode pour créer une option dans le service
        return new ResponseEntity<>(createdOption, HttpStatus.CREATED); // Retourne l'option créée avec un code 201
    }

    @PutMapping("/{id}")
    public ResponseEntity<Options> updateOption(@PathVariable Long id, @RequestBody Options option) {
        Options updatedOption = optionService.updateOption(id, option);
        return updatedOption != null ? new ResponseEntity<>(updatedOption, HttpStatus.OK) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOption(@PathVariable Long id) {
        boolean deleted = optionService.deleteOption(id);
        return deleted ? ResponseEntity.ok("Option deleted successfully") :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Option not found");
    }
}

