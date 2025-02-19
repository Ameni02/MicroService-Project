package com.example.consulting_management_service.controller;

import com.example.consulting_management_service.entity.Consultant;
import com.example.consulting_management_service.service.ConsultantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultants")
@CrossOrigin
public class ConsultantController {

    private final ConsultantService consultantService;

    public ConsultantController(ConsultantService consultantService) {
        this.consultantService = consultantService;
    }

    @PostMapping
    public Consultant createConsultant(@RequestBody Consultant consultant) {
        return consultantService.createConsultant(consultant);
    }

    @GetMapping
    public List<Consultant> getAllConsultants() {
        return consultantService.getAllConsultants();
    }

    @GetMapping("/{id}")
    public Consultant getConsultantById(@PathVariable Long id) {
        return consultantService.getConsultantById(id);
    }

    @PutMapping("/{id}")
    public Consultant updateConsultant(@PathVariable Long id, @RequestBody Consultant consultant) {
        return consultantService.updateConsultant(id, consultant);
    }

    @DeleteMapping("/{id}")
    public void deleteConsultant(@PathVariable Long id) {
        consultantService.deleteConsultant(id);
    }
}
