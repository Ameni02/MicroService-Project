package com.example.consulting_management_service.service;

import com.example.consulting_management_service.entity.Availability;
import com.example.consulting_management_service.entity.Consultant;
import com.example.consulting_management_service.repository.AvailabilityRepository;
import com.example.consulting_management_service.repository.ConsultantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final ConsultantRepository consultantRepository;

    public AvailabilityService(AvailabilityRepository availabilityRepository,
                               ConsultantRepository consultantRepository) {
        this.availabilityRepository = availabilityRepository;
        this.consultantRepository = consultantRepository;
    }

    public Availability createAvailability(Long consultantId, Availability availability) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));
        availability.setConsultant(consultant);
        return availabilityRepository.save(availability);
    }

    public List<Availability> getAllAvailabilities() {
        return availabilityRepository.findAll();
    }

    public Availability getAvailabilityById(Long id) {
        return availabilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Availability not found"));
    }

    public Availability updateAvailability(Long id, Availability updated) {
        Availability existing = getAvailabilityById(id);
        existing.setStartTime(updated.getStartTime());
        existing.setEndTime(updated.getEndTime());
        existing.setConsultant(updated.getConsultant());
        return availabilityRepository.save(existing);
    }

    public void deleteAvailability(Long id) {
        availabilityRepository.deleteById(id);
    }
}
