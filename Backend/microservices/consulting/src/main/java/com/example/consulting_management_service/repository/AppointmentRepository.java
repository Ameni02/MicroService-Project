package com.example.consulting_management_service.repository;

import com.example.consulting_management_service.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}