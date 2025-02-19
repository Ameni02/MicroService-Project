package com.example.consulting_management_service.controller;

import com.example.consulting_management_service.entity.Availability;
import com.example.consulting_management_service.service.AvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availabilities")
@CrossOrigin
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    // Create new availability for a specific consultant
    @PostMapping("/consultant/{consultantId}")
    public Availability createAvailability(@PathVariable Long consultantId,
                                           @RequestBody Availability availability) {
        return availabilityService.createAvailability(consultantId, availability);
    }

    @GetMapping
    public List<Availability> getAllAvailabilities() {
        return availabilityService.getAllAvailabilities();
    }

    @GetMapping("/{id}")
    public Availability getAvailabilityById(@PathVariable Long id) {
        return availabilityService.getAvailabilityById(id);
    }

    @PutMapping("/{id}")
    public Availability updateAvailability(@PathVariable Long id, @RequestBody Availability availability) {
        return availabilityService.updateAvailability(id, availability);
    }

    @DeleteMapping("/{id}")
    public void deleteAvailability(@PathVariable Long id) {
        availabilityService.deleteAvailability(id);
    }
}
