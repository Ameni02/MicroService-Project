package com.example.consulting_management_service.controller;

import com.example.consulting_management_service.entity.Appointment;
import com.example.consulting_management_service.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // User requests an appointment with a consultant
    @PostMapping("/request/{userId}/{consultantId}")
    public Appointment requestAppointment(@PathVariable Long userId,
                                          @PathVariable Long consultantId,
                                          @RequestBody Appointment appointmentData) {
        return appointmentService.requestAppointment(userId, consultantId, appointmentData);
    }

    // Admin approves or declines
    @PutMapping("/status/{appointmentId}")
    public Appointment updateAppointmentStatus(@PathVariable Long appointmentId,
                                               @RequestParam String status) {
        return appointmentService.updateAppointmentStatus(appointmentId, status);
    }

    // Standard CRUD
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment updated) {
        return appointmentService.updateAppointment(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}
