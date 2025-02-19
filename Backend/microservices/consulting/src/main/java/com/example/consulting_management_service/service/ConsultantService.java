package com.example.consulting_management_service.service;

import com.example.consulting_management_service.entity.Consultant;
import com.example.consulting_management_service.repository.ConsultantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultantService {

    private final ConsultantRepository consultantRepository;

    public ConsultantService(ConsultantRepository consultantRepository) {
        this.consultantRepository = consultantRepository;
    }

    public Consultant createConsultant(Consultant consultant) {
        return consultantRepository.save(consultant);
    }

    public List<Consultant> getAllConsultants() {
        return consultantRepository.findAll();
    }

    public Consultant getConsultantById(Long id) {
        return consultantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));
    }

    public Consultant updateConsultant(Long id, Consultant updated) {
        Consultant existing = getConsultantById(id);
        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPassword(updated.getPassword());
        return consultantRepository.save(existing);
    }

    public void deleteConsultant(Long id) {
        consultantRepository.deleteById(id);
    }
}
