package com.example.consulting_management_service.repository;

import com.example.consulting_management_service.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
}